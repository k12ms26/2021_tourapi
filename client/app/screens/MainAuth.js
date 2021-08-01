//전역 선언 방법 찾아보기
import React, {useEffect} from 'react';
import ReactDOM from "react-dom";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import image from '../assets/images/kakao_login_large_wide.png';
import {WebView} from 'react-native-webview';

export default function MainAuth({navigation}) {
    useEffect(() => {
        // const script = document.createElement("script");
        // script.async = true;
        // script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        // this.image.appendChild(script);
      }, []);
    
    return (
        <>            
            <View style={styles.button}>
                <TouchableOpacity onPress={() => navigation.navigate('MainPage')}><Text style={{color: '#DCDCDC', fontSize: 16, alignSelf: 'center'}}>둘러보기</Text></TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={{fontSize: 28}}>
                    <Text><Text>나만의 </Text><Text style={{fontWeight: "bold"}}>공간 보관함</Text><Text>을</Text></Text>
                    <Text>{"\n"}채워볼까요?</Text>
                </Text>
                <TextInput style={{marginTop: 38, fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#C5C5C5', marginBottom: 27, paddingBottom: 11}} placeholder="이메일 주소를 입력해주세요" />
                <TextInput style={{fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#C5C5C5', marginBottom: 27, paddingBottom: 11}} placeholder="비밀번호를 입력해주세요" secureTextEntry={true}/>
                <TouchableOpacity style={{backgroundColor: '#DCDCDC', height: 52, borderRadius: 10}}><Text style={{textAlign: 'center', padding: 14, fontSize: 16, color: '#fff', fontWeight: 'bold'}}>로그인</Text></TouchableOpacity>
                <View style={{flexDirection: 'row', marginTop: 24, alignSelf: 'center'}}>
                    <TouchableOpacity style={{marginRight: 29}}><Text>아이디/비밀번호찾기</Text></TouchableOpacity>
                    <Text style={{marginRight: 29}}>|</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SubAuth')}><Text>회원가입</Text></TouchableOpacity>
                </View>
                {/* <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 44 }}>
                        <View style={{flex: 1, height: 1, backgroundColor: '#929292'}} />
                        <View>
                            <Text style={{width: 139, textAlign: 'center', color: '#929292', fontSize: 16, fontWeight: 'bold', marginStart: 18, marginEnd: 18}}>3초만에 간편 로그인</Text>
                        </View>
                        <View style={{flex: 1, height: 1, backgroundColor: '#929292'}} />
                    </View>                
                    <TouchableOpacity onPress={()=>getKakaoApi()}><Image source={image} style={{width:343, height: 52, borderRadius: 10, marginTop: 20}}/></TouchableOpacity>
                    
                </View> */}
            </View>
            {/* <WebView
 source={{ uri: 'https://developers.kakao.com/sdk/js/kakao.js' }}
/> */}
        </>
      );
}

const styles = StyleSheet.create({
    // mainpage : {
    //     // position: 'absolute'

    // },
    button : {
        left: 312,
        width: 67,
        height: 24,
        fontWeight: 'normal',
        top: 44,
    },
    container: {
        margin: 10,
        fontSize: 28,
        fontWeight: "400",
        top: 118,
        left: 16,
        width: 343,
    },
  });