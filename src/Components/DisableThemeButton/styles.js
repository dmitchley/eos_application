import { StyleSheet, Platform } from 'react-native';
import * as constants from '../../constants/constants';
import * as fonts from '../../constants/fonts';

const isIOS = Platform.OS === 'ios' ? true : false

const styles = StyleSheet.create({
    buttonGradientContainer: {
        height: 55,
        width: '85%',
        borderRadius: 15,
        backgroundColor: constants.buttonColor,
        marginVertical: 8,
        paddingHorizontal: 12,
        // bottom: 50,
        // position: 'absolute',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        opacity: 0.7
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
