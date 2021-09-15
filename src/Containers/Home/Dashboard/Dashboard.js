import React from 'react';
import { SafeAreaView, View, Text, Button, Image, FlatList, ImageBackground, TouchableOpacity, BackHandler } from 'react-native';
import styles from './styles';
import StickyHeader from '../../../Components/StickyHeader';
import * as constants from '../../../constants/constants';
import LinearGradient from 'react-native-linear-gradient';
import ChatbotModal from '../../../Components/ChatbotModal';
import ThemeButton from '../../../Components/ThemeButton';
import localStorage from '../../../library/LocalStorage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { getChildren } from '../../../FirebaseAction/childrenAction';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.options = [
            { id: 0, title: 'My Children', img: require('../../../assets/image/Dashboard/my_children.png') },
            { id: 1, title: 'My Invoices', img: require('../../../assets/image/Dashboard/my_invoices.png') },
            { id: 2, title: 'Class Information', img: require('../../../assets/image/Dashboard/class_info.png') },
            { id: 3, title: 'Request a Catch-up class', img: require('../../../assets/image/Dashboard/catchup_class.png') },
            { id: 4, title: 'Request Uniform Items', img: require('../../../assets/image/Dashboard/request_uniform.png') },
            { id: 5, title: 'Contact Us', img: require('../../../assets/image/Dashboard/contact_us.png') },

        ]
        this.state = {
            isOpenModal: false
        }

    }

    componentDidMount() {
        this.setInitialChild();
        this.setBlurListener();
        this.setFocusListener();
    }

    setFocusListener() {
        this.focusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
            }
        );
    }

    setBlurListener() {
        this.blurSubscription = this.props.navigation.addListener(
            'blur',
            payload => {
                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
            }
        );
    }

    handleBackButton = () => {
        return true;
    }

    setInitialChild = async () => {
        const isChildExist = await localStorage.getKey('CURRENT_CHILD');
        if(isChildExist == null) {
            const childArray = await getChildren();
            localStorage.saveKey("CURRENT_CHILD", JSON.stringify(childArray[0]));
        }
    }

    onSelectOption = (index) => {
        const { navigate } = this.props.navigation;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        switch (index) {
            case 0: navigate('MyChildren');
                break;
            case 1: navigate('MyInvoice');
                break;
            case 2: navigate('ClassInformation');
                break;
            case 3: navigate('RequestCatchup');
                break;
            case 4: navigate('UniformSelect');
                break;
        }
    }

    renderOptions = (item, index) => {
        return (
            <TouchableOpacity style={styles.cellContainer} activeOpacity={0.8} onPress={() => this.onSelectOption(index)}>
                <View style={styles.overlay} />
                <Image source={item.img} style={styles.cellImage} resizeMode="cover" />
                {/* <View style={[styles.cellImage, { backgroundColor: '#808080' }]}></View> */}
                <View style={{ flex: 0.95 }}></View>
                <Text style={styles.cellTitle}>{item.title}</Text>
            </TouchableOpacity>
            // <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={[constants.white, '#000']} style={styles.cellContainer}>

            // </LinearGradient>
        )
    }

    renderHeaderComponent = () => {
        return (
            <View style={{ height: hp('2%'), width: '100%' }}></View>
        )
    }

    onChatBotModal = () => {
        const { isOpenModal } = this.state;

        this.setState({ isOpenModal: !isOpenModal })
    }

    renderFooterComponent = () => {
        return (
            <View style={{ marginVertical: 8, width: '100%' }}>
                <ThemeButton
                    title="Your Questions Answered"
                    onPress={() => this.onChatBotModal()}
                />
            </View>
            // <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7} onPress={() => this.onChatBotModal()}>
            //     <Text style={styles.buttonTitle}>ChatBot</Text>
            // </TouchableOpacity>
        )
    }

    render() {
        const { isOpenModal } = this.state;
        return (
            <View style={styles.rootContainer}>
                <StickyHeader {...this.props} />

                {/* <View style={[styles.bodyContainer, { backgroundColor: constants.gradient1 }]}> */}
                <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1 }} colors={[constants.gradient1, constants.gradient2]} style={styles.bodyContainer}>

                    <ChatbotModal isOpenModal={isOpenModal} onCloseModal={() => this.onChatBotModal()} />
                    <FlatList
                        data={this.options}
                        contentContainerStyle={styles.flatlistContainer}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => this.renderOptions(item, index)}
                        ListHeaderComponent={this.renderHeaderComponent}
                        ListFooterComponent={this.renderFooterComponent}
                    />
                </LinearGradient>
                {/* </View> */}
            </View>
        )
    }
}