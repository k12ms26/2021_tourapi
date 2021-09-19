import React, {useState} from 'react';
import {View, Image, SectionList, StyleSheet, Switch} from 'react-native';
import {useTheme} from '@react-navigation/native';
import appJson from '../../../app.json';

import AppText from '../../components/AppText';
import ScreenContainer from '../../components/ScreenContainer';
import NavigationTop from '../../components/NavigationTop';
import ScreenContainerView from '../../components/ScreenContainerView';
import ListItem from './ListItem';

const SystemSettingScreen = ({navigation}) => {
    const {colors} = useTheme();


    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const systemMenu = [
        {
            index: 1,
            title: '연결된 계정',
            data: [{index: 1, name: '수정필요'}]
        },
        {
            index: 2,
            title: '서비스 설정',
            data: [{index: 1, name: '위치 서비스'}, {index: 2, name: '알림'}, {index: 3, name: '마케팅 수신 동의'}]
        },
        {
            index: 3,
            data: [{index: 1, name: '문의하기'}, {index: 2, name: '새로운 소식'}, {
                index: 3,
                name: '버전 정보 ' + appJson.expo.version
            }]
        },
        {
            index: 4,
            data: [{index: 1, name: '로그아웃'}, {index: 2, name: '회원 탈퇴하기'}]
        }
    ];

    const HeaderItem = ({title, index}) => (
        <View style={typeof title !== 'undefined' && {marginBottom: 16}}>
            <AppText style={{...styles.header_text, color: colors.gray[4]}}>{title}</AppText>
        </View>
    );

    const SettingListItem = ({data, index}) => {
        const isSelected = data;
        return (
            <ListItem data={data} index={index} isSelected={isSelected}/>
        );
    };

    const FooterItem = ({index}) => (
        <>
            {index !== systemMenu.length &&
            <View style={{
                width: '100%',
                height: 1,
                backgroundColor: colors.red_gray[6],
                zIndex: -1000,
            }}></View>
            }
        </>
    );

    return (
        <ScreenContainer backgroundColor={colors.backgroundColor}>
            <NavigationTop title="설정" navigation={navigation}/>

            <ScreenContainerView>
                <SectionList sections={systemMenu}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item, section: {index}}) => <SettingListItem data={item.name} index={index}/>}
                    renderSectionHeader={({section: {title, index}}) => <HeaderItem title={title} index={index}/>}
                    renderSectionFooter={({section: {index}}) => <FooterItem index={index}/>}
                    stickySectionHeadersEnabled={false}
                />
            </ScreenContainerView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    header_text: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 19.2,
        marginTop: 16
    },
    list_style: {
        marginBottom: 32
    },
    list_style_version1: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    list_style_version2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default SystemSettingScreen;