import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as constants from '../../../constants/constants';
import * as fonts from '../../../constants/fonts';

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },

    safeAreaContainer: {
        flex: 1,
        width: '100%'
    },

    bodyContainer: {
        flex: 1,
        width: '100%',
        padding: 12
    },

    topContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        margin: 10
    },

    profileImageConatiner: {
        height: 80,
        width: 80,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#C4C4C4',
    },

    realprofileImage: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        borderRadius: 10,
    },

    profileImage: {
        height: 40,
        width: 40,
        alignSelf: 'center'
    },

    headerRightContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: -5,
        bottom: -5
    },

    editProfileContainer: {
        height: 25,
        width: 25,
        borderRadius: 12.5,
        borderWidth: 1,
        borderColor: constants.white,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: constants.blueText
    },

    editProfileImage: {
        height: 13,
        width: 13,
        tintColor: constants.white,
        alignSelf: 'center'
    },

    headerEmailContainer: {
        padding: 10,
    },

    headerEmailText: {
        fontSize: 16,
        color: constants.buttonColor,
        fontFamily: fonts.MONTSERRATSEMIBOLD
    },

    middleContainer: {
        flexGrow: 1,
        width: '100%',
        marginTop: '5%'
    },

    inputContainer: {
        marginTop: 2,
        marginBottom: 2
    },

    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        height: 40,
        marginTop: 10,
        marginBottom: 10,
    },

    imageTouchContainer: {
        height: 15,
        width: 15,
        bottom: 0,
        right: 0,
        position: 'absolute',
        resizeMode: 'contain',
        alignItems: 'center',
    },

    ImageStyle: {
        height: 15,
        width: 15,
        bottom: 0,
        right: 8,
        position: 'absolute',
        resizeMode: 'contain',
        alignItems: 'center',
    },

    inputborderright: {
        width: '100%',
        height: 1,
        flexDirection: 'row'
    },

    titleTextStyle: {
        // fontWeight: '700',
        backgroundColor: '#f0f',
        fontFamily: fonts.MONTSERRATSEMIBOLD
    },

    countryPickerLabel: {
        fontSize: 13,
        marginBottom: 3,
    },

    countryPickerStyle: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        position: 'absolute',
        left: -wp('50%')
    },

    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginBottom: 30
    }
})

export default styles;
