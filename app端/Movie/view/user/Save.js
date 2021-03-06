import React, {Component} from 'react';
import {
  Text,
  FlatList,
  Image,
  Dimensions,
  View,
  AsyncStorage,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback, DeviceEventEmitter,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import Rate from 'beeshell/dist/components/Rate';
import {Actions} from 'react-native-router-flux';
import {Tip} from 'beeshell';
export default class Save extends Component {
  constructor(props){
    super(props);
    this.state= {
      type: props.data*1,
      movies: [],
      pageIndex: 1,
      totalPage: 0,
      pageSize: 5,
      isLoading: true,
      uId:null
    }
  }
  componentDidMount(){
    this.getMoviesList().then(r => {
    })
  };

  render() {
    return <View style={styles.container}>
      {this.renderList()}
    </View>
  }
  async getMoviesList(){
    await AsyncStorage.getItem('m_user').then(res=>{
      this.setState({
        uId:JSON.parse(res).id
      })
    })
    const start=(this.state.pageIndex-1)*this.state.pageSize;
    const url="http://192.168.43.26:8080/favorite/list/"+this.state.uId+"/"+start+"/"+this.state.pageSize;
    fetch(url,{
      mode:'cors',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'},
      body: ""
    }).then(res=>res.json()).then(data=> {
      console.warn(data)
      this.setState({
        movies:this.state.movies.concat(data.data.rows),
        totalPage:data.data.size
      });
      setTimeout(()=>{
        this.setState({
          isLoading:false
        })
      },2000)
    }).catch(err=>{
      console.warn(err)
    });
  }
  renderList(){
    if(this.state.isLoading){
      return <ActivityIndicator size="large" style={styles.loading}/>
    }
    return <FlatList
        keyExtractor={(item,i)=>i}
        data={this.state.movies}
        renderItem={({item,index,separators}) =>this.initData(item,index)}
        ItemSeparatorComponent={this.createSpc}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={this.renderEmpty}
        onEndReached={this.loadMore}
    />
  }
  initData(item,i){
    return <View style={styles.list}>
      <Image source={{uri:item.cover}} style={styles.image}/>
      <TouchableWithoutFeedback
          onPress={()=>{
            Actions.MovieDetail(item.id)
          }}
      >
        <View style={{justifyContent:'space-around',marginLeft: 10, flex:1}}>
          <View>
            <Text>电影名称：{item.title}</Text>
          </View>
          <View>
            <Text>电影类型：{item.category}</Text>
          </View>
          <View>
            <Text>制作年份：{item.createTime}</Text>
          </View>
          <View style={styles.saves}>
            <View >
              <Text>电影评分：
                {item.rate} 分
              </Text>
            </View>
            <View style={{marginRight: 10}} >
              {this.renderSave(item,i)}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  }
  renderEmpty=()=>{
    return <View style={{flex:1,justifyContent: "center",alignItems:'center',marginTop:100}}>
      <Text>您还没有收藏哦</Text>
    </View>
  }
  renderSave=(item,i)=>{
    if(item.isSave===false){
      return <TouchableWithoutFeedback
          onPress={()=>{
            this.toSave(item,i)
          }}
      >
        <Text><Ionicons  name={"ios-heart-empty"} size={25} color="#000" /> 收藏</Text>
      </TouchableWithoutFeedback>
    }else{

      return <TouchableWithoutFeedback
          onPress={()=>{
            this.toSave(item,i)
          }}
      >
        <Text><Ionicons  name={"ios-heart"} size={25} color="#DD001B" /> 已收藏</Text>
      </TouchableWithoutFeedback>
    }

  }
  toSave=(item,i)=>{
    let url="http://192.168.43.26:8080/favorite/"+item.id+"/"+this.state.uId;
    let method="DELETE";
    let myInfo="";

    let that=this;
    fetch(url,{
      mode:'cors',
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'},
      body: myInfo
    }).then(res=>res.json()).then(data=> {
      if(data.data===true){
        Tip.show('取消收藏成功！', 2000, 'center')
        setTimeout(function () {
          let movies=that.state.movies;
          movies.splice(i,1);
          that.setState({
            movies:movies
          })
        },2000)
      }else {
        Tip.show('操作失败，请稍后再试！', 2000, 'center')
      }

    }).catch(err=>{
      console.warn(err)
    });
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
      this.getMoviesList()
    })
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  loading:{
    flex:1,
    height:height,
  },
  spc:{
    borderTopColor:'#ccc',
    marginTop: 10,
    marginLeft:10,
    marginRight:10,
    borderTopWidth:1,
  },
  image: {
    width:width/3,
    height:200,
    marginTop:10,
    marginLeft:10
  },
  list:{
    flexDirection:'row'
  },
  saves:{
    flexDirection:'row',
    justifyContent: 'space-between',
  }
});
