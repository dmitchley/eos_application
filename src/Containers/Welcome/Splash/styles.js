import { StyleSheet, Platform, StatusBar } from 'react-native';
import * as Constant from '../../../constants/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: Constant.gradient1
    },

    rootContainer: {
        flex: 1,
        backgroundColor: Constant.gradient1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    logoImage: {
        // height: wp('50%'),
        // width: wp('50%'),
        height: 178,
        width: 178,
        alignSelf: 'center',
        resizeMode: 'contain',
        ...Platform.select({
            android: {
                marginTop: StatusBar.currentHeight > 24 ? StatusBar.currentHeight : null,
            },
        })
    }

})

export default styles;
