import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import * as constants from '../../../constants/constants';
import LinearGradient from 'react-native-linear-gradient';
import StickyHeader from '../../../Components/StickyHeader';
import moment from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";
import localStorage from '../../../library/LocalStorage';
import Toast from 'react-native-simple-toast';
import _ from 'lodash';

import { getChildClassInfo } from '../../../FirebaseAction/classInfoAction';
import { requestCatchUpFB } from '../../../FirebaseAction/requestCatchupAction';

export default class RequestCatchup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 'date',
            show: false,
            classInfoHolder: {},
            selectedDate: '',
            selectedTime: '',
            isEmpty: false,
            initialTime: ''
        }

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getClassInfo()
        });
    }

    componentDidMount() {
        constants.showHUD();
        this.getClassInfo();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    getClassInfo = async () => {
        // const classInfo = await getChildClassInfo();
        // if (_.isEmpty(classInfo, true)) {
        //     constants.hideHUD();
        //     this.setState({ isEmpty: true })
        // } else {
        //     this.setState({ isEmpty: false })
        //     const m = moment(classInfo.date);
        //     const formateDate = m.format('DD MMM YYYY');
        //     const t = moment(classInfo.start_time, 'hh:mm');
        //     const formateTime = t.format('hh:mm');

        //     constants.hideHUD();
        //     this.setState({ classInfoHolder: { ...classInfo, start_time: formateTime }, selectedTime: formateTime, selectedDate: classInfo.date })
        // }
        const { selectedClass } = this.props.route.params;
        this.setState({ isEmpty: false })
        const m = moment(selectedClass.date);
        const formateDate = m.format('DD MMM YYYY');
        const t = moment(selectedClass.start_time, 'hh:mm a');
        const formateTime = t.format('hh:mm a');

        const dateTime = moment(selectedClass.date + ' ' + formateTime, 'DD/MM/YYYY HH:mm a');
        const formateDateTime = dateTime.format();

        this.setState({ initialTime: new Date(formateDateTime) })

        constants.hideHUD();
        this.setState({ classInfoHolder: { ...selectedClass, start_time: formateTime }, selectedTime: formateTime, selectedDate: selectedClass.date })
    }

    showMode = (currentMode) => {
        this.setState({ mode: currentMode, show: true, })
    };

    hideDatePicker = (date) => {
        if (date == null) {
            this.setState({ show: false })
        } else {
            this.setState({ initialTime: date, show: false })
        }
    };

    handleConfirm = date => {
        console.warn("A date has been picked: ", date);
        const { mode } = this.state;
        if (mode === 'date') {
            const m = moment(date);
            const formateDate = m.format('DD MMM YYYY');
            this.setState({ selectedDate: formateDate })
        } else {
            const t = moment(date, 'hh:mm');
            const formateTime = t.format('hh:mm a');
            this.setState({ selectedTime: formateTime })
        }

        this.hideDatePicker(date);
    };

    firestoreAutoId = () => {
        const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let autoId = ''

        for (let i = 0; i < 20; i++) {
            autoId += CHARS.charAt(
                Math.floor(Math.random() * CHARS.length)
            )
        }
        return autoId
    }

    onSubmitRequest = async () => {
        try {
            const userInfo = await localStorage.getParseData('USER_INFO_KEY');
            const { parent_id } = userInfo;
            const { selectedDate, selectedTime } = this.state;
            const { children_id, class_id, location_id, teacher_id, customer_name } = this.state.classInfoHolder;
            const t = moment(selectedTime, 'hh:mm');
            const formateTime = t.format('hh:mm');
            const data = {
                customer_name,
                data: {
                    req_catch_class_id: this.firestoreAutoId(),
                    parent_id,
                    children_id,
                    class_id,
                    location_id,
                    teacher_id,
                    isOpen: true,
                    date: selectedDate,
                    start_time: formateTime,
                    isNotiRead: false,
                    created_at: Math.floor(Date.now() / 1000)
                }
            }
            const isRequestSent = await requestCatchUpFB(data);
            if (isRequestSent) {
                constants.hideHUD();
                Alert.alert(
                    '',
                    'Your update booking request has been sent successfully',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]
                )
                // Toast.show('Request sent successfully', Toast.SHORT);
            } else {
                constants.hideHUD();
                Alert.alert(
                    '',
                    'Something went wrong !!',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]
                )
            }
        } catch (error) {
            console.log(error)
            constants.hideHUD();
            Alert.alert(
                '',
                'Something went wrong !!',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]
            )
        }

    }

    render() {
        const { show, mode, selectedTime, selectedDate, classInfoHolder, isEmpty, initialTime } = this.state;
        const { navigation } = this.props;
        const { location, start_time, class_type, teacher } = this.state.classInfoHolder;
        return (
            <View style={styles.rootContainer}>
                <StickyHeader {...this.props} />

                <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1 }} colors={[constants.gradient1, constants.gradient2]} style={styles.bodyContainer}>
                    {!isEmpty
                        ?
                        <>
                            <View style={[styles.sectionContainer, { marginTop: 50 }]}>
                                <View style={styles.cellContainer}>
                                    <View style={styles.cellImageContainer}>
                                        <Image source={require('../../../assets/image/classInfo/pin.png')} style={styles.cellImage} />
                                    </View>
                                    <View style={styles.cellBodyContainer}>
                                        <Text style={styles.cellTitle}>Location</Text>
                                        <Text style={styles.cellTitleValue}>{location}</Text>
                                    </View>
                                </View>

                                <View style={styles.separatorView}></View>

                                <TouchableOpacity style={styles.cellContainer} activeOpacity={0.7} onPress={() => this.showMode('date')}>
                                    <View style={styles.cellImageContainer}>
                                        <Image source={require('../../../assets/image/classInfo/calendar.png')} style={[styles.cellImage, {
                                            height: 25,
                                            width: 25
                                        }]} />
                                    </View>
                                    <View style={styles.cellBodyContainer}>
                                        <Text style={styles.cellTitle}>Date</Text>
                                        <Text style={styles.cellTitleValue}>{selectedDate}</Text>
                                    </View>
                                </TouchableOpacity>

                                <DateTimePicker
                                    isVisible={show}
                                    mode={mode}
                                    is24Hour={false}
                                    date={initialTime != '' ? initialTime : new Date()}
                                    minimumDate={mode === 'date' ? new Date() : null}
                                    onConfirm={this.handleConfirm}
                                    onCancel={this.hideDatePicker}
                                />

                                <View style={styles.separatorView}></View>

                                <TouchableOpacity style={styles.cellContainer} activeOpacity={0.7} onPress={() => this.showMode('time')}>
                                    <View style={styles.cellImageContainer}>
                                        <Image source={require('../../../assets/image/classInfo/clock.png')} style={[styles.cellImage, {
                                            height: 27,
                                            width: 27
                                        }]} />
                                    </View>
                                    <View style={styles.cellBodyContainer}>
                                        <Text style={styles.cellTitle}>Time</Text>
                                        <Text style={styles.cellTitleValue}>{selectedTime}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.sectionContainer}>
                                <View style={styles.cellContainer}>
                                    <View style={styles.cellImageContainer}>
                                        <Image source={require('../../../assets/image/classInfo/list.png')} style={styles.cellImage} />
                                    </View>
                                    <View style={styles.cellBodyContainer}>
                                        <Text style={styles.cellTitle}>Class Name</Text>
                                        <Text style={styles.cellTitleValue}>{class_type}</Text>
                                    </View>
                                </View>

                                <View style={styles.separatorView}></View>

                                <View style={styles.cellContainer}>
                                    <View style={styles.cellImageContainer}>
                                        <Image source={require('../../../assets/image/classInfo/dancer.png')} style={styles.cellImage} />
                                    </View>
                                    <View style={styles.cellBodyContainer}>
                                        <Text style={styles.cellTitle}>Teacher</Text>
                                        <Text style={styles.cellTitleValue}>{teacher == null ? `-` : teacher}</Text>
                                    </View>
                                </View>
                            </View>

                            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['#fe6c44', '#a0452c']} style={[styles.buttonGradientContainer, { bottom: 120 }]}>
                                {/* <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7} onPress={this.onLogin}> */}
                                <TouchableOpacity style={styles.buttonContainer} onPress={this.onSubmitRequest} >
                                    <Text style={styles.buttonTitle}>Submit</Text>
                                </TouchableOpacity>
                            </LinearGradient>

                            <View style={[styles.buttonGradientContainer, { backgroundColor: 'transparent' }]}>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.goBack()} >
                                    <Text style={[styles.buttonTitle, { color: constants.blueText }]}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                        :
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.cellTitle, { fontSize: 18 }]}>No Class Information Found</Text>
                        </View>
                    }
                </LinearGradient>
            </View>
        )
    }
}