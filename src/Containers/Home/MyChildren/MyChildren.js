import React from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import styles from './styles';
import StickyHeader from '../../../Components/StickyHeader';
import * as constants from '../../../constants/constants';
import ThemeButton from '../../../Components/ThemeButton';
import RadioButton from '../../../Components/RadioButton';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image';

import localStorage from '../../../library/LocalStorage';
import { getChildren } from '../../../FirebaseAction/childrenAction';

const Profile_placeholder = require('../../../assets/image/user_avatar.png')

export default class MyChildren extends React.Component {
    constructor(props) {
        super(props);

        this.childArray = [
            { id: 0, title: 'Child one', profile: Profile_placeholder, isSelected: false },
            { id: 1, title: 'Child two', profile: Profile_placeholder, isSelected: false },
            { id: 2, title: 'Child Three', profile: Profile_placeholder, isSelected: false },
        ];

        this.state = {
            casualRadio: false,
            parentName: '',
            childArrayHolder: [],
            parentProfilePic: null
        }
    }

    async componentDidMount() {
        constants.showHUD();
        this.getParentChild();
        // this.setState({ childArrayHolder: [...this.childArray] })
    }

    getParentChild = async () => {
        const userInfo = await localStorage.getParseData('USER_INFO_KEY');
        const { firstName, lastName, parentProfilePic } = userInfo;
        const childArray = await getChildren();
        let childMap = childArray.map((item, index) => {
            return { ...item, isSelected: index === 0 ? true : false }
        })

        constants.hideHUD();
        this.setState({ childArrayHolder: [...childMap], parentName: `${firstName} ${lastName}`, parentProfilePic: parentProfilePic })
    }

    onSelectChild = (item) => {
        this.setState(prevState => ({
            childArrayHolder: prevState.childArrayHolder.map(
                el => el.children_id === item.children_id ? { ...el, isSelected: !el.isSelected } : { ...el, isSelected: false }
            )
        }))

    }

    onChangeChild = async () => {
        const { navigate } = this.props.navigation;
        const { childArrayHolder } = this.state;
        const selectedChild = childArrayHolder.filter((item, index) => item.isSelected === true);

        if (selectedChild.length > 0) {
            await localStorage.saveKey("CURRENT_CHILD", JSON.stringify(selectedChild[0]));
            Toast.show('Child profile has been switched successfully', Toast.SHORT);
            navigate('Dashboard')
            // navigation.goBack();
        }
    }

    keyExtractor = (item, index) => index.toString()

    _renderRow = (item, index) => {
        return (
            <>
                <TouchableOpacity
                    activeOpacity={0.7} onPress={() => this.onSelectChild(item)} style={styles.cellContainer}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Image source={Profile_placeholder} style={styles.cellImage} />
                        <View style={styles.cellBodyContainer}>
                            <Text style={styles.cellTitle}>{item.fname} {item.lname}</Text>
                            <View style={styles.separatorView}></View>
                        </View>
                    </View>
                    <View style={styles.radioButtonContainer}>
                        <RadioButton
                            checked={item.isSelected}
                            onPress={() => this.onSelectChild(item)}
                        />
                    </View>
                    <View>
                    </View>

                </TouchableOpacity>
            </>
        )
    }

    render() {
        const { parentName, parentProfilePic } = this.state;
        return (
            <View style={styles.rootContainer}>
                <StickyHeader {...this.props} />

                <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1 }} colors={[constants.gradient1, constants.gradient2]} style={styles.bodyContainer}>

                    <View style={styles.cellContainer}>
                        {parentProfilePic == null
                            ?
                            <Image source={Profile_placeholder} style={styles.cellImage} />
                            :
                            <FastImage
                                style={styles.cellImage}
                                source={{
                                    uri: parentProfilePic,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        }
                        <View style={styles.cellBodyContainer}>
                            <Text style={styles.cellTitle}>Parent - {parentName}</Text>
                            <View style={styles.separatorView}></View>
                        </View>
                    </View>

                    <View style={styles.flatlistContainer}>
                        <FlatList
                            animation="bounceInUp"
                            contentInsetAdjustmentBehavior="automatic"
                            contentContainerStyle={{ padding: 2 }}
                            duration={500}
                            delay={500}
                            data={this.state.childArrayHolder}
                            renderItem={({ item, index }) => (
                                this._renderRow(item, index)
                            )}
                            keyExtractor={this.keyExtractor}
                        />
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <ThemeButton
                            title="Submit"
                            onPress={() => this.onChangeChild()}
                        />
                    </View>


                </LinearGradient>
            </View>
        )
    }
}