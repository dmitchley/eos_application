import { StyleSheet, Platform } from 'react-native';
import * as constants from '../../constants/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as fonts from '../../constants/fonts';

const styles = StyleSheet.create({
    parentCellContainer: {
        height: 55,
        width: '85%',
        alignSelf: 'center',
        marginVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: '#f2f2f2'
    },

    cellTitleContainer: {
        flex: 1,
        justifyContent: 'center'
    },

    cellTitle: {
        fontSize: 16,
        color: constants.blueText,
        fontFamily: fonts.MONTSERRATSEMIBOLD,
        paddingHorizontal: 12,
    },

    arrowContainer: {
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },

    container: {
        // flex: 1,
        maxHeight: hp('60%'),
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    cardContainer: {
        minHeight: 50,
        width: '100%',
        alignSelf: 'center',
        marginVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: '#f2f2f2'
    },

    subCellContainer: {
        height: 'auto',
        width: '95%',
        alignSelf: 'center',
        // marginVertical: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flexDirection: 'row',
        backgroundColor: '#fafafa',
        padding: 18
    },

    subCellTitleContainer: {
        width: '95%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: '#fafafa',
    },

    subCellTitle: {
        fontSize: 12,
        textAlign: 'left',
        color: '#a5a5a5',
    },

    headerText: {
        textAlign: 'left',
        // fontSize: 16,
        color: '#a5a5a5',
        fontFamily: fonts.MONTSERRATSEMIBOLD
    },

})

export default styles;
