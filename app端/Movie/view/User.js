import React, {Component} from 'react';
import {AsyncStorage,DeviceEventEmitter, Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Tip} from 'beeshell';

const { width, height } = Dimensions.get('window');

export default class User extends Component {

  constructor(props){
    super(props)
    this.state={
      user:{}
    }
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  componentDidMount(){
    // AsyncStorage.removeItem("m_user")
    this.getUser()
    this.listener = DeviceEventEmitter.addListener('refreshPage', (value)=>{
      this.getUser()
    });

  }
  getUser(){
    this.initData().then(res=>{
      if(res!=null){
        let user=JSON.parse(res)
        user.cover="http://pic37.nipic.com/20140110/5331179_093221399136_2.jpg"
        this.setState({
          user:user,
          hasUser:true
        });
      }else{
        this.setState({
          user:{
            userName:'点我去登录',
            cover:'http://pic37.nipic.com/20140110/5331179_093221399136_2.jpg'
          },
          hasUser:false
        })
      }
    });
  }

  checkLogin(){
    AsyncStorage.getItem("m_user").then(res=>JSON.parse(res)).then(data=>{
      if(data===null){
        Tip.show('您还未登录，请先登录！', 2000, false,'center')
      }else{
        Actions.Save()
      }
    })

  }

 async initData(){
   return  await AsyncStorage.getItem('m_user');
  }
  renderUserName=()=>{
    if(this.state.hasUser===true){
      return <Text style={styles.userName}>{this.state.user.userName}</Text>
    }else{
      return  <View>
        <TouchableWithoutFeedback
            onPress={()=>{
              Actions.LoginIndex()
            }}
        ><View>
          <Text style={styles.userName}>{this.state.user.userName}</Text>
        </View>
        </TouchableWithoutFeedback>
      </View>
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.uTop}>
          <Image source={{uri:this.state.user.cover}}  style={styles.image}/>
          {this.renderUserName()}
        </View>
        <View style={styles.list}>
          <TouchableWithoutFeedback
              onPress={()=>{
                this.checkLogin();
              }}
          >
            <View style={styles.item}>
                <View style={styles.itemView}>
                    <Ionicons  name={"ios-save"} size={25} color="#FF9B00" />
                    <Text style={styles.textTip}>我的收藏</Text>
                </View>
                <View style={styles.itemView}>
                  <Text style={styles.itemViewText}>电影收藏</Text><Ionicons  name={"ios-arrow-dropright"} size={20} color="gray" />
                </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
              onPress={()=>{
                Actions.AboutMe()
              }}
          >
            <View style={styles.item}>
              <View style={styles.itemView}>
                <Ionicons  name={"ios-thumbs-up"} size={25} color="#6DB0F6" /><Text style={styles.textTip}>关于我们</Text>
              </View>
              <View style={styles.itemView}>
                <Text style={styles.itemViewText}>关于我们</Text><Ionicons  name={"ios-arrow-dropright"} size={20} color="gray" />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
              onPress={()=>{
                Tip.show('清除成功！', 2000, false,'center')
                AsyncStorage.removeItem("m_user")
                this.getUser()
              }}
          >
            <View style={styles.item}>
              <View style={styles.itemView}>
                <Ionicons  name={"ios-nuclear"} size={25} color="#E91E63" /><Text style={styles.textTip}>清除缓存</Text>
              </View>
              <View style={styles.itemView}>
                <Text style={styles.itemViewText}>清除缓存</Text><Ionicons  name={"ios-arrow-dropright"} size={20} color="gray" />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textTip:{fontSize: 20,marginLeft: 5},
  itemView:{
    flexDirection:'row',
    marginLeft: 5
  },
  itemViewText:{fontSize: 14,color:'gray',marginRight: 5},
  list:{
    marginTop: 10,
    elevation: 0.1,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
    shadowColor: 'white',  //  阴影颜色
    shadowOffset: { width: 0, height: 0 },  // 阴影偏移
    shadowOpacity: 1,  // 阴影不透明度
    shadowRadius: 5,  //  圆角
  },
  item:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:width-10,
    paddingLeft:10,
    marginRight:5,
    borderBottomColor:'gray',
    borderBottomWidth:0.5,
    height:45,
    alignItems:'center',

  },
  uTop:{
    width:width,
    height:200,
    alignItems: 'center',
    backgroundColor:'#00C2AE',
    elevation: 10,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
    shadowColor: 'black',  //  阴影颜色
    shadowOffset: { width: 0, height: 0 },  // 阴影偏移
    // shadowOpacity: 1,  // 阴影不透明度
    shadowRadius: 50,  //  圆角
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20
  },
  userName: {
    fontSize:28,
    color:"#FFF",
  },
  image: {
    width:150,
    height:150,
    marginTop:10,
    borderRadius:180
  },
});
