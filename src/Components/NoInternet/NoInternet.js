import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import Modal from 'react-native-modal';

export default class NoInternet extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { isConnected } = this.props;
        return (
            <Modal isVisible={!isConnected} animationInTiming={800} animationOutTiming={800} avoidKeyboard>
                <View style={styles.modalOuterContainer}>
                    <View style={styles.modalContainer}>
                        <Image source={require('../../assets/image/wifi.png')} style={styles.wifiImage} resizeMode="contain" />

                        <Text style={styles.modalTitle}>No Internet connection !!!</Text>
                        <Text style={styles.modalsubTitle}>Please check internet connection, try again later</Text>

                        <TouchableOpacity style={styles.buttonStyle}>
                            <Image source={require('../../assets/image/refresh.png')} style={styles.buttonImage} />
                            <Text style={styles.buttonText}>Try Again</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}