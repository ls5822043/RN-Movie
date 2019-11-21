import React, {Component} from 'react';
import {
  Text,
  TextInput,
  DeviceEventEmitter,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { Input,Button ,Tip} from 'beeshell';
import {Actions} from 'react-native-router-flux';

export default class RegUser extends Component {
  constructor(props){
    super(props);
    this.state= {
      userName:'',
      passWord:'',
      checkPassWord:''
    }
  }
  render() {
    return <View style={styles.container}>
      <View style={{width:width,height:250,alignItems:'center'}}>
        <Image style={styles.logo} source={{uri:'http://pic37.nipic.com/20140110/5331179_093221399136_2.jpg'}}/>
      </View>
      <View style={{width:width}}>
        <View style={styles.inputView}>
          <Text style={{width:80,height:20,marginTop: 10,marginLeft:5}}>用   户  名： </Text>
          <Input
              style={styles.input}
              textAlign='left'
              value={this.state.userName}
              placeholder='请输入用户名'
              onChange={(value) => {
                this.setState({
                  userName:value
                })
              }}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={{width:80,height:20,marginTop: 10,marginLeft:5}}>密         码： </Text>
          <Input
              style={styles.input}
              textAlign='left'
              value={this.state.passWord}
              placeholder='请输入密码'
              secureTextEntry={true}
              onChange={(value) => {
                this.setState({
                  passWord:value
                })
              }}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={{width:80,height:20,marginTop: 10,marginLeft:5}}>确认密码： </Text>
          <Input
              style={styles.input}
              textAlign='left'
              value={this.state.checkPassWord}
              placeholder='请在此输入密码'
              secureTextEntry={true}
              onChange={(value) => {
                this.setState({
                  checkPassWord:value
                })
              }}
          />
        </View>
        <View style={styles.btnView}>
          <Button onPress={this.regUser} textStyle={styles.textBtn} style={styles.btn} type="success" size="lg">
            注册
          </Button>
        </View>
        <View style={styles.registerUser}>
          <TouchableWithoutFeedback
              onPress={()=>{
                Actions.LoginIndex()
              }}
          >
          <Text style={styles.registerUserText} >去登陆☜</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  }
  regUser=()=>{
    let data=this.state
    if(data.userName===""||data.userName===null){
      Tip.show('请输入用户名！', 2000, false,'center')
      return false
    }
    if(data.userName.length<4||data.userName.length>6){
      Tip.show('用户名长度未4~6字符！', 2000, false,'center')
      return false
    }
    if(data.passWord===""||data.passWord===null){
      Tip.show('请输入密码！', 2000, false,'center')
      return false
    }
    if(data.passWord.length<6||data.passWord.length>8){
      Tip.show('密码长度为6~8字符！', 2000, false,'center')
      return false
    }
    if(data.checkPassWord===""||data.checkPassWord===null){
      Tip.show('请输入确认密码！', 2000, false,'center')
      return false
    }
    if(data.checkPassWord!==data.passWord){
      Tip.show('两次密码输入不一致，请重新输入！', 2000, false,'center')
      return false
    }
  let u=true;
    fetch("http://192.168.43.26:8080/user/check/"+data.userName,{
      mode:'cors',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'},
      body: ""
    }).then(res=>res.json()).then(data=> {
      if(data.data!==null&&data.data===true){
        Tip.show('用户名已被注册！', 2000, false,'center')
      }else{
        const url="http://192.168.43.26:8080/user";
        const myInfo="userName="+this.state.userName+"&passWord="+this.state.passWord;
        fetch(url,{
          mode:'cors',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'},
          body: myInfo
        }).then(res=>res.json()).then(data=> {
          if(data.data!==null&&data.data!==false){
            Tip.show('注册成功！', 2000, false,'center')
            AsyncStorage.setItem("m_user",JSON.stringify(data.data)).catch(error=>{
              console.warn("111:"+error)
            });
            setTimeout(function () {
              DeviceEventEmitter.emit('refreshPage',"");
              Actions.App()
            },2000)
          }else{
            Tip.show('注册失败，请稍后再试！', 2000, false,'center')
          }
        }).catch(err=>{
          console.warn(err)
        });
      }
    }).catch(err=>{
      console.warn(err)
    });

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:width,
    alignItems:'center'
  },
  registerUser:{
    width:60,
    marginTop:30,
    marginLeft:width/2-30,
    marginRight:width/2-50,
    color: '#3FA5F7'
  },
  registerUserText:{
    color: '#3FA5F7'
  },
  btnView:{
    width:width-169,
    marginTop:10,
    height:40,
    marginLeft:90,
    marginRight:100,
    borderRadius:10,
  },
  textBtn:{
    color:'#FFF'
  },
  btn:{
    borderRadius:10,
  },
  inputView:{
    marginTop:10,
    backgroundColor:'#00C2AE',
    borderColor:'#00C2AE',
    borderWidth:1,
    width:width-169,
    height:40,
    flexDirection:'row',
    marginLeft:90,
    marginRight:100,
    elevation: 10,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
    shadowColor: 'yellow',  //  阴影颜色
    shadowOffset: { width: 0, height: 0},  // 阴影偏移
    shadowOpacity: 1,  // 阴影不透明度
    shadowRadius: 50,  //  圆角
    borderRadius:10,
  },
  input:{
    width:width-255,
    height:37,
    borderTopRightRadius:10,
    borderBottomRightRadius:10
  },
  logo:{
    width:180,
    height:180,
    marginTop:35,
    alignItems:'center',
    borderRadius:180
  },
  icon: {
    width: 26,
    height: 26,
  },
  image: {
    width: 50,
    height: 50,
  },
});
