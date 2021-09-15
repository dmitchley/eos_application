import React from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, Image, FlatList, TextInput, ScrollView, Platform } from 'react-native';
import styles from './styles';
import StickyHeader from '../../../Components/StickyHeader';
import * as constants from '../../../constants/constants';
import Input from '../../../Components/Input/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ThemeButton from '../../../Components/ThemeButton';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import Permissions from '../../../library/Permissions';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import localStorage from '../../../library/LocalStorage';
import { uploadParentProfileToStorage, updateParentProfileFB } from '../../../FirebaseAction/profileAction';

const baseColor = '#B6B6B6'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fname: '',
            lname: '',
            email: '',
            mobile: '',
            address: '',
            city: '',
            parentState: '',
            postalCode: '',
            parent_id: '',
            parentProfilePic: undefined
        }
    }

    async componentDidMount() {
        const userInfo = await localStorage.getParseData('USER_INFO_KEY');
        console.log(userInfo)
        const { parent_id, firstName, lastName, email, primaryMobile, addressLine1, city, parentState, postalCode, parentProfilePic } = userInfo;
        this.setState({
            parent_id: parent_id,
            fname: firstName,
            lname: lastName,
            email: email,
            mobile: primaryMobile,
            address: addressLine1,
            city: city,
            parentState: parentState,
            postalCode: postalCode,
            parentProfilePic: parentProfilePic
        })
    }

    getExtension = (filename) => {
        return filename.split('.').pop();
    }

    uploadImageToStorage = async (path, imageName) => {
        constants.showHUD();
        const { parent_id } = this.state;
        const extension = this.getExtension(imageName);
        const imgName = parent_id + `.${extension}`;

        const profilePicData = {
            selectedImgPath: path,
            parent_id: parent_id,
            imgName: imgName
        }
        const parentProfileURL = await uploadParentProfileToStorage(profilePicData);
        if (parentProfileURL) {
            constants.hideHUD();
            this.setState({ parentProfilePic: parentProfileURL });
            Toast.show('Update ProfilePic successfully!', Toast.SHORT);
        }
    }

    onUpdateProfilePic = async () => {
        const Permission = await Permissions.requestPermissions('library');
        if (Permission === 'granted') {
            launchImageLibrary(
                {
                    mediaType: 'photo',
                    includeBase64: false,
                },
                (response) => {
                    if (response.uri !== undefined) {
                        this.uploadImageToStorage(response.uri, response.fileName)
                    }
                },
            )
        }
    }

    onUpdate = async () => {
        const { fname, lname, email, mobile, address, city, parentState, postalCode, parent_id, parentProfilePic } = this.state;
        constants.showHUD();
        const parentObj = {
            firstName: fname,
            lastName: lname,
            primaryMobile: mobile,
            addressLine1: address,
            city: city,
            parentState: parentState,
            postalCode: postalCode
        }
        try {
            const isProfileUpdate = await updateParentProfileFB(parent_id, parentObj);
            if (isProfileUpdate) {
                constants.hideHUD();
                const { navigation } = this.props;
                Toast.show('User updated successfully!', Toast.SHORT);
                navigation.goBack();
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { fname, lname, email, mobile, city, parentState, postalCode, address, parentProfilePic } = this.state;
        return (
            <View style={styles.rootContainer}>
                <View style={styles.safeAreaContainer}>
                    <StickyHeader {...this.props} isBackButton={true} />
                    <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1 }} colors={[constants.gradient1, constants.gradient2]} style={styles.safeAreaContainer}>

                        <ScrollView style={styles.bodyContainer}>
                            <KeyboardAwareScrollView extraHeight={Platform.OS === 'ios' ? -65 : 0} >

                                <View style={styles.topContainer}>
                                    <View style={styles.profileImageConatiner}>
                                        {(parentProfilePic === undefined || parentProfilePic === null)
                                            ?
                                            null
                                            // <Image source={require('../../../assets/image/user.png')} style={styles.profileImage} resizeMode="contain" />
                                            :
                                            <FastImage
                                                style={styles.realprofileImage}
                                                source={{
                                                    uri: parentProfilePic,
                                                    priority: FastImage.priority.normal,
                                                }}
                                                resizeMode={FastImage.resizeMode.cover}
                                            />
                                            // <Image source={{ uri: parentProfilePic }} style={styles.realprofileImage} resizeMode="contain" />
                                        }
                                        <TouchableOpacity style={styles.headerRightContainer} onPress={() => {
                                            this.onUpdateProfilePic()
                                        }}>
                                            <View style={styles.editProfileContainer}>
                                                <Image source={require('../../../assets/image/icon_edit.png')} style={styles.editProfileImage} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.headerEmailContainer}>
                                        <Text style={styles.headerEmailText}>{email}</Text>
                                    </View>

                                    <View style={styles.middleContainer}>
                                        <View style={styles.inputContainer}>
                                            <View style={styles.SectionStyle}>
                                                <View style={{ flex: 1 }}>
                                                    <Input
                                                        label="First name"
                                                        onChangeText={text => this.setState({ fname: text })}
                                                        textColor={baseColor}
                                                        value={fname}
                                                        returnKeyType={"next"}
                                                        titleTextStyle={styles.titleTextStyle}
                                                        onSubmitEditing={() => { this.Lastname.focus(); }}
                                                        blurOnSubmit={false} />
                                                </View>
                                            </View>
                                            <View style={styles.inputborderright} />
                                        </View>

                                        <View style={styles.inputContainer}>
                                            <View style={styles.SectionStyle}>
                                                <View style={{ flex: 1 }}>
                                                    <Input
                                                        setRef={ref => { this.Lastname = ref }}
                                                        label="Last name"
                                                        onChangeText={text => this.setState({ lname: text })}
                                                        textColor={baseColor}
                                                        value={lname}
                                                        returnKeyType={"next"}
                                                        titleTextStyle={styles.titleTextStyle}
                                                        onSubmitEditing={() => { this.Mobile.focus(); }}
                                                        blurOnSubmit={false} />
                                                </View>
                                            </View>
                                        </View>

                                        {/* <View style={styles.inputContainer}>
                                            <View style={styles.SectionStyle}>
                                                <View style={{ flex: 1 }}>
                                                    <Input
                                                        setRef={ref => { this.Email = ref }}
                                                        label="Email"
                                                        onChangeText={text => this.setState({ email: text })}
                                                        textColor={baseColor}
                                                        value={email}
                                                        disabled={true}
                                                        returnKeyType={"next"}
                                                        titleTextStyle={styles.titleTextStyle}
                                                        onSubmitEditing={() => { this.Mobile.focus(); }}
                                                        blurOnSubmit={false} />
                                                </View>
                                            </View>
                                        </View> */}

                                        <View style={styles.inputContainer}>
                                            <View style={styles.SectionStyle}>
                                                <View style={{ flex: 1 }}>
                                                    <Input
                                                        setRef={ref => { this.Mobile = ref }}
                                                        label="Mobile"
                                                        onChangeText={text => this.setState({ mobile: text })}
                                                        textColor={baseColor}
                                                        value={mobile}
                                                        returnKeyType={"next"}
                                                        titleTextStyle={styles.titleTextStyle}
                                                        onSubmitEditing={() => { this.Address.focus(); }}
                                                        blurOnSubmit={false} />
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.inputContainer}>
                                            <View style={styles.SectionStyle}>
                                                <View style={{ flex: 1 }}>
                                                    <Input
                                                        setRef={ref => { this.Address = ref }}
                                                        label="Address"
                                                        onChangeText={text => this.setState({ address: text })}
                                                        textColor={baseColor}
                                                        value={address}
                                                        returnKeyType={"next"}
                                                        titleTextStyle={styles.titleTextStyle}
                                                        onSubmitEditing={() => { this.City.focus(); }}
                                                        blurOnSubmit={false} />
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.inputContainer}>
                                            <View style={styles.SectionStyle}>
                                                <View style={{ flex: 1 }}>
                                                    <Input
                                                        setRef={ref => { this.City = ref }}
                                                        label="City"
                                                        onChangeText={text => this.setState({ city: text })}
                                                        textColor={baseColor}
                                                        value={city}
                                                        returnKeyType={"next"}
                                                        titleTextStyle={styles.titleTextStyle}
                                                        onSubmitEditing={() => { this.State.focus(); }}
                                                        blurOnSubmit={false} />
                                                </View>
                                            </View>
                                        </View>


                                        <View style={styles.inputContainer}>
                                            <View style={styles.SectionStyle}>
                                                <View style={{ flex: 1 }}>
                                                    <Input
                                                        setRef={ref => { this.State = ref }}
                                                        label="State"
                                                        titleTextStyle={styles.titleTextStyle}
                                                        onChangeText={text => this.setState({ parentState: text })}
                                                        textColor={baseColor}
                                                        value={parentState}
                                                        onSubmitEditing={() => { this.PostalCode.focus(); }}
                                                        blurOnSubmit={false} />
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.inputContainer}>
                                            <View style={styles.SectionStyle}>
                                                <View style={{ flex: 1 }}>
                                                    <Input
                                                        setRef={ref => { this.PostalCode = ref }}
                                                        label="Postal Code"
                                                        titleTextStyle={styles.titleTextStyle}
                                                        onChangeText={text => this.setState({ postalCode: text })}
                                                        textColor={baseColor}
                                                        value={postalCode}
                                                        blurOnSubmit={true} />
                                                </View>
                                            </View>
                                        </View>


                                    </View>
                                </View>
                            </KeyboardAwareScrollView>

                        </ScrollView>
                        <View style={styles.buttonContainer}>
                            <ThemeButton
                                title="UPDATE"
                                onPress={this.onUpdate}
                            />
                        </View>
                    </LinearGradient>
                </View>

            </View >
        )
    }
}