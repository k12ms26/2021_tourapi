import React, {useState, useEffect, useContext} from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet, SafeAreaView, FlatList, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Star from '../../assets/images/search/star.svg';
import Jewel from '../../assets/images/jewel.svg';
import AppText from '../../components/AppText';
import { searchKeyword } from '../../contexts/SearchkeywordContextProvider';
import ShowEmpty from '../../components/ShowEmpty';

const SearchPlaceForPlan = (props, {navigation}) => {
    const {colors} = useTheme();
    const [placeList, setPlaceList] = useState([]);
    const [searchType, setSearchType] = useState('place');
    const [like, setLike] = useState(false);
    const [keyword, setKeyword] = searchKeyword();

    const styles = StyleSheet.create({
        info_container : {
            marginLeft: 8,
            paddingVertical : 1.5,
            justifyContent: 'space-between',
            height: '100%'
        },
        score_line : {
            width: 1,
            height: '80%',
            backgroundColor: colors.gray[4],
            marginHorizontal: 4
        }
    });

    useEffect(() => {
        getResults();
    }, [keyword]);

    const getResults = () => {
        try {
            fetch(`http://localhost:3000/search?keyword=${decodeURIComponent(keyword)}&type=${searchType}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((res) => res.json())
                .then((response) => {
                    setPlaceList(response.data);
                    console.log(placeList);
                    setFalse();
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    const checkType = (type) => {
        if(type === 12) {
            return '관광지';
        } else if(type === 14) {
            return '문화시설';
        } else if(type === 15) {
            return '축제/공연/행사';
        } else if(type === 28) {
            return '레포츠';
        } else if(type === 32) {
            return '숙박';
        } else if(type === 38) {
            return '쇼핑';
        } else if(type === 39) {
            return '음식';
        } else {
            return '기타';
        }
    };

    const [isPress, setIsPress] = useState([]);
    const setFalse = () => {
        var pressed = [];
        for (let i = 0; i < placeList.length; i++) {
            pressed.push(false);
        }
        setIsPress(pressed);
    };

    const PlaceContainer = ({item, index}) => ( 
        <TouchableOpacity onPress={()=>props.navigation.navigate('Place', {data : item})}>
            <View style={{marginBottom: 8, alignItems: 'center', height: 72, marginTop: 22, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', width: '85%'}}>
                    <Image source={require('../../assets/images/mountain.jpeg')} style={{borderRadius: 10, width: 72, height: 72}}/>
                    <View flex={1} style={styles.info_container}>
                        <View flexDirection="row" style={{alignItems: 'center'}}>
                            <AppText style={{fontSize: 10, color: colors.mainColor}}>{checkType(item.place_type)}</AppText>
                            <View style={styles.score_line}></View>
                            <Star width={11} height={11} style={{marginTop: 2}} />
                            <AppText style={{fontSize: 10, color: colors.mainColor, marginLeft: 2}}>{item.star}</AppText>
                        </View>
                        <AppText style={{fontSize: 16, fontWeight: '700', color: colors.mainColor}}>{item.place_name}</AppText>
                        <AppText style={{fontSize: 12, fontWeight: '400', color: colors.gray[4]}}>{item.place_addr}</AppText>
                    </View>
                </View>
                <TouchableOpacity onPress={() =>{
                    let newArr = [...isPress];
                    if(newArr[index]) {
                        newArr[index] = false;
                        setIsPress(newArr);
                        // deletePlace(item.place_pk)
                    } else {
                        for(let i=0;i<newArr.length;i++) {
                            if(i == index) continue;
                            else newArr[i] = false;
                        }
                        newArr[index] = true;
                        setIsPress(newArr);
                        // likePlace(item.place_pk)
                    }
                }}
                style={{width: '15%'}}
                >
                    <View style={{height: 28, backgroundColor: colors.mainColor, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{paddingVertical: 4.5, paddingHorizontal: 4.5}}>
                            <AppText style={{color: colors.backgroundColor, fontSize: 12, lineHeight: 19.2, fontWeight: '500'}}>추가하기</AppText>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{backgroundColor: colors.backgroundColor}}>
            <ScrollView>
                {
                    placeList.length === 0 ? 
                        <ShowEmpty /> :
                        <SafeAreaView>
                            <FlatList data={placeList} renderItem={PlaceContainer} keyExtractor={(item, index) => item.place_pk.toString()} nestedScrollEnabled/>
                        </SafeAreaView>
                }
            </ScrollView>
        </View>
    );
};

export default SearchPlaceForPlan;
