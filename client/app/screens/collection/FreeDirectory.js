import React, {useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Platform,
    TextInput,
    Pressable 
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import styled from "styled-components/native";
import { Icon } from 'react-native-elements';

import MapView, { Marker } from 'react-native-maps';
import AppText from '../../components/AppText';
import ScreenContainer from '../../components/ScreenContainer';
import NavigationTop from '../../components/NavigationTop';
import ScreenDivideLine from '../../components/ScreenDivideLine';

import {   Menu,
    Divider,
    HamburgerIcon,
    Center, NativeBaseProvider } from 'native-base';

export default function FreeDirectory({navigation}) {
    const {colors} = useTheme();
    const [directoryTitle, setDirectoryTitle] = useState('종로 25년 토박이가 알려주는 종로 사진스팟')

    const InputBox = styled(TextInput)`
    fontSize: 16px;
    borderBottomWidth: 1px;
    borderBottomColor: #C5C5C5;
    paddingBottom: 11px;
  `

    return (
        <NativeBaseProvider>
                  <Center flex={1}>
            <Menu
      trigger={(triggerProps) => {
        return (
          <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <HamburgerIcon />
          </Pressable>
        )
      }}
    >
      <Menu.Item>Arial</Menu.Item>
      <Menu.Item>Nunito Sans</Menu.Item>
      <Menu.Item isDisabled>Tahoma</Menu.Item>
      <Divider />
      <Menu.Item>Roboto</Menu.Item>
      <Menu.Item>Montserrat</Menu.Item>
    </Menu>
      </Center>
        <View style={{paddingHorizontal: 20, paddingTop: 25, paddingBottom: Platform.OS === 'ios'? 20 : 0,backgroundColor: colors.backgroundColor}}>
            <NavigationTop navigation={navigation} title="" type="freeDir"/>
        </View>
        <ScreenContainer backgroundColor={colors.backgroundColor}>

        <SafeAreaView style={{backgroundColor: colors.backgroundColor}}>
            <ScrollView>
                <View>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginBottom: 8}}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                {/* <View style={[styles.dirType, {borderColor: colors.backgroundColor, backgroundColor: colors.backgroundColor}]}><AppText style={item.collection_type==1 ? styles.dirFreeText : styles.dirPlanText}>{item.collection_type===1 ? '자유' : '일정'}</AppText></View> */}
                                <View style={[styles.dirType, 
                                {borderColor: colors.defaultColor, backgroundColor: colors.defaultColor, shadowColor: colors.red[8]
                                }]}><AppText style={{...styles.dirFreeText, color: colors.mainColor }}>자유</AppText></View>
                                {/* flatList로 바꿀 예정 */}
                                <View style={{flexDirection: 'row'}}>
                                    <AppText style={{color: colors.gray[2], fontSize: 10, marginEnd: 8}}># 힐링</AppText>
                                    <AppText style={{color: colors.gray[2], fontSize: 10, marginEnd: 8}}># 뚜벅</AppText>
                                    <AppText style={{color: colors.gray[2], fontSize: 10, marginEnd: 8}}># 자유</AppText>
                                </View>
                            </View>
                            <View>
                                <Image source={require('../../assets/images/lock_forDir.png')} style={{width: 22, height: 22}}></Image>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{justifyContent: 'center', alignItems: 'center', width: '70%'}}>
                                <AppText style={{fontSize: 22, fontWeight: '700', color: colors.mainColor}}>{directoryTitle}</AppText>
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'center', marginRight: 20, marginTop: 20}}>
                                <Image source={require('../../assets/images/here_click.png')} style={{width: 26, height: 21, marginBottom: 2}}></Image>
                                <AppText style={{fontSize: 10, fontWeight: '700', color: colors.red[3]}}>1,820</AppText>
                            </View>
                        </View>
                        <View style={{marginRight: '15%', marginTop: '10%', marginLeft: 10}}>
                            <View style={{flexDirection: 'row', position: 'relative', alignItems: 'center'}} flex={1}>
                                {/* 여기에는 받은 유저 프로필만 넣고, +2 부분에는 전체 인원수-3명으로 퉁 치기 */}
                                <View style={{zIndex: 0, flex: 1, position:'absolute'}}><Image style={{width: 60, height: 60}} source={require('../../assets/images/default_profile_1.png')}></Image></View>
                                <View style={{zIndex: 1, flex: 1, position:'absolute', marginLeft: 20}}><Image style={{width: 60, height: 60}} source={require('../../assets/images/default_profile_2.png')}></Image></View>
                                <View style={{zIndex: 2, flex: 1, position:'absolute', marginLeft: 40}}><Image style={{width: 60, height: 60}} source={require('../../assets/images/default_profile_3.png')}></Image></View>
                                <View style={{zIndex: 3, flex: 1, position:'absolute', marginLeft: 51, backgroundColor: 'rgba(0, 0, 0, 0.37);',
                                            width: 38, height: 38, borderRadius: 50,
                                            alignItems: 'center', justifyContent: 'center'
                                }}><AppText style={{color: colors.defaultColor, fontSize: 10, textAlign: 'center'}}>+2</AppText></View>
                            </View>
                        </View>
                    </View>

                    <View style={{marginTop: 45}}>
                        {/* TODO 카카오 지도 api 가져오기 */}
                        <View>
                            {/* 여기에 위도, 경도 받아온 값 넣으면 될듯 */}
                            <MapView style={{width: Dimensions.get('window').width, height: 200}}
                                initialRegion={{
                                    latitude: 37.56633546113615,
                                    longitude: 126.9779482762618,
                                    latitudeDelta: 0.0015,
                                    longitudeDelta: 0.0015,
                                }}
                            ><Marker coordinate={{latitude: 37.56633546113615, 
                                    longitude: 126.9779482762618}}
                                    title="서울시청"
                                    description="기본값입니다" />
                            </MapView>
                        </View>
                    </View>

                    <View style={{marginTop: 16, marginHorizontal: 20}}>
                        <View style={{marginBottom: 16}}>
                            <AppText style={{color: colors.gray[4]}}>총 <AppText style={{fontWeight: '700'}}>20개</AppText> 공간</AppText>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('Place')}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={{uri: 'https://via.placeholder.com/150/56acb2'}}
                                        style={{width: 72, height: 72, borderRadius: 15}}></Image>
                                    <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '78%'}}>
                                        <View style={{marginLeft: 8, marginTop: '2%'}}>
                                            <View style={{flexDirection: 'row'}}>
                                                <AppText style={{
                                                    color: colors.gray[3],
                                                    textAlign: 'center',
                                                    fontSize: 10,
                                                    fontWeight: 'bold'
                                                }}>음식점</AppText>
                                                <AppText style={{marginHorizontal:4, color: colors.gray[7], 
                                                    textAlign: 'center',
                                                    fontSize: 10,
                                                    fontWeight: 'bold'
                                                }}>|</AppText>
                                                <Image source={require('../../assets/images/review_star.png')}
                                            style={{width: 10, height: 10, alignSelf:'center', marginTop: '1%'}}></Image>
                                                <AppText style={{
                                                    color: colors.gray[3],
                                                    textAlign: 'center',
                                                    fontSize: 10,
                                                    fontWeight: 'bold',
                                                    marginLeft: 2
                                                }}>4.8</AppText>
                                            </View>
                                            <AppText style={{
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                color: colors.mainColor,
                                                marginVertical: 5
                                            }}>경복궁</AppText>
                                            <AppText style={{fontSize: 12,color: colors.gray[4]}}>서울시 종로구</AppText>
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                            <Image source={require('../../assets/images/here_nonclick.png')} style={{width: 26, height: 21}}></Image>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{width: '100%', height: 1, backgroundColor: colors.red_gray[6], zIndex: -1000, marginVertical: 13}}></View>

                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('Place')}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={{uri: 'https://via.placeholder.com/150/56acb2'}}
                                        style={{width: 72, height: 72, borderRadius: 15}}></Image>
                                    <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '78%'}}>
                                        <View style={{marginLeft: 8, marginTop: '2%'}}>
                                            <View style={{flexDirection: 'row'}}>
                                                <AppText style={{
                                                    color: colors.gray[3],
                                                    textAlign: 'center',
                                                    fontSize: 10,
                                                    fontWeight: 'bold'
                                                }}>음식점</AppText>
                                                <AppText style={{marginHorizontal:4, color: colors.gray[7], 
                                                    textAlign: 'center',
                                                    fontSize: 10,
                                                    fontWeight: 'bold'
                                                }}>|</AppText>
                                                <Image source={require('../../assets/images/review_star.png')}
                                            style={{width: 10, height: 10, alignSelf:'center', marginTop: '1%'}}></Image>
                                                <AppText style={{
                                                    color: colors.gray[3],
                                                    textAlign: 'center',
                                                    fontSize: 10,
                                                    fontWeight: 'bold',
                                                    marginLeft: 2
                                                }}>4.8</AppText>
                                            </View>
                                            <AppText style={{
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                color: colors.mainColor,
                                                marginVertical: 5
                                            }}>경복궁</AppText>
                                            <AppText style={{fontSize: 12,color: colors.gray[4]}}>서울시 종로구</AppText>
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                            <Image source={require('../../assets/images/here_nonclick.png')} style={{width: 26, height: 21}}></Image>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{backgroundColor: colors.defaultColor, height: 30, paddingVertical: 6, paddingLeft: 6, paddingRight: 5,
                                            marginBottom: 6, marginRight: 10, marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                                            }}>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={require('../../assets/images/tipIcon.png')} style={{width: 12, height: 12, marginEnd: 8}}></Image>
                                    <AppText style={{color: colors.blue[1], fontSize: 14}}>근처에 xxx파전 맛집에서 막걸리 한잔 캬</AppText>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Image style={{width: 28, height: 28}} source={require('../../assets/images/default_profile_2.png')}></Image>
                                </View>
                            </View>
                        </View>

                        <View style={{width: '100%', height: 1, backgroundColor: colors.red_gray[6], zIndex: -1000, marginVertical: 13}}></View>
                        
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('Place')}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={{uri: 'https://via.placeholder.com/150/56acb2'}}
                                        style={{width: 72, height: 72, borderRadius: 15}}></Image>
                                    <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '78%'}}>
                                        <View style={{marginLeft: 8, marginTop: '2%'}}>
                                            <View style={{flexDirection: 'row'}}>
                                                <AppText style={{
                                                    color: colors.gray[3],
                                                    textAlign: 'center',
                                                    fontSize: 10,
                                                    fontWeight: 'bold'
                                                }}>음식점</AppText>
                                                <AppText style={{marginHorizontal:4, color: colors.gray[7], 
                                                    textAlign: 'center',
                                                    fontSize: 10,
                                                    fontWeight: 'bold'
                                                }}>|</AppText>
                                                <Image source={require('../../assets/images/review_star.png')}
                                            style={{width: 10, height: 10, alignSelf:'center', marginTop: '1%'}}></Image>
                                                <AppText style={{
                                                    color: colors.gray[3],
                                                    textAlign: 'center',
                                                    fontSize: 10,
                                                    fontWeight: 'bold',
                                                    marginLeft: 2
                                                }}>4.8</AppText>
                                            </View>
                                            <AppText style={{
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                color: colors.mainColor,
                                                marginVertical: 5
                                            }}>경복궁</AppText>
                                            <AppText style={{fontSize: 12,color: colors.gray[4]}}>서울시 종로구</AppText>
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                            <Image source={require('../../assets/images/here_click.png')} style={{width: 26, height: 21}}></Image>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{backgroundColor: colors.defaultColor, height: 30, paddingVertical: 6, paddingLeft: 6, paddingRight: 5,
                                            marginBottom: 6, marginRight: 10, marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                                            }}>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={require('../../assets/images/tipIcon.png')} style={{width: 12, height: 12, marginEnd: 8}}></Image>
                                    <AppText style={{color: colors.blue[1], fontSize: 14}}>근처에 xxx파전 맛집에서 막걸리 한잔 캬</AppText>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Image style={{width: 28, height: 28}} source={require('../../assets/images/default_profile_2.png')}></Image>
                                </View>
                            </View>
                            {/* 클릭하면 전체 다 받아지고, isEnable 같은 데이터 이용해서 이미지 바꾸는걸로 수정 */}
                            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 18}}>
                                <Image source={require('../../assets/images/clickBottom_forDir.png')} style={{width: 24, height: 6}}></Image>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', marginTop: 26, justifyContent: 'center', alignItems: 'center'}}>
                            <AppText style={{fontSize: 14, fontWeight: '400', color: colors.gray[2]}}>전체보기</AppText>
                            <Image source={require('../../assets/images/showWhole_forDir.png')} style={{width: 15, height: 15, marginLeft: 10, marginBottom: 5}}></Image>
                        </View>
                    </View>

                    {/* 들어온 공간 배열의 값이 0이면 이거 띄우는 컨디셔널 렌더링 필요 */}
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 52, display: 'none'}}>
                        <Image source={require('../../assets/images/empty_forDir.png')} style={{width: 150, height: 120, justifyContent: 'center', alignItems: 'center', marginBottom: 12}}></Image>
                        <AppText style={{fontSize: 14, color: colors.red_gray[2], fontWeight: '400'}}>공간이 담겨있지 않아요!</AppText>
                    </View>

                    <ScreenDivideLine style={{marginVertical: 16}} />
                </View>

                <View style={{marginHorizontal: '5%', marginBottom: 143}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AppText style={{...styles.titles, color: colors.mainColor}}>댓글</AppText>
                        <AppText style={{color: colors.gray[3], fontSize: 14, marginStart: 11, marginTop: 5}}>총 <AppText style={{fontWeight: '700'}}>20개</AppText></AppText>
                    </View>
                    <InputBox
                        placeholder="보관함에 댓글을 남겨보세요!"
                        style={{marginVertical: 20}}
                    />

                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('../../assets/images/default_profile_3.png')} style={{width: 80, height: 80, borderRadius: 50}}></Image>
                            </View>
                            <View style={{marginRight: 20}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', width: 267, marginTop: 4, marginBottom: 8}}>
                                    <AppText style={{color: colors.mainColor, fontSize: 12}}>minsun</AppText>
                                    <AppText style={{marginHorizontal: 8, color: colors.gray[5], fontSize: 10}}>|</AppText>
                                    <AppText style={{color: colors.gray[4], fontSize: 12}}>21.06.24</AppText>
                                </View>
                                <View><AppText style={{fontSize: 12, color: colors.mainColor, width: 267, lineHeight: 16, fontWeight: '700'}}>
                                        종로 25년 토박종로 25년 토박이가 알려주는 종로 사진스팟
                                </AppText></View>
                            </View>
                        </View>
                    </View>

                    <View style={{width: '100%', height: 1, backgroundColor: colors.red_gray[6], zIndex: -1000, marginVertical: 12}}></View>

                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('../../assets/images/default_profile_3.png')} style={{width: 80, height: 80, borderRadius: 50}}></Image>
                            </View>
                            <View style={{marginRight: 20}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', width: 267, marginTop: 4, marginBottom: 8}}>
                                    <AppText style={{color: colors.mainColor, fontSize: 12}}>minsun</AppText>
                                    <AppText style={{marginHorizontal: 8, color: colors.gray[5], fontSize: 10}}>|</AppText>
                                    <AppText style={{color: colors.gray[4], fontSize: 12}}>21.06.24</AppText>
                                </View>
                                <View><AppText style={{fontSize: 12, color: colors.mainColor, width: 267, lineHeight: 16, fontWeight: '700'}}>
                                        종로 25년 토박종로 25년 토박이가 알려주는 종로 사진스팟
                                </AppText></View>
                            </View>
                        </View>
                    </View>

                    <View style={{width: '100%', height: 1, backgroundColor: colors.red_gray[6], zIndex: -1000, marginVertical: 12}}></View>

                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('../../assets/images/default_profile_3.png')} style={{width: 80, height: 80, borderRadius: 50}}></Image>
                            </View>
                            <View style={{marginRight: 20}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', width: 267, marginTop: 4, marginBottom: 8}}>
                                    <AppText style={{color: colors.mainColor, fontSize: 12}}>minsun</AppText>
                                    <AppText style={{marginHorizontal: 8, color: colors.gray[5], fontSize: 10}}>|</AppText>
                                    <AppText style={{color: colors.gray[4], fontSize: 12}}>21.06.24</AppText>
                                </View>
                                <View><AppText style={{fontSize: 12, color: colors.mainColor, width: 267, lineHeight: 16, fontWeight: '700'}}>
                                        종로 25년 토박종로 25년 토박이가 알려주는 종로 사진스팟
                                </AppText></View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        </ScreenContainer>
        </NativeBaseProvider>
    );
}


const styles = StyleSheet.create({
    titles: {
        fontSize: 20,
        // marginLeft: '5%',
        fontWeight: 'bold'
    },
    dirType: {
        borderWidth: 1,
        paddingVertical: 1,
        paddingHorizontal: 8,
        marginEnd: 8,
        borderRadius: 14,
        width: 43,
        height: 22,
        flexDirection: 'row',
        zIndex: 10000,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 1},
        elevation: 1
    },
    dirFreeText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    reviewImage: {
        width: 56,
        height: 56,
        borderRadius: 50,

    },
});

