import React, {Component } from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Text, Image, Dimensions, AsyncStorage} from 'react-native';
const { width, height } = Dimensions.get('window');
import Swiper from 'react-native-swiper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import {Tip} from 'beeshell';
export default class Index extends Component{
    constructor(props){
        super(props);
        this.state={
            banner:[]
        };
    }
    componentDidMount(): void {
        this.setState({
            banner:['http://pic37.nipic.com/20140110/5331179_093221399136_2.jpg',
                'http://pic37.nipic.com/20140110/8821914_135241051000_2.jpg',
            'https://i03piccdn.sogoucdn.com/ba5bc1fe7778a2d8']
        })
    }

    checkLogin=(type)=>{
        AsyncStorage.getItem("m_user").then(res=>JSON.parse(res)).then(data=>{
            if(data===null){
                Tip.show('您还未登录，请先登录！', 2000, false,'center')
            }else{
                Actions.MovieList(""+type)
            }
        })
    }
    render() {
        return <View>
            <View style={styles.wrapper} >
                <Swiper autoplay={true}>
                    {this.state.banner.map((item,i)=>{
                        return <View style={styles.slide1} key={i}>
                            <Image source={{uri:item}} style={{width:width,height:300}}/>
                        </View>
                    })}
                </Swiper>
                <View style={styles.list}>
                    <TouchableWithoutFeedback
                        onPress={()=>{
                            this.checkLogin(0)
                        }}
                    >
                        <View style={styles.ListItem}>
                            <View >
                                <Ionicons  name={"ios-flame"} size={50} color="#E91E63" />
                            </View>
                            <View>
                                <Text>最热电影</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={()=>{
                            this.checkLogin(1)
                        }}
                    >
                        <View style={styles.ListItem}>
                            <View >
                                <Ionicons  name={"ios-happy"} size={50} color="#E91E63" />
                            </View>
                            <View>
                                <Text>搞笑电影</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={()=>{
                            this.checkLogin(3)
                        }}
                    >
                        <View style={styles.ListItem}>
                            <View >
                                <Ionicons  name={"ios-menu"} size={50} color="#E91E63" />
                            </View>
                            <View>
                                <Text>全部电影</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>;
    }

}

const styles = StyleSheet.create({
    wrapper: {
        height:300,
    },
    slide1: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list:{
        flexDirection:'row',
        marginTop:20
    },
    ListItem:{
        width:width/3,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

