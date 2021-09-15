import { StyleSheet, Platform } from 'react-native';
import * as constants from '../../../constants/constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as fonts from '../../../constants/fonts';

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: constants.white
    },

    headerContainer: {
        height: 66,
        width: '100%',
        backgroundColor: constants.white
    },

    rootContainer: {
        flex: 1,
        backgroundColor: constants.white,
    },

    bodyContainer: {
        flex: 1
    },

    flatlistContainer: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cellContainer: {
        height: wp('38%'),
        width: wp('38%'),
        marginHorizontal: wp('4%'),
        marginVertical: wp('4%'),
        borderRadius: 8,
        overlayColor: 'hidden'
    },

    cellImage: {
        height: '100%',
        width: '100%',
        borderRadius: 8,
        // resizeMode: 'contain',
        position: 'absolute',
    },

    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'red',
        opacity: 0.3,
        borderRadius: 12,
    },

    cellTitle: {
        width: '95%',
        fontSize: 18,
        textAlign: 'center',
        color: constants.white,
        fontFamily: fonts.MONTSERRATBOLD
    },

    buttonContainer: {
        height: 55,
        width: wp('40%'),
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
        color: constants.white,
        fontFamily: fonts.MONTSERRATBOLD
    }

})

export default styles;
