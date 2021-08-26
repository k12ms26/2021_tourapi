//전역 선언 방법 찾아보기
import React, {useContext, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {useIsSignedIn} from "../../contexts/SignedInContextProvider";
import ScreenContainer from "../../components/ScreenContainer";
import ScreenContainerView from "../../components/ScreenContainerView";

const windowWidth = Dimensions.get('window').width;
import MainBoxIcon from '../../assets/images/main_box_icon.svg'

const signIn = (email, password, navigation, setIsSignedIn) => {

}


const SignUpSocialScreen = ({appNavigation, navigation}) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [isSignedIn, setIsSignedIn] = useIsSignedIn()

    const {colors} = useTheme()

    return (
        <ScreenContainer backgroundColor={colors.backgroundColor}>
            <ScreenContainerView flex={1}>
                <View style={{height: 24, marginTop: 20, justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => setIsSignedIn(true)}>
                        <Text style={{
                            color: colors.mainColor,
                            fontSize: 16,
                            fontWeight: '400',
                            alignSelf: 'flex-end'
                        }}>둘러보기</Text>
                    </TouchableOpacity>
                </View>
                <View flex={1} style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                    <MainBoxIcon/>
                    <View style={{alignItems: 'center', marginTop: 35.08}}>
                        <Text style={{fontSize: 28, color: colors.mainColor}}>나만의 </Text>
                        <Text style={{fontSize: 28, color: colors.mainColor}}><Text style={{fontWeight: "bold"}}>공간
                            보관함</Text><Text>을</Text></Text>
                        <Text style={{fontSize: 28, color: colors.mainColor}}>채워볼까요?</Text>
                    </View>
                </View>
                <View flex={1} style={{marginTop: 50}}>
                    <View style={{alignItems : 'center'}}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#FEE500',
                                ...styles.socialLoginBtn
                            }}
                            onPress={() => signIn(email, password, navigation, setIsSignedIn)}
                        >
                            <Text style={{...styles.loginText, color: '#000'}}>카카오로 계속하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#000',
                                ...styles.socialLoginBtn
                            }}
                            onPress={() => signIn(email, password, navigation, setIsSignedIn)}
                        >
                            <Text style={{...styles.loginText, color: colors.defaultColor}}>Apple로 계속하기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 24, alignSelf: 'center', alignContent: 'stretch'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('SignInEmail')} style={{marginRight: 29}}>
                            <Text>이메일로 로그인</Text>
                        </TouchableOpacity>
                        <Text style={{marginRight: 29, color: '#929292'}}>|</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUpEmail')}>
                            <Text>이메일 회원가입</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScreenContainerView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    loginText: {
        textAlign: 'center',
        padding: 14,
        fontSize: 16,
        fontWeight: 'bold'
    },
    socialLoginBtn: {
        height: 52,
        borderRadius: 10,
        marginVertical: 8,
        width : '100%',
        maxWidth: 650
    }
});

export default SignUpSocialScreen;