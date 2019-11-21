import React, {Component} from 'react';
import {
  Text,
  Dimensions,
  ScrollView,
  Animated,
  Image,
  View,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  TouchableWithoutFeedback, FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
import {BottomModal, Input, Button, Modal, Tip} from 'beeshell';
export default class MovieDetail extends Component {
  constructor(props){
    super(props)
    this.state={
      id:props.data,
      movie:{},
      hasInfo:false,
      startHeight:30,
      showDiscuss:true,
      discuss:[],
      pageIndex:1,
      pageSize :5,
      myWord:"",
      showloading:false
    }
  }
  componentDidMount(){

    this.initData(this.state.id).then(r => {} )
    this.getDiscussData()
  }
  getDiscussData(){
    const start=(this.state.pageIndex-1)*this.state.pageSize;
    const url="http://192.168.43.26:8080/discuss/list/"+start+"/"+this.state.pageSize;
    fetch(url,{
      mode:'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'},
      body: "mId="+this.state.id
    }).then(res=>res.json()).then(data=> {
      this.setState({
        discuss:this.state.discuss.concat(data.data.rows),
        totalPage:data.data.size
      });
      setTimeout(()=>{
        this.setState({
          isLoading:false
        })
      },1000)
    }).catch(err=>{
      console.warn(err)
    });
  }
 async initData(id){
    await AsyncStorage.getItem('m_user').then(res=>{
      this.setState({
        uId:JSON.parse(res).id
      })
    })
   let that=this
    fetch("http://192.168.43.26:8080/movie/info/"+(id*1)+"/"+this.state.uId).then(res=>res.json()).then(data=>{
      setTimeout(function () {
        that.setState({
          movie:data.data,
          hasInfo:true
        })
      },500)
    }).catch(err=>{
    })
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderDetail()}
        {this.renderShowDiscuss()}

        <BottomModal
            style={{borderTopLeftRadius: 10,borderTopRightRadius: 10}}
            ref={(c) => { this.bottomModal1 = c }}
            title='评论区'
            leftLabelText='关闭'
            rightLabelText='评论'
            leftCallback={() => {
              this.showDiscuss()
            }}
            rightCallback={() => {
              this.showModalDis()
            }}>
          <View
              style={{
                backgroundColor: '#fff',
                height: height/2,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginBottom:10
              }}>
            {this.initDiscuss()}
          </View>
        </BottomModal>
        <Modal
            ref={(c) => { this._modal = c; }}
            cancelable={false}>
          <View style={{borderTopLeftRadius: 20,borderTopRightRadius: 20,
            borderBottomLeftRadius:20,borderBottomRightRadius:20,
            backgroundColor: '#FFF',width:width-100,height:250}}>
            <Input style={{borderBottomWidth:0.5,borderBottomColor:'gray',
              paddingLeft:5,paddingRight:5,borderTopLeftRadius: 20,borderTopRightRadius: 20,
              height:200}}
                   value={this.state.myWord}
                       onChange={(value) => {
                         this.setState({
                           myWord:value
                         })
                       }}
                       multiline={true}
                       maxLength={200} placeholder="请输入评论内容"/>
            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10,
              marginBottom:10}}>
              <Button type={"danger"} onPress={()=>{
                this._modal.close()
              }} size="sm">取消</Button>
              <Button type={"primary"} size="sm" onPress={()=>{
                this.toDiscuss()
              }}>确定</Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  toDiscuss(){

    const url="http://192.168.43.26:8080/discuss/"
    fetch(url,{
      mode:'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'},
      body: "mId="+this.state.id+"&uId="+this.state.uId+"&content="+this.state.myWord
    }).then(res=>res.json()).then(data=> {
      if(data.data!==null&&data.data===true){
        let that=this
        Tip.show('评论成功！', 2000, false,'center')
        setTimeout(()=>{
          this._modal.close()
          that.setState({
            discuss:[],
            pageIndex:1
          })
          that.getDiscussData()
        },1000)
      }else{
        Tip.show('评论失败，请稍后再试！', 2000, false,'center')
      }

    }).catch(err=>{
      console.warn(err)
    });
  }
  showModalDis=()=>{
    this._modal.open()
    this.setState({
      startHeight:30,
      showDiscuss:true
    })
  }
  renderDetail=()=>{
    if(this.state.hasInfo===true){
      return<ScrollView>
          <View style={{flexDirection:'row',borderBottomColor:'gray',borderBottomWidth:0.5,paddingBottom:10}}>
            <View>
              <Image source={{uri:this.state.movie.cover}} style={styles.image}/>
            </View>
            <View style={{justifyContent:'space-around',flex: 1,marginLeft:10}}>
              <View>
                <Text>电影名称：{this.state.movie.title}</Text>
              </View>
              <View>
                <Text>电影类型：{this.state.movie.category}</Text>
              </View>
              <View>
                <Text>制作年份：{this.state.movie.createTime}</Text>
              </View>
              <View style={styles.saves}>
                <View >
                  <Text>电影评分：
                    {this.state.movie.rate} 分
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.desc}>
            <View >
              <Text style={{fontSize:20}}>电影简介：</Text>
            </View>
            <View >
              <Text style={styles.descText}>&emsp;&emsp;{this.state.movie.mdesc}</Text>
            </View>
          </View>
        </ScrollView>

    }else{
      return <View style={{flex: 1,height:height,justifyContent: "center", alignItems:"center"}}>
        <ActivityIndicator size="large" style={styles.loading}/>
      </View>
    }
  }
  renderShowDiscuss=()=>{
    if(this.state.showDiscuss===true){
      return <TouchableWithoutFeedback
          onPress={()=>{
            this.showDiscuss()
          }}
      >
        <View style={[styles.discuss,{height:this.state.startHeight}]} >
          <Ionicons style={{fontSize: 30}} name={"ios-menu"} width={30} color="red"/><Text>评论区</Text>
        </View>
      </TouchableWithoutFeedback>
    }else{
      return <Text/>
    }
  }
  showDiscuss=()=>{
    if(this.state.startHeight===30){
      this.bottomModal1.open()
      this.setState({
        startHeight:0,
        showDiscuss:false
      })
    }else{
      this.setState({
        startHeight:30,
        showDiscuss:true
      })
    }
  }
  initDiscussData=(item,index)=>{
    return <View style={{justifyContent:'flex-start',marginTop:10,marginBottom:20}}>
      <View style={{marginLeft:10,width:width-20,marginRight: 10,flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
        <Image source={{uri:item.userCover}} style={styles.disImage}/>
        <View style={{marginLeft:20}}>
          <Text style={{fontSize:25,letterSpacing: 0.3}}>{item.userName}</Text>
          <Text style={{fontSize:14,color:'gray',marginTop:10}}>{item.createTime}</Text>
        </View>
      </View>
      <View style={{marginLeft:20,width:width-40,marginRight: 20,marginTop:10}}>
          <Text style={{marginLeft:10,fontSize:20,color:'gray'}}>{item.content}</Text>
      </View>
    </View>
  }
  initDiscuss=()=>{
    return  <FlatList
        keyExtractor={(item,i)=>i}
        data={this.state.discuss}
        renderItem={({item,index,separators}) =>this.initDiscussData(item,index)}
        ItemSeparatorComponent={this.createSpc}
        onEndReachedThreshold={0.5}
        onEndReached={this.loadMore}
    />
  }
  createSpc=()=>{
    return <View style={styles.spc}/>
  };
  loadMore=()=>{
    if((this.state.pageIndex+1)>this.state.totalPage){
      return
    }
    this.setState({
      pageIndex:this.state.pageIndex+1
    },function () {
      this.getDiscussData()
    })
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:height
  },
  disImage:{
    width:80,
    height:80,
    borderRadius:80,
    backgroundColor:'gray'
  },
  discuss:{
    alignItems:'center',
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    borderWidth:0.5,
    borderColor:'gray',
    flexDirection: 'row',
    justifyContent:'center'
  },
  spc:{
    borderTopColor:'#ccc',
    marginTop: 10,
    marginLeft:10,
    marginRight:10,
    borderTopWidth:1,
  },
  icon: {
    width: 26,
    height: 26,
  },
  loading:{flex: 1,height:height,justifyContent: "center", alignItems:"center",marginTop:height/2},
  image: {
    width:width/3,
    height:200,
    marginTop:10,
    marginLeft:10
  },
  saves:{
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  desc:{
    width:width-20,
    marginLeft: 10,
    marginRight:10,
    marginTop: 10
  },
  descText:{
    lineHeight:30,
    letterSpacing:0.2,

  }
});
