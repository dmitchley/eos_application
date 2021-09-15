import React from 'react';
import { SafeAreaView, View, Image, Alert } from 'react-native';
import styles from './styles';
import * as constants from '../../../constants/constants';
import LinearGradient from 'react-native-linear-gradient';
import localStorage from '../../../library/LocalStorage';
import { requestAdminToken } from '../../../FirebaseAction/fcmAction';
import SplashScreen from 'react-native-splash-screen'
import { fcmService } from '../../../services/FCMService';
import { setGeneralNotiReadStatus } from '../../../FirebaseAction/fcmAction';
import NotifService from '../../../services/NotifService';

export default class Splash extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: true,
        }

        this.notif = new NotifService(
            this.onRegisterNoti.bind(this),
            this.onNotif.bind(this),
        );

    }

    onRegisterNoti(token) {
        console.log(token)
    }

    async onNotif(notif) {
        const { data } = notif;
        const { navigate } = this.props.navigation;
        if (data.type === 'General') {
            const userInfo = await localStorage.getParseData('USER_INFO_KEY');
            const { parent_id } = userInfo;
            setGeneralNotiReadStatus(data.noti_id, parent_id)
        } else if(data.type === 'addAppointment') {
            // navigate('Home', { screen: 'ClassInformation' });
            navigate('Home', { screen: 'RequestCatchup', fromNoti: true });
        } else if(data.type === 'DueInvoice') {
            navigate('Home', { screen: 'MyInvoice' });
        }
        // Alert.alert(notif.title, notif.message);
    }

    Hide_Splash_Screen = async () => {
        const { navigate } = this.props.navigation;
        const isUserLogin = await localStorage.getParseData('USER_INFO_KEY');
        if (isUserLogin != null) {
            navigate('Home')
        } else {
            navigate('Login')
        }
    }

    onRegister = async (token) => {
        // console.log("[Notification fcm ] onRegister:", token)
        const fcmToken = await localStorage.saveKey('USER_NOTI_TOKEN', token);
        this.setState({ noti_token: token })
    }

    onNotification = (notify) => {
        console.log("[Notification fcm ] : onNotification:", notify)
    }

    onOpenNotification = async (notify) => {
        const { data } = notify;
    }

    componentDidMount() {
        fcmService.register(this.onRegister, this.onNotification, this.onOpenNotification);
        requestAdminToken();
        setTimeout(() => {
            SplashScreen.hide();
        }, 500);
        setTimeout(() => {
            this.Hide_Splash_Screen();
        }, 1500);
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                {/* <LinearGradient colors={[constants.white, constants.offWhite]} style={styles.rootContainer}> */}
                <View style={styles.rootContainer}>
                    <Image source={require('../../../assets/image/logo.png')} style={styles.logoImage} />
                </View>
                {/* </LinearGradient> */}
            </SafeAreaView>
        )
    }
}