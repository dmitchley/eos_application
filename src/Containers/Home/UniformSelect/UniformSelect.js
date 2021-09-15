import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import styles from './styles';
import * as constants from '../../../constants/constants';
import LinearGradient from 'react-native-linear-gradient';
import StickyHeader from '../../../Components/StickyHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ThemeButton from '../../../Components/ThemeButton';
import Toast from 'react-native-simple-toast';
import localStorage from '../../../library/LocalStorage';

import { addUniformRequest } from '../../../FirebaseAction/uniformAction';

const isIOS = Platform.OS === 'ios' ? true : false;

export default class UniformSelect extends React.Component {
    constructor(props) {
        super(props);

        this.agesArray = Array.apply(null, Array(50)).map((v, i) => {
            return { label: i + 1, value: i + 1 };
        });

        this.uniform_item = [
            {
                label: 'Adult/teen leotard', value: 'Adult/teen leotard', size: [
                    { label: '9-11y', value: '9-11y' },
                    { label: '12-14y', value: '12-14y' },
                    { label: 'Medium', value: 'Medium' },
                    { label: 'Large', value: 'Large' },
                ]
            },
            {
                label: 'Adult/teen voile skirt', value: 'Adult/teen voile skirt', size: [
                    { label: 'Small', value: 'Small' },
                    { label: 'Medium', value: 'Medium' },
                    { label: 'Large', value: 'Large' },
                ]
            },
            {
                label: 'Ballet boys uniform', value: 'Ballet boys uniform', size: [
                    { label: '2-3y', value: '2-3y' },
                    { label: '3-4y', value: '3-4y' },
                    { label: '5-6y', value: '5-6y' },
                    { label: '7-8y', value: '7-8y' },
                ]
            },
            {
                label: 'Ballet cardigan', value: 'Ballet cardigan', size: [
                    { label: '2-3y', value: '2-3y' },
                    { label: '3-4y', value: '3-4y' },
                    { label: '5-6y', value: '5-6y' },
                    { label: '7-8y', value: '7-8y' },
                    { label: '9-11y', value: '9-11y' },
                ]
            },
            {
                label: 'Footless tights', value: 'Footless tights', size: [
                    { label: '9-11y', value: '9-11y' },
                    { label: '12-14y', value: '12-14y' },
                    { label: 'Small', value: 'Small' },
                    { label: 'Medium', value: 'Medium' },
                    { label: 'Large', value: 'Large' },
                ]
            },
            {
                label: 'Leotard', value: 'Leotard', size: [
                    { label: '2-3y', value: '2-3y' },
                    { label: '3-4y', value: '3-4y' },
                    { label: '5-6y', value: '5-6y' },
                    { label: '7-8y', value: '7-8y' },
                    { label: '9-11y', value: '9-11y' },
                    { label: '12-14y', value: '12-14y' },
                ]
            },
            { label: 'Replacement bag', value: 'Replacement bag', size: [] },
            {
                label: 'Ballet shoes', value: 'Ballet shoes', size: [
                    { label: '1', value: '1' },
                    { label: '1.5', value: '1.5' },
                    { label: '2', value: '2' },
                    { label: '2.5', value: '2.5' },
                    { label: '3', value: '3' },
                    { label: '3.5', value: '3.5' },
                    { label: '4', value: '4' },
                    { label: '4.5', value: '4.5' },
                    { label: '5', value: '5' },
                    { label: '5.5', value: '5.5' },
                    { label: '6', value: '6' },
                    { label: '6.5', value: '6.5' },
                    { label: '5Jr', value: '5Jr' },
                    { label: '5.5Jr', value: '5.5Jr' },
                    { label: '6Jr', value: '6Jr' },
                    { label: '6.5Jr', value: '6.5Jr' },
                    { label: '7Jr', value: '7Jr' },
                    { label: '7.5Jr', value: '7.5Jr' },
                    { label: '8Jr', value: '8Jr' },
                    { label: '8.5Jr', value: '8.5Jr' },
                    { label: '9Jr', value: '9Jr' },
                    { label: '9.5Jr', value: '9.5Jr' },
                    { label: '10Jr', value: '10Jr' },
                    { label: '10.5Jr', value: '10.5Jr' },
                    { label: '11Jr', value: '11Jr' },
                    { label: '11.5Jr', value: '11.5Jr' },
                    { label: '12Jr', value: '12Jr' },
                    { label: '12.5Jr', value: '12.5Jr' },
                    { label: '13Jr', value: '13Jr' },
                    { label: '13.5Jr', value: '13.5Jr' },
                ]
            },
            {
                label: 'Street dance uniform', value: 'Street dance uniform', size: [
                    { label: '5-6y', value: '5-6y' },
                    { label: '7-8y', value: '7-8y' },
                    { label: '9-11y', value: '9-11y' },
                    { label: '12-14y', value: '12-14y' },
                    { label: '14-15y', value: '14-15y' },
                ]
            },
            {
                label: 'Tap shoes', value: 'Tap shoes', size: [
                    { label: '1', value: '1' },
                    { label: '1.5', value: '1.5' },
                    { label: '2', value: '2' },
                    { label: '2.5', value: '2.5' },
                    { label: '3', value: '3' },
                    { label: '3.5', value: '3.5' },
                    { label: '4', value: '4' },
                    { label: '4.5', value: '4.5' },
                    { label: '5', value: '5' },
                    { label: '5.5', value: '5.5' },
                    { label: '6', value: '6' },
                    { label: '6.5', value: '6.5' },
                    { label: '5Jr', value: '5Jr' },
                    { label: '5.5Jr', value: '5.5Jr' },
                    { label: '6Jr', value: '6Jr' },
                    { label: '6.5Jr', value: '6.5Jr' },
                    { label: '7Jr', value: '7Jr' },
                    { label: '7.5Jr', value: '7.5Jr' },
                    { label: '8Jr', value: '8Jr' },
                    { label: '8.5Jr', value: '8.5Jr' },
                    { label: '9Jr', value: '9Jr' },
                    { label: '9.5Jr', value: '9.5Jr' },
                    { label: '10Jr', value: '10Jr' },
                    { label: '10.5Jr', value: '10.5Jr' },
                    { label: '11Jr', value: '11Jr' },
                    { label: '11.5Jr', value: '11.5Jr' },
                    { label: '12Jr', value: '12Jr' },
                    { label: '12.5Jr', value: '12.5Jr' },
                    { label: '13Jr', value: '13Jr' },
                    { label: '13.5Jr', value: '13.5Jr' },
                ]
            },
            {
                label: 'Tap uniform', value: 'Tap uniform', size: [
                    { label: '3-4y', value: '3-4y' },
                    { label: '5-6y', value: '5-6y' },
                    { label: '7-8y', value: '7-8y' },
                    { label: '9-11y', value: '9-11y' },
                ]
            },
        ]
        this.state = {
            isAgePickerOpen: false,
            ageValue: null,
            isSizePickerOpen: false,
            sizeValue: null,
            isItemPickerOpen: false,
            itemValue: null,
            sizeArray: []
        }

    }

    setAgeOpen(open) {
        this.setState({
            isAgePickerOpen: open,
            isSizePickerOpen: false,
            isItemPickerOpen: false,
        });
    }

    setAgeValue(callback) {
        this.setState(state => ({
            ageValue: callback(state.value)
        }));
    }

    setSizeOpen(open) {
        this.setState({
            isSizePickerOpen: open,
            isItemPickerOpen: false,
            isAgePickerOpen: false
        });
    }

    setSizeValue(callback) {
        this.setState(state => ({
            sizeValue: callback(state.value)
        }));
    }

    setItemOpen(open) {
        this.setState({
            isItemPickerOpen: open,
            isSizePickerOpen: false,
            isAgePickerOpen: false
        });
    }

    setItemValue(callback) {
        this.setState(state => ({
            itemValue: callback(state.value)
        }), () => {
            const sizeArray = this.uniform_item.filter((item) => item.value == this.state.itemValue);
            if (sizeArray.length > 0) {
                this.setState({ sizeArray: sizeArray[0].size })
            }
        });
    }

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

    onRequestUniform = async () => {
        const { ageValue, sizeValue, itemValue } = this.state;
        try {
            constants.showHUD();
            const userInfo = await localStorage.getParseData("USER_INFO_KEY");
            const currentChild = await localStorage.getParseData("CURRENT_CHILD");
            const { parent_id, firstName, lastName } = userInfo;
            const { children_id } = currentChild;

            const data = {
                parent_name: `${firstName} ${lastName}`,
                data: {
                    uniform_request_id: this.firestoreAutoId(),
                    parent_id,
                    children_id,
                    uniform_item: itemValue,
                    // age: ageValue,
                    size: sizeValue,
                    isNotiRead: false,
                    created_at: Math.floor(Date.now() / 1000)
                }
            }
            const isRequestSend = await addUniformRequest(data);
            if (isRequestSend) {
                constants.hideHUD();
                Alert.alert(
                    '',
                    'Uniform item request has been sent successfully',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]
                )
                // alert('Request has been sent successfully');
                // Toast.show('Request sent successfully', Toast.SHORT);
            } else {
                constants.hideHUD();
                Toast.show('Something went wrong !!', Toast.SHORT);
            }
        } catch (error) {
            constants.hideHUD();
            Toast.show('Something went wrong !!', Toast.SHORT);
        }

    }

    render() {
        const { isAgePickerOpen, ageValue, isSizePickerOpen, sizeValue, isItemPickerOpen, itemValue, sizeArray } = this.state;
        return (
            <View style={styles.rootContainer}>
                <StickyHeader {...this.props} />

                <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1 }} colors={[constants.gradient1, constants.gradient2]} style={styles.bodyContainer}>
                    <View style={{ flex: 0.82, alignItems: 'center' }}>
                        <View style={[styles.sectionContainer, {
                            marginTop: hp('10%'), ...(Platform.OS === 'android' && {
                                zIndex: 99,
                                flexGrow: (isAgePickerOpen || isSizePickerOpen || isItemPickerOpen) ? 1 : null
                            }),
                        }]}>
                            <Text style={[styles.titleText, { marginBottom: hp('5%') }]}>Uniform Items</Text>

                            <DropDownPicker
                                open={isItemPickerOpen}
                                value={itemValue}
                                items={this.uniform_item}
                                placeholder={'Select item'}
                                placeholderStyle={styles.placeHolderText}
                                labelStyle={styles.placeHolderText}
                                zIndex={3}
                                dropDownContainerStyle={{ zIndex: 99 }}
                                style={{ backgroundColor: '#f2f2f2', color: "#475AA5", borderWidth: 0 }}
                                setOpen={(open) => this.setItemOpen(open)}
                                setValue={(callback) => this.setItemValue(callback)}
                            />

                            {/* <View style={{ height: 15 }}></View> */}
                            {/* <DropDownPicker
                                open={isAgePickerOpen}
                                value={ageValue}
                                items={this.agesArray}
                                placeholder={'Select age'}
                                placeholderStyle={styles.placeHolderText}
                                labelStyle={styles.placeHolderText}
                                zIndex={2}
                                dropDownContainerStyle={{ zIndex: 99 }}
                                style={{ backgroundColor: '#f2f2f2', color: "#475AA5", borderWidth: 0 }}
                                setOpen={(open) => this.setAgeOpen(open)}
                                setValue={(callback) => this.setAgeValue(callback)}
                            /> */}

                            <View style={{ height: 15 }}></View>
                            <DropDownPicker
                                open={isSizePickerOpen}
                                value={sizeValue}
                                translation={{
                                    NOTHING_TO_SHOW: itemValue == null ? "Please select item" : "There's nothing to show!"
                                }}
                                items={sizeArray}
                                zIndex={1}
                                maxHeight={hp('18%')}
                                placeholder={'Select size'}
                                placeholderStyle={styles.placeHolderText}
                                labelStyle={styles.placeHolderText}
                                style={{ backgroundColor: '#f2f2f2', color: "#475AA5", borderWidth: 0, }}
                                dropDownContainerStyle={{ zIndex: 99 }}
                                setOpen={(open) => this.setSizeOpen(open)}
                                setValue={(callback) => this.setSizeValue(callback)}
                            />
                        </View>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <ThemeButton title={'Submit'} onPress={() => this.onRequestUniform()} />
                    </View>

                </LinearGradient>
            </View>
        )
    }
}