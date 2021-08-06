//전역 선언 방법 찾아보기
import React, {useContext, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import * as firebase from "firebase";
import {useIsSignedIn} from "../components/SignedInContextProvider";

// firebase 연동
const firebaseConfig = {
    apiKey: "AIzaSyAS0DrsLq7TOEIORPQHjGmOpoRqhAskA4k",
    authDomain: "tourapi-321202.firebaseapp.com",
    projectId: "tourapi-321202",
    storageBucket: "tourapi-321202.appspot.com",
    messagingSenderId: "481459429337",
    appId: "1:481459429337:web:4459f5eabdbc43b78a83c8",
    measurementId: "G-06PY1R2CYG"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const signIn = (email, password, navigation, setIsSignedIn) => {
    try {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                setIsSignedIn(true)
            })
    } catch (e) {
        console.log(e.toString())
    }
}


const SignInScreen = ({appNavigation, navigation}) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [isSignedIn, setIsSignedIn] = useIsSignedIn()

    return (
        <>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => {
                    setIsSignedIn(true)
                }}>
                    <Text style={{color: '#DCDCDC', fontSize: 16, alignSelf: 'center'}}>둘러보기</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={{fontSize: 28}}>
                    <Text><Text>나만의 </Text><Text style={{fontWeight: "bold"}}>공간 보관함</Text><Text>을</Text></Text>
                    <Text>{"\n"}채워볼까요?</Text>
                </Text>
                <TextInput style={{
                    marginTop: 38,
                    fontSize: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#C5C5C5',
                    marginBottom: 27,
                    paddingBottom: 11
                }} placeholder="이메일 주소를 입력해주세요"
                           onChangeText={(text) => setEmail(text)}
                />
                <TextInput style={{
                    fontSize: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#C5C5C5',
                    marginBottom: 27,
                    paddingBottom: 11
                }} placeholder="비밀번호를 입력해주세요" secureTextEntry={true}
                           onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    style={{backgroundColor: '#DCDCDC', height: 52, borderRadius: 10}}
                    onPress={() => signIn(email, password, navigation, setIsSignedIn)}
                >
                    <Text style={styles.loginText}>로그인</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginTop: 24, alignSelf: 'center'}}>
                    <TouchableOpacity style={{marginRight: 29}}><Text>아이디/비밀번호찾기</Text></TouchableOpacity>
                    <Text style={{marginRight: 29}}>|</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text>회원가입</Text>
                    </TouchableOpacity>
                </View>
                {/*<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 44}}>*/}
                {/*    <View style={{flex: 1, height: 1, backgroundColor: '#929292'}}/>*/}
                {/*    <View>*/}
                {/*        <Text style={{*/}
                {/*            width: 139,*/}
                {/*            textAlign: 'center',*/}
                {/*            color: '#929292',*/}
                {/*            fontSize: 16,*/}
                {/*            fontWeight: 'bold',*/}
                {/*            marginStart: 18,*/}
                {/*            marginEnd: 18*/}
                {/*        }}>3초만에 간편 로그인</Text>*/}
                {/*    </View>*/}
                {/*    <View style={{flex: 1, height: 1, backgroundColor: '#929292'}}/>*/}
                {/*</View>*/}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
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
    loginText: {
        textAlign: 'center',
        padding: 14,
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default SignInScreen;