
import React, {Component} from 'react';
import {Animated, Image, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import {Router,Stack , Scene} from 'react-native-router-flux';
import App from './App';
import MovieList from './view/movie/MovieList';
import MovieDetail from './view/movie/MovieDetail';
import LoginIndex from './view/user/LoginIndex';
import RegUser from './view/user/RegUser';
import User from './view/User';
import Save from './view/user/Save';
import StartIndex from './view/user/StartIndex';
import AboutMe from './view/user/AboutMe';
export default class Main extends Component {
    render() {
        return <Router sceneStyle={styles.container}>
            <Stack key="root" >
                <Scene key="StartIndex" component={StartIndex} title="启动页面"  hideNavBar={true}  />
                <Scene key="App" component={App} title="首页"  hideNavBar={true} />
                <Scene key="MovieList" component={MovieList} title="电影列表" />
                <Scene key="MovieDetail" component={MovieDetail} title="电影详情"  />
                <Scene key="LoginIndex" component={LoginIndex} title="用户登录"  />
                <Scene key="RegUser" component={RegUser} title="用户注册"  />
                <Scene key="User" component={User} title="用户中心" hideNavBar={true}  />
                <Scene key="Save" component={Save} title="我的收藏"   />
                <Scene key="AboutMe" component={AboutMe} title="关于我们"   />
            </Stack>
        </Router>
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
      backgroundColor:'#FFF'
  }
});

