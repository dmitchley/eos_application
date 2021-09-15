import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as constants from '../../../constants/constants';
import * as fonts from '../../../constants/fonts';

export default styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff'
    },

    rootContainer: {
        flex: 1,
        // backgroundColor: '#fff',
    },

    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    keyboardAwareContainer: {
        flex: 0.5,
        width: '100%'
    },

    keyboardAwareContentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    bodyActionContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    bodyActionInnerContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    bodyContainer: {
        flex: 0.5
    },

    logoImage: {
        height: wp('40%'),
        width: wp('40%'),
        marginTop: constants.statusbarHeight + 100,
        alignSelf: 'center',
        resizeMode: 'contain'
    },

    inputContainer: {
        height: 55,
        width: '85%',
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: 30,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginVertical: 8
    },

    inputLeftContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputLeftImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
        justifyContent: 'center'
    },

    inputEditContainer: {
        flex: 1,
        justifyContent: 'center'
    },

    editInput: {
        flex: 1,
        fontFamily: fonts.MONTSERRATREGULAR
    },

    buttonContainer: {
        height: 55,
        width: '85%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: constants.buttonColor,
        marginVertical: 8
    },

    buttonTitle: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
        color: constants.white,
        fontFamily: fonts.MONTSERRATREGULAR
    },

    keyboard: {
        flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
    }
})