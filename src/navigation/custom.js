import * as React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import * as constants from '../constants/constants';
import * as fonts from '../constants/fonts';
import LinearGradient from 'react-native-linear-gradient';
import localStorage from '../library/LocalStorage';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';

export default class Custom extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            parentProfilePic: undefined
        }
    }

    componentDidMount() {
        this.getUserData()
    }

    getUserData = async () => {
        // const userInfo = await localStorage.getParseData('USER_INFO_KEY');
        // const { firstName, lastName } = userInfo;
        // this.setState({ username: `${firstName} ${lastName}` })
        try {
            const userInfo = await localStorage.getParseData('USER_INFO_KEY');
            const { parent_id, firstName, lastName, parentProfilePic } = userInfo;
            this.setState({ username: `${firstName} ${lastName}`, parentProfilePic: parentProfilePic })
            const query = firestore().collection('parents').doc(parent_id);
            const observer = query.onSnapshot(async docSnapshot => {
                const docData = docSnapshot.data();
                await localStorage.saveKey("USER_INFO_KEY", JSON.stringify(docData));
                const { firstName, lastName, parentProfilePic } = docData;
                this.setState({ username: `${firstName} ${lastName}`, parentProfilePic: parentProfilePic })
            }, err => {
                console.log(`Encountered error: ${err}`);
            });
        } catch (error) {
            console.log(`Encountered error: ${error}`);
        }
    }

    signOutUser = async () => {
        const { navigate } = this.props.navigation;
        try {
            // await auth().signOut();
            await localStorage.
                clearStore()
                .then(() => {
                    navigate('Login');
                })
        } catch (e) {
            console.log(e);
        }
    }

    onLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to Logout?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.signOutUser(), style: 'destructive' },
            ],
            { cancelable: false }
        )
    }

    onEditProfile = () => {
        const { navigate } = this.props.navigation;
        navigate('EditProfile')
    }

    render() {
        const { username, parentProfilePic } = this.state;
        return (
            <>
                <View style={{ flex: 1 }}>
                    <LinearGradient
                        // colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)']}
                        // start={{ x: 0, y: 1 }}
                        // end={{ x: 0, y: 0 }}
                        colors={[constants.white, constants.gradient2]}
                        style={{ flex: 1 }}
                    >
                        <DrawerContentScrollView {...this.props}>
                            <View>
                                <View
                                    style={styles.headerContainer}>
                                    <View>
                                        {parentProfilePic == null
                                            ?
                                            <Image source={require('../assets/image/user_avatar.png')} style={styles.profileImg} />
                                            :
                                            <FastImage
                                                style={styles.parentProfileImage}
                                                source={{
                                                    uri: parentProfilePic,
                                                    priority: FastImage.priority.normal,
                                                }}
                                                resizeMode={FastImage.resizeMode.cover}
                                            />
                                        }
                                        <TouchableOpacity style={styles.editImageContainer} activeOpacity={0.7} onPress={this.onEditProfile}>
                                            <Image source={require('../assets/image/icon_edit.png')} style={styles.editImg} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.usernameText}>{username}</Text>
                                </View>
                            </View>

                            <View style={styles.separatorLine}></View>
                            <DrawerItemList {...this.props} />

                            <TouchableOpacity style={styles.logoutItemContainer} onPress={this.onLogout}>
                                <Image
                                    source={require('../assets/image/Drawer_icons/logout.png')}
                                    resizeMode="contain"
                                    style={styles.logoutImg}
                                />
                                <Text style={styles.logoutText}>Logout</Text>
                            </TouchableOpacity>
                        </DrawerContentScrollView>
                    </LinearGradient>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 180,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    profileImg: {
        height: 80,
        width: 80,
        resizeMode: 'contain'
    },

    editImageContainer: {
        height: 30,
        width: 30,
        borderRadius: 15,
        position: 'absolute',
        bottom: -3,
        right: -3,
        backgroundColor: constants.blueText,
        alignItems: 'center',
        justifyContent: 'center'
    },

    parentProfileImage: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        borderRadius: 40,
    },

    editImg: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        alignSelf: 'center',
        justifyContent: 'center',
        tintColor: constants.white
    },

    usernameText: {
        fontSize: 16,
        color: constants.buttonColor,
        marginTop: 15,
        fontFamily: fonts.MONTSERRATSEMIBOLD
    },

    separatorLine: {
        height: 2.5,
        width: '100%',
        backgroundColor: '#eff3f4',
        marginBottom: 12
    },

    logoutItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },

    logoutImg: {
        marginHorizontal: 20
    },

    logoutText: {
        fontSize: 15,
        color: constants.blueText,
        fontFamily: fonts.MONTSERRATSEMIBOLD,
        marginHorizontal: 10
    },
})