//전역 선언 방법 찾아보기
import React, {useContext, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {useIsSignedIn} from "../../components/SignedInContextProvider";
import ScreenContainer from "../../components/ScreenContainer";


const SignInEmailScreen = ({appNavigation, navigation}) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [isSignedIn, setIsSignedIn] = useIsSignedIn()

    const signIn = async () => {
        try {
            let url = 'http://localhost:3000/auth/loginEmail';
            let options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    user: {
                        email, password
                    }
                })
            };
            const {state, user} = await fetch(url, options)
                .then(res => res.json())
                .catch(error => console.log(error));

            switch (state) {
                case 'NOT EXIST' :
                    alert('가입되지 않은 정보입니다.')
                    break;
                case 'NOT MATCHED' :
                    alert('비밀번호를 다시 확인해주세요.')
                    break;
                case 'SUCCESS' :
                    setIsSignedIn(true);
                    appNavigation.navigate('App')
                    break;
            }
        } catch (e) {
            console.log(e.toString())
        }
    }

    return (
        <ScreenContainer backgroundColor="#FCF6F5">
            <View style={{height : 24, marginTop : 20, justifyContent : 'center'}}>
                <TouchableOpacity onPress={() => {setIsSignedIn(true)}}>
                    <Text style={{color: '#40516E', fontSize: 16, alignSelf: 'flex-end'}}>둘러보기</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop : 86}}>
                <Text style={{fontSize: 28, color: '#40516E'}}>
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
                }}
                           placeholder="이메일 주소를 입력해주세요"
                           onChangeText={(text) => setEmail(text)}
                           autoCapitalize="none"
                />
                <TextInput style={{
                    fontSize: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#C5C5C5',
                    marginBottom: 38,
                    paddingBottom: 11
                }} placeholder="비밀번호를 입력해주세요" secureTextEntry={true}
                           onChangeText={(text) => setPassword(text)}
                           autoCapitalize="none"
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: '#BDC2CA',
                        height: 52,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: "center"
                    }}
                    disabled={email && password ? false : true}
                    onPress={() => signIn()}
                >
                    <Text style={styles.loginText}>로그인</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginTop: 24, alignSelf: 'center'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpEmail')} style={{marginRight: 29}}>
                        <Text>회원가입</Text>
                    </TouchableOpacity>
                    <Text style={{marginRight: 29, color : '#929292'}}>|</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
                        <Text>비밀번호 재설정</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenContainer>
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
    loginText: {
        textAlign: 'center',
        padding: 14,
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default SignInEmailScreen;