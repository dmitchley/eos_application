import { StyleSheet, Platform } from 'react-native';
import * as Constant from '../../../constants/constants';
import * as fonts from '../../../constants/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },

    bodyContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20
        // justifyContent: 'center'
    },

    topContainer: {
        flex: 0.7,
        alignItems: 'center',
    },

    titleText: {
        fontSize: 38,
        fontFamily: fonts.MONTSERRATSEMIBOLD,
        textAlign: 'center',
        marginVertical: 15,
        color: '#000'
    },

    descriptionText: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 15,
        fontFamily: fonts.MONTSERRATREGULAR
    }
})

export default styles;
