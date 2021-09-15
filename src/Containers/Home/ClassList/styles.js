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
        flex: 1,
    },

    flatlistContainer: {
        // flex: 1,
        padding: 20
    },

    sectionContainer: {
        padding: 20,
        backgroundColor: constants.white,
        borderRadius: 12,
        marginVertical: 15
    },

    cellContainer: {
        flexDirection: 'row',
        height: 'auto',
        width: '80%',
    },

    cellImageContainer: {
        height: 30,
        width: 30,
        marginTop: 6
    },

    cellImage: {
        height: 30,
        width: 30,
        tintColor: constants.buttonColor,
    },

    cellBodyContainer: {
        flex: 1,
        alignItems: 'flex-start',
        paddingHorizontal: 20
    },

    cellTitle: {
        fontSize: 16,
        marginBottom: 3,
        color: constants.blueText,
        fontFamily: fonts.MONTSERRATSEMIBOLD
    },

    cellTitleValue: {
        fontSize: 16,
        color: constants.buttonColor,
        fontFamily: fonts.MONTSERRATSEMIBOLD
    },

    separatorView: {
        height: 2.5,
        backgroundColor: '#eff3f4',
        // marginLeft: 50,
        marginTop: 5,
        marginBottom: 15
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
