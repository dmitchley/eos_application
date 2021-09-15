import React from 'react';
import { Text, View } from 'react-native';
import * as Constant from '../../constants/constants';
import styles from './styles';
import Modal from 'react-native-modal';
import CollapsibleView from '../CollapsibleView'

export default class ChatbotModal extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { isOpenModal, onCloseModal } = this.props;
        return (
            <Modal isVisible={isOpenModal} onBackButtonPress={() => onCloseModal()} onBackdropPress={() => onCloseModal()} animationInTiming={800} animationOutTiming={800} avoidKeyboard>
                <View style={styles.modalOuterContainer}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Frequently Asked Questions: </Text>

                        <CollapsibleView />
                    </View>
                </View>
            </Modal>
        )
    }
}