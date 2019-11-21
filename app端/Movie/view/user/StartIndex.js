import React, {Component} from 'react';
import {
  Text,
  Image,
  ImageBackground,
  Animated,
  View,
    Easing,
  StyleSheet,
  Dimensions, TouchableWithoutFeedback,
} from 'react-native';
import { FadeAnimated, SlideAnimated } from 'beeshell/dist/common/animations'
const { width, height } = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';
const fade = new FadeAnimated();
export default class StartIndex extends Component {
  constructor(props){
    super(props);
    this.state= {
      fadeInOpacity: new Animated.Value(0)
    }
  }
  componentDidMount() {
    Animated.timing(this.state.fadeInOpacity, {
      toValue: 1, // 目标值
      duration: 3000, // 动画时间
      easing: Easing.linear // 缓动函数
    }).start();
  }

  render() {
    return <View style={styles.container}>
      <Animated.View
          style={[
            styles.TextBtn,
            {
              transform: [
                { scale: fade.getState().scale }
              ],
              opacity: this.state.fadeInOpacity
            }
          ]}>
          <ImageBackground source={require('../../images/start.png')} style={styles.image}>

              <TouchableWithoutFeedback
                  onPress={()=>{
                    this.startToApp()
                  }}
              >
                <Text style={{color:'#FFD048',fontSize:30}}>☛☛戳我进入影推之旅</Text>
              </TouchableWithoutFeedback>

          </ImageBackground>
      </Animated.View>
    </View>
  }
  startToApp(){
    fade.toOut().then(()=>{
      Actions.App()
    })

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:width,
    alignItems:'center',
    justifyContent:'center'
  },
  image:{
    width:width,
    height:height,
    alignItems:'center',
    justifyContent:'center'
  },
  TextBtn:{
    color:'#FFD048',
    marginTop:100
  }
});
