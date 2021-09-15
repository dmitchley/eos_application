import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import * as constants from '../../../constants/constants';
import LinearGradient from 'react-native-linear-gradient';
import StickyHeader from '../../../Components/StickyHeader';
import moment from 'moment';
import _ from 'lodash';

import { getChildClassInfo } from '../../../FirebaseAction/classInfoAction';

export default class ClassInformation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            classInfoHolder: {},
            isEmpty: false
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
        const { selectedClass } = this.props.route.params;
        this.setState({ isEmpty: false })
        const m = moment(selectedClass.date);
        const formateDate = m.format('DD MMM YYYY');
        const t = moment(selectedClass.start_time, 'hh:mm a');
        const formateTime = t.format('hh:mm a');

        constants.hideHUD();
        this.setState({ classInfoHolder: { ...selectedClass, start_time: formateTime, date: selectedClass.date } })
    }

    render() {
        const { classInfoHolder, isEmpty } = this.state;
        const { navigation } = this.props;
        const { location, start_time, class_type, teacher, date } = this.state.classInfoHolder;
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

                                <View style={styles.cellContainer}>
                                    <View style={styles.cellImageContainer}>
                                        <Image source={require('../../../assets/image/classInfo/calendar.png')} style={[styles.cellImage, {
                                            height: 25,
                                            width: 25
                                        }]} />
                                    </View>
                                    <View style={styles.cellBodyContainer}>
                                        <Text style={styles.cellTitle}>Date</Text>
                                        <Text style={styles.cellTitleValue}>{date}</Text>
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
                                        <Text style={styles.cellTitleValue}>{start_time}</Text>
                                    </View>
                                </View>
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

                            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['#fe6c44', '#a0452c']} style={styles.buttonGradientContainer}>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.goBack()} >
                                    <Text style={styles.buttonTitle}>Back</Text>
                                </TouchableOpacity>
                            </LinearGradient>
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