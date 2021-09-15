import React from 'react';
import { SafeAreaView, View, Image, TextInput, TouchableOpacity, Text, BackHandler, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import * as constants from '../../../constants/constants';
import auth from '@react-native-firebase/auth';
import localStorage from '../../../library/LocalStorage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { authRequest } from '../../../FirebaseAction/authAction';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            noti_token: ''
        }

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.forceUpdate()
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    getTokenValue = async () => {
        const fcmToken = await localStorage.getKey('USER_NOTI_TOKEN');
        this.setState({ noti_token: fcmToken })
    }

    componentDidMount() {
        this.getTokenValue();
        this.setBlurListener();
        this.setFocusListener();
    }

    setFocusListener() {
        this.focusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
            }
        );
    }

    setBlurListener() {
        this.blurSubscription = this.props.navigation.addListener(
            'blur',
            payload => {
                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
            }
        );
    }

    handleBackButton = () => {
        return true;
    }
    // onLogin = () => {
    //     const { navigate } = this.props.navigation;
    //     navigate('Home')
    // }


    onLogin = async () => {
        const { username, password, noti_token } = this.state;
        const { navigate } = this.props.navigation;

        if (username == '') {
            Alert.alert(
                '',
                'Please fill the user name',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]
            )
            // alert('Username should not be empty!!');
            return;
        }

        if (password == '') {
            Alert.alert(
                '',
                'Please fill the password',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]
            )
            // alert('Password should not be empty!!');
            return;
        }

        try {
            constants.showHUD('Loading.....');
            const data = {
                email: String(username).trim(),
                password: String(password).trim(),
                noti_token: noti_token
            }
            const isUserExist = await authRequest(data);
            if (isUserExist) {
                constants.hideHUD();
                navigate('Home')
                // let response = await auth().signInWithEmailAndPassword(username, password)
                // if (response && response.user) {
                //     const { user } = response;
                //     const userInfo = {
                //         id: user.uid,
                //         userName: user.displayName,
                //         EmailAddress: user.email,
                //     }
                //     localStorage.saveKey("USER_INFO_KEY", JSON.stringify(userInfo));
                //     constants.hideHUD();

                //     navigate('Home')
            } else {
                constants.hideHUD();
                Alert.alert(
                    '',
                    'Username or password invalid. Please try again with valid username and password',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]
                )
                // alert("Please check your email and password");
            }
        } catch (e) {
            console.error(e.message);
            constants.hideHUD();
            Alert.alert(
                '',
                'Something went wrong !!',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]
            )
            // alert(String(e.message));
        }

    }

    render() {
        const { username, password } = this.state;
        return (
            <LinearGradient colors={[constants.white, constants.gradient2]} style={styles.rootContainer}>
                <View style={styles.headerContainer}>
                    <Image source={require('../../../assets/image/logo.png')} style={styles.logoImage} />
                </View>


                <KeyboardAwareScrollView
                    style={styles.keyboardAwareContainer}
                    extraHeight={-150}
                    contentContainerStyle={styles.keyboardAwareContentContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* <View style={[styles.headerContainer, { backgroundColor: '#f0f' }]}> */}
                    <View style={styles.bodyActionContainer}>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputLeftContainer}>
                                <Image source={require('../../../assets/image/user.png')} style={styles.inputLeftImg} />
                            </View>
                            <View style={styles.inputEditContainer}>
                                <TextInput
                                    placeholder={'Username'}
                                    value={username}
                                    maxLength={50}
                                    autoCapitalize="none"
                                    style={styles.editInput}
                                    onChangeText={(input) => this.setState({ username: input })}
                                    returnKeyType="next"
                                    onSubmitEditing={() => { this.passwordTextInput.focus(); }}
                                    blurOnSubmit={false}
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.inputLeftContainer}>
                                <Image source={require('../../../assets/image/lock.png')} style={styles.inputLeftImg} />
                            </View>
                            <View style={styles.inputEditContainer}>
                                <TextInput
                                    ref={(input) => { this.passwordTextInput = input; }}
                                    placeholder={'Password'}
                                    value={password}
                                    maxLength={50}
                                    autoCapitalize="none"
                                    style={styles.editInput}
                                    onChangeText={(input) => this.setState({ password: input })}
                                    secureTextEntry
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7} onPress={this.onLogin}>
                            <Text style={styles.buttonTitle}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </LinearGradient>
        )
    }
}