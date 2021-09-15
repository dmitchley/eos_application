import { StyleSheet, Platform } from 'react-native';
import * as constants from '../../../constants/constants';
import * as fonts from '../../../constants/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff'
    },

    rootContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },

    bodyContainer: {
        flex: 1,
    },

    sectionContainer: {
        padding: 20,
        width: '90%',
        backgroundColor: constants.white,
        borderRadius: 12,
        marginVertical: 15
    },

    titleText: {
        fontSize: 28,
        fontFamily: fonts.MONTSERRATBOLD,
        color: constants.blueText,
        textAlign: 'center',
        marginVertical: 15
    },

    cellContainer: {
        flexDirection: 'row',
        height: 50,
        width: '80%'
    },

    cellImage: {
        height: 30,
        width: 30,
        tintColor: constants.buttonColor
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
        marginLeft: 50,
        marginTop: 5,
        marginBottom: 15
    },

    placeHolderText: {
        color: constants.blueText,
        fontSize: 16,
        fontFamily: fonts.MONTSERRATSEMIBOLD
    }

})

export default styles;
