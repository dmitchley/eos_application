import React from 'react';
import { SafeAreaView, View, Text, Button, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './styles';
import StickyHeader from '../../../Components/StickyHeader';
import * as constants from '../../../constants/constants';
import LinearGradient from 'react-native-linear-gradient';
import ChatbotModal from '../../../Components/ChatbotModal';
import ThemeButton from '../../../Components/ThemeButton';
import localStorage from '../../../library/LocalStorage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { getChildClassInfo } from '../../../FirebaseAction/classInfoAction';

export default class ClassList extends React.Component {
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
            isOpenModal: false,
            isShowLoader: false,
            classListHolder: []
        }

    }

    componentDidMount() {
        this.getClassInfo()
    }

    getClassInfo = async () => {
        this.setState({ isShowLoader: true })
        constants.showHUD();
        const classInfo = await getChildClassInfo();
        this.setState({ classListHolder: classInfo })
        constants.hideHUD();
        this.setState({ isShowLoader: false })
    }

    onSelectOption = (item) => {
        const { navigate } = this.props.navigation;
        const { title } = this.props.route.params;
        if (title === 'ClassList') {
            navigate('ClassListInformation', {
                selectedClass: item
            })
        } else {
            navigate('RequestInformation', {
                selectedClass: item
            })
        }

    }

    renderOptions = (item, index) => {
        return (
            // <TouchableOpacity style={styles.cellContainer} activeOpacity={0.8} onPress={() => this.onSelectOption(item)}>
            //     <View style={styles.cellInnerContainer}>
            //         <Text style={styles.cellText}>
            //             <Text>ClassType: </Text>
            //             <Text style={{ color: constants.buttonColor }}>{item.class_type}</Text>
            //         </Text>
            //         <Text style={styles.cellText}>
            //             <Text>BookingType: </Text>
            //             <Text style={{ color: constants.buttonColor }}>{item.booking_type}</Text>
            //         </Text>
            //         <Text style={styles.cellText}>
            //             <Text>Date: </Text>
            //             <Text style={{ color: constants.buttonColor }}>{item.date}</Text>
            //         </Text>
            //     </View>
            // </TouchableOpacity>
            <TouchableOpacity style={[styles.sectionContainer]} activeOpacity={0.8} onPress={() => this.onSelectOption(item)}>
                <View style={styles.cellContainer}>
                    <View style={styles.cellImageContainer}>
                        <Image source={require('../../../assets/image/classInfo/pin.png')} style={styles.cellImage} />
                    </View>
                    <View style={styles.cellBodyContainer}>
                        <Text style={styles.cellTitle}>{item.class_type}</Text>
                        <Text style={styles.cellTitleValue}>{item.location}</Text>
                    </View>
                </View>

                <View style={styles.separatorView}></View>

                <View style={styles.cellContainer}>
                    <View style={styles.cellImageContainer}>
                        <Image source={require('../../../assets/image/classInfo/calendar.png')} style={[styles.cellImage, {
                            height: 25,
                            width: 25
                        }]} />
                    </View>
                    <View style={[styles.cellBodyContainer]}>
                        <Text style={[styles.cellTitle, { flex: 1 }]}>Date</Text>
                        <Text style={styles.cellTitleValue}>{item.date}</Text>
                    </View>
                </View>

                <View style={styles.separatorView}></View>

                <View style={styles.cellContainer}>
                    <View style={styles.cellImageContainer}>
                        <Image source={require('../../../assets/image/classInfo/clock.png')} style={[styles.cellImage, {
                            height: 27,
                            width: 27
                        }]} />
                    </View>
                    <View style={styles.cellBodyContainer}>
                        <Text style={styles.cellTitle}>Time</Text>
                        <Text style={styles.cellTitleValue}>{item.start_time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderHeaderComponent = () => {
        return (
            <View style={{ height: hp('2%'), width: '100%' }}></View>
        )
    }

    renderEmptyContainer = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.cellTitle, { fontSize: 18 }]}>No Class Information Found</Text>
            </View>
        )
    }

    render() {
        const { isOpenModal, classListHolder, isShowLoader } = this.state;
        return (
            <View style={styles.rootContainer}>
                <StickyHeader {...this.props} />

                <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1 }} colors={[constants.gradient1, constants.gradient2]} style={styles.bodyContainer}>
                    <FlatList
                        data={classListHolder}
                        contentContainerStyle={[styles.flatlistContainer, { 
                            flex: classListHolder.length > 0 ? null : 1 
                        }]}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => this.renderOptions(item, index)}
                        ListEmptyComponent={!isShowLoader && this.renderEmptyContainer()}
                    />
                </LinearGradient>
            </View>
        )
    }
}