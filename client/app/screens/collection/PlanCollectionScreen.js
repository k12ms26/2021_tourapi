import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    SafeAreaView,
    ScrollView,
    Dimensions,
    TextInput,
    Pressable,
    FlatList,
    Modal,
    Alert,
    KeyboardAvoidingView,
    Share
} from 'react-native';
import {useTheme, useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSharedValue } from 'react-native-reanimated';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import AppText from '../../components/AppText';
import ScreenContainer from '../../components/ScreenContainer';
import ScreenDivideLine from '../../components/ScreenDivideLine';
import ScreenContainerView from '../../components/ScreenContainerView';

import {useToken} from '../../contexts/TokenContextProvider';

import DragAndDropList from './DragAndDropList';
import ShowPlaces from './ShowPlaces';

import Jewel from '../../assets/images/jewel.svg';
import BackIcon from '../../assets/images/back-icon.svg';
import MoreIcon from '../../assets/images/more-icon.svg';
import DefaultThumbnail from '../../assets/images/profile_default.svg';
import CustomMarker from '../../assets/images/map/map-marker.svg';

import moment from 'moment';
import 'moment/locale/ko';
import * as SecureStore from 'expo-secure-store';
import {useIsSignedIn} from '../../contexts/SignedInContextProvider';
import {useAlertDuplicated} from '../../contexts/LoginContextProvider';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PlanCollectionScreen = ({route, navigation}) => {
    const {colors} = useTheme();
    const {data} = route.params;
    const [collectionData, setCollectionData] = useState({});
    const [placeData, setPlaceData] = useState([]);
    const [commentsData, setCommentsData] = useState([]);
    const [editedLocationData, setEditedLocationData] = useState([]);
    const [placeLength, setPlaceLength] = useState(0);
    const [isEditPage, setIsEditPage] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [planDays, setPlanDays] = useState([]);
    const [keywords, setKeywords] = useState([]);

    const isFocused = useIsFocused();
    const [isLimited, setIsLimited] = useState(false);

    const [token, setToken] = useToken();
    const [userData, setUserData] = useState({});
    const [isSignedIn, setIsSignedIn] = useIsSignedIn();
    const refRBSheet = useRef();
    const [replacementData, setReplacementData] = useState([]);
    const [alertDuplicated, setAlertDuplicated] = useAlertDuplicated(false);

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                `[히든쥬얼] ${collectionData.collection_name}`
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert('', error.message);
        }
    };

    const isDeleted = (deletedData) => {
        setIsDeletedOrigin(deletedData);
    };

    const isCommentDeleted = (deletedCommentData) => {
        setIsDeletedComment(deletedCommentData);
    };

    const isReplacementGotten = (gottenReplacementData) => {
        setIsGottenReplacementMapPk(gottenReplacementData);
    };

    const isReplacementDeleted = (deletedReplacementData) => {
        setIsDeletedReplacement(deletedReplacementData);
    };

    const getUserData = () => {
        try {
            fetch('http://34.64.185.40/user', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            }).then((res) => res.json())
                .then(async (response) => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }

                    setUserData(response.data);
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getInitialCollectionData();
        getInitialPlaceData();
        getCollectionCommentsData();
        getUserData();
    }, [isFocused]);

    const getInitialCollectionData = () => {
        try {
            fetch(`http://34.64.185.40/collection/${data.collection_pk}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            }).then((res) => res.json())
                .then(async (response) => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }

                    setCollectionData(response.data);
                    if(response.data.collection_start_date) setStartDate(response.data.collection_start_date.split('T')[0]);
                    if(response.data.collection_end_date) setEndDate(response.data.collection_end_date.split('T')[0]);
                    setKeywords(response.data.keywords);

                    var newArr = [];

                    if(response.data.collection_start_date && response.data.collection_end_date) {
                        var gap = moment(response.data.collection_end_date.split('T')[0]).diff(moment(response.data.collection_start_date.split('T')[0]), 'days');
                        for(var i=0;i<=gap;i++) {
                            newArr.push({
                                id: i,
                                days: moment(response.data.collection_start_date.split('T')[0]).add(i, 'd').format('YYYY.MM.DD')
                            });
                        }
                    }

                    setPlanDays(newArr);
                    setObjects(newArr);
                    setFalse(newArr);
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    const getInitialPlaceData = () => {
        try {
            fetch(`http://34.64.185.40/collection/${data.collection_pk}/places`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            }).then(res => res.json())
                .then(async response => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }

                    setPlaceData(response.data.placeList);
                    var exceptLength = 0;
                    for(let i = 0; i < response.data.placeList.length; i++) {
                        if(response.data.placeList[i].place_pk === -1 || response.data.placeList[i].place_pk === -2) exceptLength += 1;
                    }
                    setPlaceLength(response.data.placeList.length - exceptLength);

                    var pressed = [];
                    for (let i = 0; i < placeLength; i++) {
                        pressed.push(false);
                    }
                    setIsPress(pressed);
                    setDeletedData(response.data.placeList);

                    //시간대 제외하기
                    const res = response.data.placeList;
                    var newArr = [];
                    if(res.length !== 0) {
                        for(var i=0;i<res.length;i++) {
                            if(res[i].place_pk !== -1 && res[i].place_pk !== -2) newArr.push(res[i])
                        }
                    }
                    setEditedLocationData(newArr);

                    const newRegion = { ...region };
                    if(newArr.length > 0) {
                        newRegion.latitude = Number(parseFloat(newArr[0].place_latitude).toFixed(10));
                        newRegion.longitude = Number(parseFloat(newArr[0].place_longitude).toFixed(10));
                    }
                    setRegion(newRegion);

                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    const updatePlaceData = (updatedData, deletedData) => {
        // 공간 수정
        var putData = []; var isEmpty = 0;
        //빈 객체일때는 원래 순서 그대로 넣어주기
        var cur = 0;
        for(var i=0;i<planDays.length;i++) {
            for(var j=0;j<placeData.length;j++) {
                if(placeData[j].cpm_plan_day === i) {
                    cur += 1;
                    var forPutObj = {};
                    if(Object.keys(updatedData[i]).length === 0) {
                        isEmpty += 1;
                        forPutObj = {
                            cpm_map_pk: placeData[j].cpm_map_pk,
                            planDay: i,
                            order: placeData[j].cpm_order
                        };
                    } else {
                        forPutObj = {
                            cpm_map_pk: placeData[j].cpm_map_pk,
                            planDay: i,
                            order: Object.values(updatedData[i])[cur-1]
                        };
                    }
                    putData.push(forPutObj);
                } else cur = 0;

            }
        }
        var DATA = {};
        DATA.placeList = putData;
        DATA.deletePlaceList = deletedData;
        if(isEmpty !== placeData.length || deletedData.length !== 0) {
            try {
                fetch(`http://34.64.185.40/collection/${data.collection_pk}/places`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    },
                    body: JSON.stringify(DATA),
                }).then(res => res.json())
                    .then(async response => {
                        if (response.code === 405 && !alertDuplicated) {
                            Alert.alert('', '다른 기기에서 로그인했습니다.');
                            setAlertDuplicated(true);
                        }
    
                        if (parseInt(response.code / 100) === 4) {
                            await SecureStore.deleteItemAsync('accessToken');
                            setToken(null);
                            setIsSignedIn(false);
                            return;
                        }
                        await getInitialPlaceData();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } catch (err) {
                console.error(err);
            }
        }
    };

    const checkDeletedPlace = () => {
        var forDeleteData = [];
        for(var i=0;i<isDeletedOrigin.length;i++) {
            if(isDeletedOrigin[i] === true) {
                // deletePlace(placeData[i].cpm_map_pk, placeData[i].cpm_plan_day);
                forDeleteData.push(placeData[i].cpm_map_pk);
            }
        }
        
        return forDeleteData;
    };

    const getCollectionCommentsData = () => {
        try {
            fetch(`http://34.64.185.40/collection/${data.collection_pk}/comments`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            }).then((res) => res.json())
                .then(async (response) => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }

                    setCommentsData(response.data);
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    const postCollectionCommentsData = (comment) => {
        try {
            fetch(`http://34.64.185.40/collection/${data.collection_pk}/comments`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    comment: comment
                })
            }).then((res) => res.json())
                .then(async (response) => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }

                    getCollectionCommentsData();
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    const checkTrue = () => {
        if (collectionData.collection_private) return true;
        return false;
    };

    const checkPrivate = () => {
        if (collectionData.is_creator) return true;
        return false;
    };

    const [isPress, setIsPress] = useState([]);
    const setFalse = (data) => {
        var pressed = [];
        for (let i = 0; i < data.length; i++) {
            pressed.push(false);
        }
        setIsLimited(pressed);
    };

    const deleteCollection = (refRBSheet) => {
        try {
            fetch(`http://34.64.185.40/collection/${data.collection_pk}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            }).then((res) => res.json())
                .then(async (response) => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }

                    Alert.alert('', '삭제되었습니다.', [
                        {text : 'OK', onPress: () => {
                            if(data.now) navigation.pop(2);
                            else navigation.goBack();
                            refRBSheet.current.close();
                        }}]);
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    const LikeCollection = () => {
        //보관함 좋아요
        try {
            fetch(`http://34.64.185.40/like/collection/${collectionData.collection_pk}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            }).then((res) => res.json())
                .then(async (response) => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }

                    getInitialCollectionData();
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    const DeleteLikedCollection = () => {
        //보관함 좋아요 삭제
        try {
            fetch(`http://34.64.185.40/like/collection/${collectionData.collection_pk}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            }).then((res) => res.json())
                .then(async (response) => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }

                    getInitialCollectionData();
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    const postPlaceComment = (mapPk, addedComment) => {
        //한줄평 등록
        try {
            fetch(`http://34.64.185.40/collection/${collectionData.collection_pk}/place/${mapPk}/comment`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    comment: addedComment,
                })
            }).then((res) => res.json())
                .then(async response => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }
                    
                    getInitialPlaceData();
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    const putPlaceComment = (mapPk, editedComment) => {
        //한줄평 수정
        try {
            fetch(`http://34.64.185.40/collection/${collectionData.collection_pk}/place/${mapPk}/comment`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    comment: editedComment,
                })
            }).then((res) => res.json())
                .then(async response => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }

                    getInitialPlaceData();
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    const deletePlaceComment = (cpmMapPk, deletedComment) => {
        //한줄평 삭제
        try {
            fetch(`http://34.64.185.40/collection/${collectionData.collection_pk}/place/${cpmMapPk}/comment`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: {
                    comment: deletedComment
                }
            }).then((res) => res.json())
                .then(async response => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }

                    getInitialPlaceData();
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    const getReplacement = (cpmMapPk) => {
        //대체공간 불러오기
        try {
            fetch(`http://34.64.185.40/collection/${collectionData.collection_pk}/place/${cpmMapPk}/replacements`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            }).then((res) => res.json())
                .then(async response => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }
                    setReplacementData(response.data);
                    setDeletedReplacementData(response.data);
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    const setDeletedReplacementData = (data) => {
        var newArr = [];
        for(var i=0;i<data.length;i++) {
            newArr.push(false);
        }
        setIsDeletedReplacement(newArr);
    };

    const postReplacement = (mapPk, placePk, prev) => {
        //대체공간 추가
        try {
            fetch(`http://34.64.185.40/collection/${collectionData.collection_pk}/place/${mapPk}/replacement`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    order: replacementData.length+prev+1,
                    placeId: placePk
                })
            }).then((res) => res.json())
                .then(async response => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }

                    // getInitialPlaceData();
                    getReplacement(mapPk);
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    const putReplacement = (cpmMapPk, editedComment) => {
        //대체공간 수정
        // replacementPlaceList : 추후
        try {
            fetch(`http://34.64.185.40/collection/${collectionData.collection_pk}/replacement/place`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: {
                    replacementPlaceList : replacementPlaceList
                }
            }).then((res) => res.json())
                .then(async response => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }

                    getReplacement(cpmMapPk);
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    const checkDeletedReplacement = () => {
        for(var i=0;i<isDeletedReplacement.length;i++) {
            if(isDeletedReplacement[i] !== false) {
                deleteReplacement(placeData[i].cpm_map_pk, isDeletedReplacement[i]);
            }
        }
    };

    const deleteReplacement = (cpmMapPk, place_pk) => {
        //대체공간 삭제
        try {
            fetch(`http://34.64.185.40/collection/${collectionData.collection_pk}/place/${cpmMapPk}/replacement/${place_pk}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            }).then((res) => res.json())
                .then(async response => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }

                    getReplacement(cpmMapPk);
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };
    
    const deleteAllReplacement = (cpmMapPk) => {
        //대체공간 자체를 삭제
        try {
            fetch(`http://34.64.185.40/collection/${collectionData.collection_pk}/place/${cpmMapPk}/replacements`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            }).then((res) => res.json())
                .then(async response => {
                    if (response.code === 405 && !alertDuplicated) {
                        setAlertDuplicated(true);
                    }

                    if (parseInt(response.code / 100) === 4) {
                        await SecureStore.deleteItemAsync('accessToken');
                        setToken(null);
                        setIsSignedIn(false);
                        return;
                    }

                    getReplacement(cpmMapPk);
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    const Keyword = props => {
        return (
            <AppText style={{color: colors.gray[2], fontSize: 10, marginEnd: 8}}># {props.keyword}</AppText>
        );
    };

    //공간 삭제
    const [isDeletedOrigin, setIsDeletedOrigin] = useState([]);

    //대체공간 가져오기 : map Pk
    const [isGottenReplacementMapPk, setIsGottenReplacementMapPk] = useState(0);

    //한줄평 삭제, 대체공간 삭제
    const [isDeletedComment, setIsDeletedComment] = useState([]);
    const [isDeletedReplacement, setIsDeletedReplacement] = useState([]);

    //삭제된 게 어느 Day인지 (수정하기 페이지에서 사용하기 위함)
    const [deletedLengthByDays, setDeletedLengthByDays] = useState([]);

    const setDeletedData = (data) => {
        var newArr = []; var newDays = [];
        for(var i=0;i<data.length;i++) {
            // days.push(data[i].cpm_plan_day);
            newArr.push(false);
            newDays.push({
                day: data[i].cpm_plan_day,
                isDeleted: false,
            });
        }
        setDeletedLengthByDays(newDays);
        setIsDeletedOrigin(newArr);
    };

    const GeneralPage = props => {
        //현재 Day의 길이 (시간대 제외)
        var cnt = 0;
        for (let i = 0; i < placeData.length; i++) {
            if(placeData[i].cpm_plan_day === props.idx && placeData[i].place_pk !== -1 && placeData[i].place_pk !== -2) {
                cnt += 1;
            }
        }

        return (
            <SafeAreaView style={isEditPage && {display: 'none'}}>
                <FlatList data={placeData}
                    renderItem={({item, index}) => <ShowPlaces day={props.idx} item={item} index={index} key={index} isEditPage={isEditPage} navigation={navigation} curLength={cnt}
                        length={placeLength} private={collectionData.is_creator} pk={collectionData.collection_pk} originData={placeData} isDeleted={isDeleted} isDeletedOrigin={isDeletedOrigin} isLimited={isLimited[props.idx]}
                        isReplacementGotten={isReplacementGotten} isGottenReplacementMapPk={isGottenReplacementMapPk}
                        isReplacementDeleted={isReplacementDeleted} isDeletedReplacement={isDeletedReplacement} checkDeletedReplacement={checkDeletedReplacement} setDeletedReplacementData={setDeletedReplacementData}
                        postPlaceComment={postPlaceComment} putPlaceComment={putPlaceComment} deletePlaceComment={deletePlaceComment}
                        postReplacement={postReplacement} getReplacement={getReplacement} getInitialPlaceData={getInitialPlaceData} replacementData={replacementData}
                    />}
                    keyExtractor={(item, idx) => {idx.toString();}}
                    key={(item, idx) => {idx.toString();}}
                    nestedScrollEnabled/>

            </SafeAreaView>
        );};


    const setObjects = (data) => {
        var newArr = [];
        for(var i=0;i<data.length;i++) newArr.push({});
        editData.value = newArr;
    };
    const editData = useSharedValue([]);

    const isEdited = (data, day) => {
        var newObject = [...editData.value];
        newObject[day] = data;
        editData.value = newObject;
        return data;
    };

    const EditPage = props => {
        //현재 Day의 길이 (시간대 제외)
        var cnt = 0;
        var editedData = [];
        for (let i = 0; i < placeData.length; i++) {
            if(placeData[i].cpm_plan_day === props.idx) {
                if(placeData[i].place_pk !== -1 && placeData[i].place_pk !== -2) cnt += 1;
                editedData.push(placeData[i]);
            }
        }

        return (
            <SafeAreaView>
                <DragAndDropList data={editedData} idx={props.idx} isEditPage={isEditPage} isPress={isPress} key={`${props.idx}+${editedData[props.idx]}`} curLength={cnt}
                    navigation={navigation} length={placeLength} day={props.idx}
                    private={collectionData.is_creator} pk={collectionData.collection_pk} originData={placeData} isDeleted={isDeleted} isDeletedOrigin={isDeletedOrigin} isLimited={isLimited[props.idx]}
                    isCommentDeleted={isCommentDeleted} isDeletedComment={isDeletedComment} deletedLengthByDays={deletedLengthByDays}
                    isReplacementGotten={isReplacementGotten} isGottenReplacementMapPk={isGottenReplacementMapPk}
                    isReplacementDeleted={isReplacementDeleted} isDeletedReplacement={isDeletedReplacement} checkDeletedReplacement={checkDeletedReplacement} setDeletedReplacementData={setDeletedReplacementData}
                    postPlaceComment={postPlaceComment} putPlaceComment={putPlaceComment}
                    postReplacement={postReplacement} getReplacement={getReplacement} getInitialPlaceData={getInitialPlaceData} replacementData={replacementData}
                    isEdited={isEdited}
                />
            </SafeAreaView>
        );
    };

    const ShowDays = ({item, index}) => {
        const idx = index;
        const checkLength = () => {
            var placeLengthInDay = 0;
            for(var i=0;i<placeData.length;i++) {
                if(idx === 0) {
                    if((placeData[i].cpm_plan_day === -1 || placeData[i].cpm_plan_day === idx)&& placeData[i].place_pk != -1 && placeData[i].place_pk != -2) {
                        placeLengthInDay += 1;
                    }
                }
                else {
                    if(placeData[i].cpm_plan_day === idx && placeData[i].place_pk != -1 && placeData[i].place_pk != -2) {
                        placeLengthInDay += 1;
                    }
                }
            }
            return placeLengthInDay;
        };

        return (
            <>
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, marginBottom: 6}}>
                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <AppText style={{color: colors.blue[1], fontSize: 16, lineHeight: 25.6, fontWeight: '700'}}>Day {idx+1}</AppText>
                            </View>
                            <View style={{marginStart: 8}}>
                                <AppText style={{color: colors.blue[1], fontSize: 16, lineHeight: 25.6, fontWeight: '400'}}>{item.days}</AppText>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=>navigation.navigate('SearchForAdd', {pk: collectionData.collection_pk, placeData: placeData, day : idx, replace: false})}
                                style={(!collectionData.is_creator || isEditPage) && {display: 'none'}}
                                activeOpacity={0.8}
                            >
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon type="ionicon" name={'add-outline'} size={18} color={colors.mainColor} />
                                    <AppText style={{color: colors.mainColor, fontSize: 14, lineHeight: 22.4, fontWeight: '700'}}>공간 추가하기</AppText>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <GeneralPage idx={idx} key={idx+'general'}/> 
                <EditPage idx={idx} key={idx+'edit'}/>
                {checkLength() > 5 && !isEditPage && <TouchableOpacity activeOpacity={0.8}>
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 16,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        { !isLimited[idx] ?
                            <TouchableOpacity onPress={()=>{
                                var newArr = [...isLimited];
                                newArr[idx] = true;
                                setIsLimited(newArr);
                            }}
                            style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
                            activeOpacity={0.8}
                            >
                                <AppText style={{
                                    fontSize: 14,
                                    fontWeight: '400',
                                    color: colors.gray[2]
                                }}>전체보기</AppText>
                                <Image source={require('../../assets/images/showWhole_forDir.png')}
                                    style={{
                                        width: 15,
                                        height: 15,
                                        marginLeft: 10,
                                        marginBottom: 5
                                    }}></Image>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={()=>{
                                var newArr = [...isLimited];
                                newArr[idx] = false;
                                setIsLimited(newArr);
                            }}
                            style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
                            activeOpacity={0.8}
                            >
                                <AppText style={{
                                    fontSize: 14,
                                    fontWeight: '400',
                                    color: colors.gray[2]
                                }}>닫기</AppText>
                                <Image source={require('../../assets/images/showWhole_forDir.png')}
                                    style={{
                                        width: 15,
                                        height: 15,
                                        marginLeft: 10,
                                        marginTop: 7,
                                        transform: [{rotate: '180deg'}]
                                    }}></Image>
                            </TouchableOpacity>
                        }
                    </View>
                </TouchableOpacity>}
            </>
        );
    };

    const [showMenu, setShowMenu] = useState(false);
    const [deleteMenu, setDeleteMenu] = useState(false);

    const list = [
        { 
            title: '공간 수정',
            containerStyle: { backgroundColor: colors.backgroundColor },
            titleStyle: { color: colors.mainColor, fontSize: 16, fontWeight: '500', lineHeight: 25.6 },
        },
        { 
            title: '보관함 정보수정',
            containerStyle: { backgroundColor: colors.backgroundColor },
            titleStyle: { color: colors.mainColor, fontSize: 16, fontWeight: '500', lineHeight: 25.6 },
        },
        { 
            title: '보관함 공유',
            containerStyle: { backgroundColor: colors.backgroundColor },
            titleStyle: { color: colors.mainColor, fontSize: 16, fontWeight: '500', lineHeight: 25.6 },
        },
        {
            title: '보관함 삭제',
            containerStyle: { backgroundColor: colors.backgroundColor },
            titleStyle: { color: colors.red[3], fontSize: 16, fontWeight: '500', lineHeight: 25.6 },
        },
    ];

    const DeleteModal = props => (
        <Modal
            transparent={true}
            visible={deleteMenu}
            onRequestClose={() => {
                setDeleteMenu(!deleteMenu);
                props.refRBSheet.current.close();
            }}
        >
            <View style={styles.centeredView}>
                <View style={{...styles.modalView, backgroundColor: colors.backgroundColor}}>
                    <AppText style={{...styles.modalText, color: colors.blue[1]}}>보관함을 삭제할까요?</AppText>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Pressable
                            style={{...styles.button, backgroundColor: colors.gray[4]}}
                            onPress={() => {
                                props.refRBSheet.current.close();
                                setDeleteMenu(!deleteMenu);
                            }}
                        >
                            <AppText style={styles.textStyle}>취소하기</AppText>
                        </Pressable>
                        <Pressable
                            style={{...styles.button, backgroundColor: colors.red[3]}}
                            onPress={() => {
                                setDeleteMenu(!deleteMenu);
                                deleteCollection(props.refRBSheet);
                            }}
                        >
                            <AppText style={styles.textStyle}>삭제하기</AppText>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );

    const setDate = () => {
        if(Object.keys(collectionData).length === 0 && collectionData.constructor === Object) return '';
        else {
            //년도가 다를 경우
            if(parseInt(startDate.split('-')[0]) !== parseInt(endDate.split('-')[0])) {
                return `${moment(startDate.split('T')[0]).format('YYYY.MM.DD')}-${moment(endDate.split('T')[0]).format('YYYY.MM.DD')}`;
            }
            //월이 다를 경우
            if(parseInt(startDate.split('-')[1]) !== parseInt(endDate.split('-')[1])) {
                return `${moment(startDate.split('T')[0]).format('YYYY.MM.DD')}-${moment(endDate.split('T')[0]).format('MM.DD')}`;
            }
            //일이 다를 경우
            if(parseInt(startDate.split('-')[2]) !== parseInt(endDate.split('-')[2])) {
                return `${moment(startDate.split('T')[0]).format('YYYY.MM.DD')}-${moment(endDate.split('T')[0]).format('DD')}`;
            }
            //시작일과 종료일이 같을 경우
            else return `${moment(startDate.split('T')[0]).format('YYYY.MM.DD')}`;
        }
    };

    const setBGColor = (idx) => {
        if (idx === 0 || idx === 2) {
            return colors.red[3];
        } else if (idx === 1 || idx === 6) {
            return '#FFC36A';
        } else if (idx === 3 || idx === 8) {
            return '#639A94';
        } else if (idx === 4 || idx === 5) {
            return colors.blue[2];
        } else {
            return '#8F6DA4';
        }
    };

    const ShowComments = props => {
        const { data, idx } = props;
        return (
            <>
                <View flexDirection="row" style={{flex: 1, alignItems: 'flex-start'}}>
                    <View style={{...styles.authorImage, backgroundColor: setBGColor(idx)}}>
                        <DefaultThumbnail width={36} height={36}/>
                    </View>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 8,
                            flexWrap: 'wrap'
                        }}>
                            <AppText style={{color: colors.mainColor, fontSize: 12}}>{data.user_nickname}</AppText>
                            <AppText style={{
                                marginHorizontal: 8,
                                color: colors.gray[5],
                                fontSize: 10
                            }}>|</AppText>
                            <AppText style={{color: colors.gray[4], fontSize: 12}}>{moment(data.cc_create_time).format('YY.MM.DD')}</AppText>
                        </View>
                        <View style={{flex: 1, width: '100%'}}><AppText style={{
                            fontSize: 12,
                            color: colors.mainColor,
                            lineHeight: 16,
                            fontWeight: '700',
                            flexWrap: 'wrap',
                            width: windowWidth - 100
                        }}>{data.collection_comment}
                        </AppText></View>
                    </View>
                </View>

                <View style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: colors.red_gray[6],
                    zIndex: -1000,
                    marginVertical: 12
                }}></View>
            </>
        );
    };

    const ShowCollectionComments = () => {
        const [comments, setComments] = useState('');
        return (
            <View flex={1} style={{marginVertical: 20, justifyContent: 'flex-end'}}>
                <View flexDirection="row" style={{...styles.comment_box, borderColor: colors.gray[5]}}>
                    <TextInput flex={1} style={{fontSize: 16}}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="보관함에 댓글을 남겨보세요!"
                        value={comments}
                        placeholderTextColor={colors.gray[5]}
                        onChangeText={(text)=>setComments(text)}
                        onSubmitEditing={()=>{
                            if(comments !== '') {
                                setComments(comments);
                                postCollectionCommentsData(comments);
                            }
                            setComments('');
                        }}
                    />
                    <Pressable style={{marginLeft: 5}} onPress={()=>{
                        if(comments !== '') {
                            setComments(comments);
                            postCollectionCommentsData(comments);
                        }
                        setComments('');
                    }}>
                        <Icon style={{color: colors.gray[5], marginTop: 3, marginRight: 2}} type="ionicon"
                            name={'pencil'} size={16}></Icon>
                    </Pressable>
                </View>
            </View>
        );
    };

    const window = Dimensions.get('window');
    const WIDTH = window.width;
    const HEIGHT = window.height;

    const ASPECT_RATIO = WIDTH / HEIGHT;
    const LATITUDE_DELTA = 0.35;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const [lnt, setLnt] = useState(126.9775482762618);
    const [region, setRegion] = useState({
        latitude: 37.56633546113615,
        longitude: 126.9775482762618,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015,
    });

    const onMarkerPress = (event) => {
        const { id, coordinate } = event.nativeEvent;
        const newRegion = { ...region };
        newRegion.latitude = coordinate.latitude;
        newRegion.longitude = coordinate.longitude;
    
        setRegion(newRegion);
    };

    const EntireButton = () => {
        return (
            <View style={{position: 'absolute', right: 0, bottom: 0}}>
                <TouchableOpacity activeOpacity={0.8}
                    onPress={()=>navigation.navigate('ShowEntireMap', {title: collectionData.collection_name, placeData: editedLocationData, type: collectionData.collection_type, pk: collectionData.collection_pk})}>
                    <Image source={require('../../assets/images/map/entire-button.png')} style={{width: 40, height: 40}}/>
                </TouchableOpacity>
            </View>
        );
    };

    const ShowMarkers = props => {
        const { data, idx } = props;

        return (
            <Marker coordinate={{
                latitude: Number(parseFloat(data.place_latitude).toFixed(10)),
                longitude: Number(parseFloat(data.place_longitude).toFixed(10))
            }} style={{width: 100, height: 100}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <CustomMarker />
                    <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', top: 2}}>
                        <AppText style={{fontSize: 12, fontWeight: '500', lineHeight: 19.2, color: colors.mainColor}}>{data.cpm_plan_day === -1 ? 1 : data.cpm_plan_day + 1}</AppText>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: colors.mainColor, borderRadius: 30, height: 22, widht: '100%', marginTop: 4}}>
                        <View style={{justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 1.5}}>
                            <AppText style={{fontSize: 12, lineHeight: 19.2, fontWeight: '500', color: colors.defaultColor}} numberOfLines={1}>
                                {data.place_name}
                            </AppText>
                        </View>
                    </View>
                </View>
            </Marker>
        )
    };
  
    return (
        <ScreenContainer backgroundColor={colors.backgroundColor}>
            <View flexDirection="row" style={{
                height: 24,
                marginBottom: 20,
                marginTop: 20,
                marginHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{position: 'absolute', left: 0}}>
                    <TouchableOpacity onPress={() => {
                        if(data.now) {
                            if(isEditPage) setIsEditPage(false);
                            else navigation.pop(2);
                        }
                        else {
                            if(isEditPage) setIsEditPage(false);
                            else navigation.goBack();
                        }}} activeOpacity={0.8}>
                        <BackIcon style={{color: colors.mainColor}}/>
                    </TouchableOpacity>
                </View>
                {checkPrivate() ? <>
                    {
                        !isEditPage ?
                            <View style={{position: 'absolute', right: 0}}>
                                <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                                    style={{flex: 1, height: '100%'}} onPress={() => {
                                        refRBSheet.current.open();
                                    }} activeOpacity={0.8}>
                                    <MoreIcon style={{color: colors.mainColor}}/>
                                </TouchableOpacity>
                                <RBSheet
                                    ref={refRBSheet}
                                    closeOnDragDown={true}
                                    closeOnPressMask={true}
                                    height={250}
                                    customStyles={{
                                        wrapper: {
                                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                        },
                                        draggableIcon: {
                                            display: 'none'
                                        },
                                        container: {
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10,
                                            backgroundColor: colors.yellow[7],
                                            paddingTop: 10
                                        }
                                    }}
                                >
                                    {list.map((l, i) => (
                                        <TouchableOpacity onPress={()=>{
                                            if(i === 0) {
                                                setIsEditPage(true);
                                            }
                                            if(i === 1) {
                                                refRBSheet.current.close();
                                                navigation.navigate('MakePlanCollection', {data: collectionData, update: true, placeLength: placeLength});
                                            }
                                            if(i === 2) {
                                                onShare();
                                            }
                                            if(i === 3) {
                                                setDeleteMenu(true);
                                            }
                                        }} activeOpacity={0.8}>
                                            <View key={i} style={{marginLeft: 20, marginVertical: 11.5}}>
                                                <AppText style={l.titleStyle}>{l.title}</AppText>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                    <DeleteModal refRBSheet={refRBSheet}/>
                                </RBSheet>
                            </View> :
                            <View style={{position: 'absolute', right: 0}}>
                                <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={{flex: 1, height: '100%'}}
                                    onPress={async () => {
                                        setIsEditPage(false);
                                        isDeleted(isDeletedOrigin);
                                        isCommentDeleted(isDeletedComment);
                                        await updatePlaceData(editData.value, checkDeletedPlace());
                                    }} activeOpacity={0.8}>
                                    <View>
                                        <AppText style={{color: colors.mainColor, fontSize: 16, lineHeight: 19.2, fontWeight: '700'}}>완료</AppText>
                                    </View>
                                </TouchableOpacity>
                            </View>
                    }</> :
                    <View style={{position: 'absolute', right: 0}}>
                        <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            style={{flex: 1, height: '100%'}} onPress={() => {
                                onShare();
                            }} activeOpacity={0.8}>
                                <Icon type="ionicon" name={'share-social'} color={colors.mainColor} size={26}/>
                        </TouchableOpacity>
                    </View>
                    }
            </View>

            <ScrollView flex={1} stickyHeaderIndices={[1]}>
                <ScreenContainerView flex={1}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 8
                    }}>
                        <View
                            style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={[styles.dirType,
                                {
                                    borderColor: colors.defaultColor,
                                    backgroundColor: colors.defaultColor,
                                    shadowColor: colors.red[8]
                                }]}>
                                <AppText style={{...styles.dirFreeText, color: colors.red[3]}}>일정</AppText>
                            </View>
                            {
                                keywords.map((keyword, idx) => (
                                    <Keyword keyword={keyword} key={idx} />
                                ))
                            }
                        </View>
                        <View>
                            {checkTrue() &&
                            <Image source={require('../../assets/images/lock_forDir.png')}
                                style={{width: 22, height: 22}}></Image>}
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                            <AppText style={{color: colors.blue[1], fontSize: 16, lineHeight: 25.6, fontWeight: '500'}}>
                                {setDate()}
                            </AppText>
                            <AppText style={{
                                fontSize: 22,
                                fontWeight: '700',
                                color: colors.mainColor
                            }}>{collectionData.collection_name}</AppText>
                            <AppText style={{
                                fontSize: 12,
                                fontWeight: '400',
                                color: colors.gray[2],
                                lineHeight: 19.2,
                                marginTop: 12
                            }}>by. {collectionData.created_user_name}</AppText>
                        </View>
                        {
                            userData.user_nickname !== collectionData.created_user_name &&
                           <TouchableOpacity onPress={() => {
                               if (collectionData.like_flag) {
                                   DeleteLikedCollection();
                               } else {
                                   LikeCollection();
                               }
                           }} activeOpacity={0.8}>
                               <View style={{
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   marginVertical: 5
                               }}>
                                   <Jewel width={26} height={21}
                                       style={collectionData.like_flag ? {color: colors.red[3]} : {color: colors.red_gray[3]}}/>
                                   <AppText style={{
                                       fontSize: 10,
                                       fontWeight: '700',
                                       color: collectionData.like_flag ? colors.red[3] : colors.red_gray[3],
                                       marginTop: 2
                                   }}>{collectionData.like_cnt}</AppText>
                               </View>
                           </TouchableOpacity>
                        }
                    </View>
                </ScreenContainerView>

                <View style={{marginTop: 20}} flex={1}>
                    <View flex={1}>
                        <MapView style={{width: Dimensions.get('window').width, height: 150, flex: 1, alignItems: 'center'}}
                            region={region}
                            moveOnMarkerPress
                            tracksViewChanges={false}
                            onMarkerPress={onMarkerPress}
                        >
                            { editedLocationData.length > 0 &&
                            editedLocationData.map((data, idx) => (
                                <ShowMarkers data={data} idx={idx} key={idx}/>
                            ))
                            }
                        </MapView>
                        {
                            editedLocationData.length > 0 &&
                            <EntireButton />
                        }
                    </View>
                </View>

                <ScreenContainerView flex={1}>
                    <View style={{marginTop: 16}}>
                        <View style={{marginBottom: 16}}>
                            <AppText style={{color: colors.gray[4]}}>총 <AppText
                                style={{fontWeight: '700'}}>{placeLength}개</AppText> 공간</AppText>
                        </View>
                        <SafeAreaView>
                            <FlatList data={planDays} renderItem={ShowDays}
                                keyExtractor={(item, index) => index.toString()}
                                key={(item, index) => index.toString()}
                                nestedScrollEnabled/>
                        </SafeAreaView>
                    </View>
                </ScreenContainerView>

                <ScreenDivideLine style={{marginVertical: 16}}/>

                <ScreenContainerView flex={1}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AppText style={{...styles.titles, color: colors.mainColor}}>댓글</AppText>
                        <AppText style={{
                            color: colors.gray[3],
                            fontSize: 14,
                            marginStart: 11,
                            marginTop: 5
                        }}>총 <AppText style={{fontWeight: '700'}}>{commentsData.length}개</AppText></AppText>
                    </View>
                </ScreenContainerView>

                <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScreenContainerView flex={1}>
                        <ShowCollectionComments />
                        {
                            commentsData.length !== 0 &&
                            <View style={{marginTop: 4}}>{
                                commentsData.map((data, idx) => (
                                    <ShowComments data={data} key={idx} idx={idx}/>
                                ))
                            }</View>
                        }
                    </ScreenContainerView>
                </KeyboardAvoidingView>
            </ScrollView>
        </ScreenContainer>
    );
};


const styles = StyleSheet.create({
    titles: {
        fontSize: 20,
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
    comment_box: {
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5
    },

    //drag and sort style
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_children: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    item_icon: {
        marginLeft: 15,
        resizeMode: 'contain',
    },
    item_text: {
        marginRight: 55,
        color: 'black'
    },

    //modal example
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 150
    },
    button: {
        borderRadius: 10,
        marginHorizontal: 9.5,
        marginTop: 26,
        width: 108,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 22.4,
        fontWeight: '500'
    },
    modalText: {
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 22.4,
        fontWeight: '700'
    },
    authorImage: {
        width: 44,
        height: 44,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },
});

export default PlanCollectionScreen;