import { StyleSheet, Platform } from 'react-native';
import * as constants from '../../constants/constants';
import * as fonts from '../../constants/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    modalOuterContainer: {
        maxHeight: hp('70%'),
        width: '95%',
        backgroundColor: constants.white,
        borderRadius: 18,
        alignSelf: 'center',
        overflow: 'hidden'
    },

    modalContainer: {
        padding: 25,
        paddingBottom: 10
    },

    modalTitle: {
        textAlign: 'left',
        alignSelf: 'center',
        fontSize: 25,
        fontFamily: fonts.MONTSERRATBOLD,
        color: constants.blueText,
        marginBottom: 18
    },

    header: {
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    },

    headerTxt: {
        fontSize: 12,
        color: 'rgb(74,74,74)',
        marginRight: 60,
        flexWrap: 'wrap',
    },

    txt: {
        fontSize: 14,
    },

    dropDownItem: {
        flex: 1,
        minHeight: 50,
        marginVertical: 8,
        backgroundColor: '#f2f2f2',
    },

    dropDownTitle: {
        fontSize: 16,
        color: constants.blueText,
    }
})

export default styles;
