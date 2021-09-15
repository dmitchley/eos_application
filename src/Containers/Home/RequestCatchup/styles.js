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
        backgroundColor: '#f0f',
        alignItems: 'center',
        // justifyContent: 'center'
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
        width: '80%'
    },

    cellImageContainer: {
        height: 30,
        width: 30,
        marginTop: 6,
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

    buttonGradientContainer: {
        height: 55,
        width: '85%',
        borderRadius: 15,
        backgroundColor: constants.buttonColor,
        marginVertical: 8,
        bottom: 50,
        position: 'absolute',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
    },

    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonTitle: {
        fontSize: 18,
        textAlign: 'center',
        color: constants.white,
        fontFamily: fonts.MONTSERRATSEMIBOLD
    }
})

export default styles;
