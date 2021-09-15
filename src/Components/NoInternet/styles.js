import { StyleSheet, Platform } from 'react-native';
import * as constants from '../../constants/constants';
import * as fonts from '../../constants/fonts'; 

const styles = StyleSheet.create({
    modalOuterContainer: {
        width: '85%',
        backgroundColor: constants.white,
        borderRadius: 18,
        alignSelf: 'center',
        overflow: 'hidden'
    },

    modalContainer: {
        padding: 25,
    },

    modalTitle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: fonts.MONTSERRATSEMIBOLD,
        fontSize: 16,
        marginVertical: 10
    },

    modalsubTitle: {
        textAlign: 'left',
        alignSelf: 'center',
        fontSize: 13,
        fontFamily: fonts.MONTSERRATREGULAR,
        // fontWeight: '500',
        // marginVertical: isTab ? 15 : 10
    },

    wifiImage: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        marginVertical: 25
    },

    buttonStyle: {
        marginTop: 25,
        height: 40,
        width: '100%',
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: constants.gradient2,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonImage: {
        height: 20,
        width: 20,
        alignSelf: 'center',
        marginHorizontal: 8
    },

    buttonText: {
        fontSize: 15,
        fontFamily: fonts.MONTSERRATSEMIBOLD,
        marginLeft: 5,
        textAlign: 'center',
        alignSelf: 'center',
    },

    buttonIcon: {
        textAlign: 'center',
        alignSelf: 'center'
    }


})

export default styles;
