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

export default class AboutMe extends Component {
  constructor(props){
    super(props);
    this.state= {

    }
  }
  render() {
    return <View style={styles.container}>
        <Image source={require('../../images/start.png')} style={styles.image}/>
      <View>
        <Text>作&emsp;&emsp;者： 李星清</Text>
        <Text style={{marginTop:10}}>制作日期： 2019/11</Text>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:width,
    justifyContent:'center',
    alignItems:'center'
  },
  image:{
    width:180,
    height:180,
    marginBottom:100,
    backgroundColor:'#FFD048',
    borderRadius:180
  }
});
