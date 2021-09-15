import { StyleSheet, Platform } from 'react-native';
import * as constants from '../../constants/constants';

const isIOS = Platform.OS === 'ios' ? true : false

const styles = StyleSheet.create({
    headerContainer: {
        height: 66,
        width: '100%',
        marginTop: isIOS ? constants.statusbarHeight : constants.statusbarHeight,
        alignItems: 'center',
        // justifyContent: 'center',
        overflow: 'visible',
        flexDirection: 'row'
    },

    menuContainer: {
        padding: 5,
        marginLeft: 20,
        zIndex: 99
    },

    menuIcon: {
        height: 25,
        width: 25,
        padding: 10,
        tintColor: '#bfbfbf',
        resizeMode: 'contain',
    },

    headerImgContainer: {
        // flex: 1,
        width: '100%',
        position: 'absolute',
    },

    headerLogoImage: {
        height: 66,
        width: 66,
        alignSelf: 'center',
        resizeMode: 'contain',
        // position: 'absolute'
    },

})

export default styles;
