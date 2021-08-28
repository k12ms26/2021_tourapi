import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Image, ScrollView, Text, View, FlatList, SafeAreaView, Dimensions, TouchableOpacity, Platform} from "react-native";
import {StyleSheet} from "react-native";
import OIcon from 'react-native-vector-icons/Octicons'
import React, {useEffect, useState, useContext} from "react";
import { Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

function Like() {
    const { colors } = useTheme();
    return (
        <View flex={1} backgroundColor={colors.backgroundColor}>
            <View style={{flexDirection: 'row', paddingTop: 12}}>
                <View style={{flexDirection: 'row'}}>
                    <AppText style={{color: colors.mainColor}}>최근 추가순</AppText>
                    <Icon style={{color: colors.mainColor, paddingTop: 1, paddingLeft: 8}} type="ionicon" name={"chevron-down-outline"} size={16}></Icon>
                </View>
                <View style={{flexDirection: 'row', marginLeft:'40%'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Icon style={{color: colors.mainColor, marginTop: 3, marginRight: 2}} type="ionicon" name={"funnel"} size={13}></Icon>
                        <AppText style={{color: colors.mainColor}}>필터</AppText>
                    </View>
                    <View style={{marginHorizontal: 10}}><AppText style={{color: colors.subColor}}>|</AppText></View>
                    <View style={{flexDirection: 'row'}}>
                        <Icon style={{color: colors.mainColor, marginTop: 3, marginRight: 2}} type="ionicon" name={"pencil"} size={13}></Icon>
                        <AppText style={{color: colors.mainColor}}>편집</AppText>
                    </View>
                </View>
            </View>
            {/* <View flexDirection="row" style={{marginVertical: 20}}>
                <View className="keyword" style={styles.keyword_1}>
                    <AppText style={{fontWeight: "bold", color: "white"}}>전체</AppText>
                </View>
                <View className="keyword" style={styles.keyword_2}>
                    <AppText style={{fontWeight: "bold", color: "white"}}>장소</AppText>
                </View>
                <View className="keyword" style={styles.keyword_2}>
                    <AppText style={{fontWeight: "bold", color: "white"}}>보관함</AppText>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="place-container"
                      flexDirection="row"
                      style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginVertical: 20,
                          height: 80
                      }}>
                    <View className="place-img">
                        <Image style={{width: 80, height: 80, borderRadius: 10}}
                               source={require('../assets/images/mountain.jpeg')}
                               resizeMode="cover"
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        height: "100%",
                        justifyContent: 'space-around',
                        paddingVertical: 12,
                        marginLeft: 20
                    }}>
                        <AppText style={{fontSize: 22, fontWeight: '900'}}>청계산</AppText>
                        <AppText style={{fontSize: 16}}>뭐가들어가야할가..</AppText>
                    </View>
                    <View flexDirection="column" style={{alignItems: "center", marginRight: 20}}>
                        <OIcon name="heart" size={30} color="#000"/>
                        <AppText>4.7k</AppText>
                    </View>
                </View>
                <View className="place-container"
                      flexDirection="row"
                      style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginVertical: 20,
                          height: 80
                      }}>
                    <View className="place-img">
                        <Image style={{width: 80, height: 80, borderRadius: 10}}
                               source={require('../assets/images/mountain.jpeg')}
                               resizeMode="cover"
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        height: "100%",
                        justifyContent: 'space-around',
                        paddingVertical: 12,
                        marginLeft: 20
                    }}>
                        <AppText style={{fontSize: 22, fontWeight: '900'}}>청계산</AppText>
                        <AppText style={{fontSize: 16}}>뭐가들어가야할가..</AppText>
                    </View>
                    <View flexDirection="column" style={{alignItems: "center", marginRight: 20}}>
                        <OIcon name="heart" size={30} color="#000"/>
                        <AppText>4.7k</AppText>
                    </View>
                </View>
                <View className="place-container"
                      flexDirection="row"
                      style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginVertical: 20,
                          height: 80
                      }}>
                    <View className="place-img">
                        <Image style={{width: 80, height: 80, borderRadius: 10}}
                               source={require('../assets/images/mountain.jpeg')}
                               resizeMode="cover"
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        height: "100%",
                        justifyContent: 'space-around',
                        paddingVertical: 12,
                        marginLeft: 20
                    }}>
                        <AppText style={{fontSize: 22, fontWeight: '900'}}>청계산</AppText>
                        <AppText style={{fontSize: 16}}>뭐가들어가야할가..</AppText>
                    </View>
                    <View flexDirection="column" style={{alignItems: "center", marginRight: 20}}>
                        <OIcon name="heart" size={30} color="#000"/>
                        <AppText>4.7k</AppText>
                    </View>
                </View>
                <View className="place-container"
                      flexDirection="row"
                      style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginVertical: 20,
                          height: 80
                      }}>
                    <View className="place-img">
                        <Image style={{width: 80, height: 80, borderRadius: 10}}
                               source={require('../assets/images/mountain.jpeg')}
                               resizeMode="cover"
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        height: "100%",
                        justifyContent: 'space-around',
                        paddingVertical: 12,
                        marginLeft: 20
                    }}>
                        <AppText style={{fontSize: 22, fontWeight: '900'}}>청계산</AppText>
                        <AppText style={{fontSize: 16}}>뭐가들어가야할가..</AppText>
                    </View>
                    <View flexDirection="column" style={{alignItems: "center", marginRight: 20}}>
                        <OIcon name="heart" size={30} color="#000"/>
                        <AppText>4.7k</AppText>
                    </View>
                </View>
                <View className="place-container"
                      flexDirection="row"
                      style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginVertical: 20,
                          height: 80
                      }}>
                    <View className="place-img">
                        <Image style={{width: 80, height: 80, borderRadius: 10}}
                               source={require('../assets/images/mountain.jpeg')}
                               resizeMode="cover"
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        height: "100%",
                        justifyContent: 'space-around',
                        paddingVertical: 12,
                        marginLeft: 20
                    }}>
                        <AppText style={{fontSize: 22, fontWeight: '900'}}>청계산</AppText>
                        <AppText style={{fontSize: 16}}>뭐가들어가야할가..</AppText>
                    </View>
                    <View flexDirection="column" style={{alignItems: "center", marginRight: 20}}>
                        <OIcon name="heart" size={30} color="#000"/>
                        <AppText>4.7k</AppText>
                    </View>
                </View>
            </ScrollView> */}
        </View>

    );
}

function Collection() {
    useEffect(() => {
        getCollectionsFromUsers(1);
    }, [])

    const { colors } = useTheme();
    const [directoryData, setDirectoryData] = useState({});
    const [directoryType, setDirectoryType] = useState([
        {
            id: 1,
            name: '전체',
            pressed : true,
        },
        {
            id: 2,
            name: '내 보관함',
            pressed : false,
        },
        {
            id: 3,
            name: '수집한 보관함',
            pressed : false,
        },
        {
            id: 4,
            name: '일정보관함',
            pressed : false,
        },
        {
            id: 5,
            name: '자유보관함',
            pressed : false,
        }
    ])
    const [selectedDirType, setSelectedDirType] = useState(directoryType[0].name);

    const [HashTag, setHashTag] = useState([]);
    const getCollectionsFromUsers = (type) => {
        try {
            fetch('http://34.146.140.88/collections/collections_free', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((res) => res.json())
                .then((responsedata) => {
                    if(type===1) {
                        //전체
                        setDirectoryData(responsedata.sort(responsedata.collection_pk).reverse())
                    } else if(type===2) {
                        //내 보관함
                        //todo 다른 사용자의 보관함 가져올때 필터링 필요
                        setDirectoryData(responsedata.sort(responsedata.collection_pk).reverse())
                    } else if(type===3) {
                        //todo 일단 수집한게 없으니까 비워둠 ... 다시 해야지
                        setDirectoryData([])
                    } else if(type===4) {
                        setDirectoryData(responsedata.filter(responsedata => responsedata.collection_type == 0))
                    } else if(type===5) {
                        setDirectoryData(responsedata.filter(responsedata => responsedata.collection_type == 1))
                    }
                })
                .catch((err) => {
                    console.error(err)
                });
    
        } catch (err) {
            console.error(err);
        }
    }

    const showDirectories = ({item}) => (
        <View style={styles.rankingContainer}>
            <View style={{height: '68%'}}>
                <View style={[{zIndex: 10000, flexDirection: 'row', justifyContent: 'space-between'}]}>
                    <View style={[styles.dirType, {borderColor: colors.backgroundColor, backgroundColor: colors.backgroundColor}]}><AppText style={item.collection_type==1 ? [styles.dirFreeText, {color: colors.mainColor}] : [styles.dirPlanText, {color: colors.emphasizedColor}]}>{item.collection_type===1 ? '자유' : '일정'}</AppText></View>
                    {item.collection_private === 1 && <View style={{marginRight: 9, marginTop: 8}}><Image style={{width: 20, height: 20}} source={require('../assets/images/lock.png')}></Image></View>}
                </View>
                <Image style={styles.defaultImage} source={require('../assets/images/mountain.jpeg')}/>
            </View>
            <View style={{marginLeft: 10}}>
                <AppText style={{marginVertical: 4, fontSize: 14, fontWeight: 'bold'}}>{item.collection_name}</AppText>
                <View style={{flexDirection: 'row', marginBottom: 18}}>
                    {item.collection_keywords.split(',').map((word, idx) =>(
                        (idx <= word.length) && <AppText key={idx} style={{color: colors.hashTagColor, fontSize: 10, marginEnd: 6.21}}># {word}</AppText>
                    ))}
                </View>
                <View style={{flexDirection: 'row'}}>
                    <AppText style={{fontSize: 8, width: '60%'}}>by minsun</AppText>
                    <View style={{marginRight: 8, flexDirection: 'row'}}>
                        <Image source={require('../assets/images/here_icon.png')} style={{width: 8, height: 8, margin: 2}}></Image>
                        <AppText style={{fontSize: 8, color: colors.hashTagColor, fontWeight: 'bold'}}>1.2k</AppText>
                    </View>
                    <View style={{marginRight: 8, flexDirection: 'row'}}>
                        <Icon type="ionicon" name={"location"} size={8} color={colors.hashTagColor}
                            style={{margin: 2}}></Icon>
                        <AppText style={{fontSize: 8, color: colors.hashTagColor, fontWeight: 'bold'}}>9</AppText>
                    </View>
                </View>
            </View>
    </View>

    )

    const Keyword = ({type, idx}) => {
        return (
            <View key={idx}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 2
                }}
            >
                <TouchableOpacity onPress={()=>{
                    //todo 야매로 전체 눌렀을때만 새로고침 가능하도록 만들었는데... 하 어떻게 해야할지 고민을 조금더 해봐야할듯
                            let newArr = [...directoryType];
                            if(newArr[type.id-1].pressed) {
                                if(type.id != 1) newArr[type.id-1].pressed = false;
                                setDirectoryType(newArr);
                                getCollectionsFromUsers(type.id)
                            } else {
                                for(let i=0;i<newArr.length;i++) {
                                    if(i == type.id-1) continue;
                                    else newArr[i].pressed = false;
                                }
                                newArr[type.id-1].pressed = true;
                                setDirectoryType(newArr);
                                setSelectedDirType(newArr[type.id-1].name)
                                getCollectionsFromUsers(type.id)
                            }
                            }} style={directoryType[type.id-1].pressed ? [styles.selectTypeClicked, {borderColor: colors.mainColor, backgroundColor: colors.mainColor, shadowColor: colors.shadowColor}] : [styles.selectType, {borderColor: colors.defaultColor, backgroundColor: colors.defaultColor, shadowColor: colors.shadowColor}]}
                            disabled={directoryType[type.id-1].pressed && type.id != 1 ? true : false}
                            >
                            <AppText style={directoryType[type.id-1].pressed ? [styles.selectTypeTextClicked, {color : colors.defaultColor}] : [styles.selectTypeText, {color : colors.subColor}]}>{type.name}</AppText>
                </TouchableOpacity>                     
            </View>
        )
    }
    return (
        <View flex={1} style={{backgroundColor: colors.backgroundColor}}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: colors.backgroundColor}}>
                <View flexDirection="row" style={{marginVertical: 20}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {directoryType.map((name, idx) => (
                            <Keyword type={name} key={idx}/>
                        ))}
                    </ScrollView>
                </View>
                </View>

                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <AppText style={{color: colors.mainColor}}>최근 추가순</AppText>
                        <Icon style={{color: colors.mainColor, paddingTop: 1, paddingLeft: 8}} type="ionicon" name={"chevron-down-outline"} size={16}></Icon>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Icon style={{color: colors.mainColor, marginTop: 3, marginRight: 2}} type="ionicon" name={"funnel"} size={13}></Icon>
                            <AppText style={{color: colors.mainColor}}>필터</AppText>
                        </View>
                        <View style={{marginHorizontal: 10}}><AppText style={{color: colors.subColor}}>|</AppText></View>
                        <View style={{flexDirection: 'row'}}>
                            <Icon style={{color: colors.mainColor, marginTop: 3, marginRight: 2}} type="ionicon" name={"pencil"} size={13}></Icon>
                            <AppText style={{color: colors.mainColor}}>편집</AppText>
                        </View>
                    </View>
                </View>
            <View style={{marginVertical: '2.5%'}}>
                <AppText style={{color: colors.mainColor, fontSize: 18, fontWeight: 'bold', marginTop: 5}}>{selectedDirType}</AppText>
            </View>
            <ScrollView horizontal={true} scrollEnabled={false}>
                <SafeAreaView>
                    <FlatList contentContainerStyle={{justifyContent: 'space-between'}} numColumns={2} data={directoryData} renderItem={showDirectories} keyExtractor={(item) => item.collection_pk.toString()} nestedScrollEnabled/>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

const MypageNavigation = () => {
    const { colors } = useTheme();
    return (
        <Tab.Navigator
            swipeEnabled={true}
            tabBarOptions={{
                labelStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                },
                indicatorStyle: {
                    backgroundColor: colors.emphasizedColor,
                    height: 2,
                    // width: 50,
                    // marginLeft: Dimensions.get('screen').width/6.2,
                    // marginLeft: Platform.OS === 'ios' ? Dimensions.get('screen').width/6 : Dimensions.get('screen').width/6.2
                    width: Dimensions.get('screen').width/6 * 0.9,
                    marginLeft: Dimensions.get('screen').width/6 * 0.9
                },
                style: {
                    elevation: 0,
                    backgroundColor: colors.backgroundColor,
                    height: 40,
                },
                activeTintColor: colors.mainColor,
                inactiveTintColor: colors.notClickedDirColor,
            }}
            style={{paddingBottom: 15}}
        >
            <Tab.Screen name="공간" component={Like} Options={{
                tabBarLabel: {
                    focused: true
                }
            }}/>
            <Tab.Screen name="보관함" component={Collection}/>
        </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    // keyword_1 : {
    //     backgroundColor: "black",
    //     paddingVertical: 5,
    //     paddingHorizontal: "3%",
    //     borderRadius: 14,
    //     alignItems: "center",
    //     flexDirection: "row",
    //     marginRight: "3%"
    // },
    // keyword_2 : {
    //     backgroundColor : "#bbb",
    //     paddingVertical: 5,
    //     paddingHorizontal: "3%",
    //     borderRadius: 14,
    //     alignItems: "center",
    //     flexDirection: "row",
    //     marginRight: "3%"
    // },
    rankingContainer: {
        marginEnd: Dimensions.get('screen').width/14,
        marginTop: 11,
        width: 162,
        height: 249,
        // borderRadius: 10,
        // alignItems: 'center',
        // justifyContent: 'space-between'
    },
    dirType: {
        borderWidth: 1,
        paddingVertical: 1,
        paddingHorizontal: 8,
        borderRadius: 14,
        elevation: 1,
        width: 43,
        height: 22,
        marginLeft: 9,
        marginTop: 8,
        flexDirection: 'row',
        zIndex: 10000,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dirFreeText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    dirPlanText: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    defaultImage: {
        width: '100%',
        height: 162,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'absolute',
    },
    selectType: {
        borderWidth: 1,
        paddingVertical: 1,
        paddingHorizontal: 8.5,
        borderRadius: 12,
        marginRight: 10,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        elevation: 1,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectTypeClicked: {
        borderWidth: 1,
        paddingVertical: 1,
        paddingHorizontal: 8.5,
        borderRadius: 12,
        marginRight: 10,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        elevation: 1,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectTypeTextClicked: {
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        marginVertical: 2
    },
    selectTypeText: {
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginVertical: 2
    },
})
export default MypageNavigation;