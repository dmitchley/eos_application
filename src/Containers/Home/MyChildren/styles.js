import { StyleSheet, Platform } from 'react-native';
import * as constants from '../../../constants/constants';
import * as fonts from '../../../constants/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        width: '100%',
        // backgroundColor: '#fff'
    },

    rootContainer: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingTop: Constant.StatusBarHeight
        // paddingBottom: Platform.OS === 'ios' ? Constant.StatusBarHeight  : 0
    },

    bodyContainer: {
        flex: 1,
        width: '100%',
        padding: 25,
    },

    cellContainer: {
        // height: hp('8%'),
        width: '100%',
        borderRadius: 10,
        backgroundColor: constants.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        padding: 15,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },

    cellTextTitle: {
        fontSize: 15,
        lineHeight: 25,
        // fontWeight: '600'
        fontFamily: fonts.MONTSERRATSEMIBOLD
    },

    cellTextsubTitle: {
        color: '#808080',
        fontSize: 12,
        // fontWeight: '500',
        fontFamily: fonts.MONTSERRATREGULAR
    },

    checkboxImage: {
        height: 22,
        width: 22,
        resizeMode: 'contain',
        tintColor: constants.buttonColor
    },

    flatlistContainer: {
        flex: 0.9,
        width: '100%'
    },

    flatlistCellContainer: {
        width: '99%',
        borderRadius: 10,
        backgroundColor: constants.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        padding: 15,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center'
    },

    radioButtonContainer: {
        alignSelf: 'center',
    },

    nextButton: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
    },

    nextButtonText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '700'
    },

    // ----

    cellContainer: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: constants.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        padding: 25,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },

    cellImage: {
        height: 30,
        width: 30,
        borderRadius: 15,
        // tintColor: constants.buttonColor
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
        width: '100%',
        backgroundColor: '#eff3f4',
        // marginLeft: 50,
        marginTop: 5,
        zIndex: 99
        // marginBottom: 15
    }

})

export default styles;
