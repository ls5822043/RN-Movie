import React, {Component} from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Index from './view/Index';
import User from './view/User';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest

export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      selectedTab:'Index',
    };
  }
  render(){
    return <View style={styles.container}>
      <TabNavigator>
        <TabNavigator.Item
            selected={this.state.selectedTab==='Index'}
            title="首页"
            selectedTitleStyle={{color:'#63B8FF'}}
            renderIcon={()=><FontAwesome name='home' size={26}  color="gray"/>}
            renderSelectedIcon={() =>
                <FontAwesome name={"home"} size={25} color="#84C6FD" />}
            onPress={()=>this.setState({selectedTab:'Index'})}
        >
          <Index/>
        </TabNavigator.Item>

        <TabNavigator.Item
            selected={this.state.selectedTab==='User'}
            title="我的"
            selectedTitleStyle={{color:'#63B8FF'}}
            renderIcon={()=><FontAwesome name={"user"} size={25} color="gray" />}
            renderSelectedIcon={() =>
                <FontAwesome name={"user"} size={25} color="#84C6FD" />}
            onPress={()=>this.setState({selectedTab:'User'})}
        >
          <User  />
        </TabNavigator.Item>
      </TabNavigator>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
