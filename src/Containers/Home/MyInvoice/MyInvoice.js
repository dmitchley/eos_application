import React from 'react';
import { SafeAreaView, View, Text, Alert, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as constants from '../../../constants/constants';
import LinearGradient from 'react-native-linear-gradient';
import StickyHeader from '../../../Components/StickyHeader';
import styles from './styles';
import ThemeButton from '../../../Components/ThemeButton';
import DisableThemeButton from '../../../Components/DisableThemeButton';
import { getChildInvoice, setMarkasPaid } from '../../../FirebaseAction/invoiceAction';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import _ from 'lodash'

export default class MyInvoice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            invoiceDataHolder: {},
            isAlreadyPaid: false,
            isEmpty: false
        }

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getInvoice()
        });
    }

    componentDidMount() {
        constants.showHUD();
        this.getInvoice();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    getInvoice = async () => {
        const invoiceData = await getChildInvoice();
        if(_.isEmpty(invoiceData, true)) {
            constants.hideHUD();
            this.setState({ isEmpty: true })
        } else {
            this.setState({ isEmpty: false })
            const m = moment(moment(invoiceData.date).format('DD/MM/YYYY'));
            const formateDate = m.format('DD MMM YYYY');
            const t = moment(invoiceData.time, 'hh:mm');
            const formateTime = t.format('hh:mm a');
    
            const data = {
                due_invoices_id: invoiceData.due_invoices_id,
                invoice_date: formateDate,
                invoice_time: formateTime,
                class_type: invoiceData.class_type
            }
    
            constants.hideHUD();
            this.setState({ invoiceDataHolder: data, isAlreadyPaid: invoiceData.is_paid })
        }
       
    }

    onMarkasPaid = async () => {
        const { due_invoices_id } = this.state.invoiceDataHolder;
        try {
            constants.showHUD();
            const isMarkasPaid = await setMarkasPaid(due_invoices_id);
            if (isMarkasPaid) {
                constants.hideHUD();
                this.setState({ isAlreadyPaid: true });
                Alert.alert(
                    '',
                    'Dance school has been notified that this invoice is paid.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]
                )
                // Toast.show('Your invoice mark as paid', Toast.SHORT);
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
        const { isAlreadyPaid, invoiceDataHolder, isEmpty } = this.state;
        const { invoice_date, invoice_time, class_type } = this.state.invoiceDataHolder;
        return (
            <View style={styles.rootContainer}>
                <StickyHeader {...this.props} />

                <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1 }} colors={[constants.gradient1, constants.gradient2]} style={styles.bodyContainer}>

                    <>
                        <View style={styles.topContainer}>
                            <Text style={styles.titleText}>Due Invoices</Text>

                            {!isEmpty
                                ?
                                <>
                                    <Text style={styles.descriptionText}>Date: {invoice_date}</Text>
                                    <Text style={styles.descriptionText}>Time: {invoice_time}</Text>
                                    <Text style={styles.descriptionText}>Type: {class_type}</Text>
                                </>
                                :
                                <Text style={styles.descriptionText}>No Due Invoice available</Text>
                            }
                        </View>

                        {/* {Object.keys(invoiceDataHolder).length > 0
                            &&
                            <>
                                {isAlreadyPaid
                                    ?
                                    <DisableThemeButton title={'Mark as paid'} />
                                    :
                                    <ThemeButton title={'Mark as paid'} onPress={() => this.onMarkasPaid()} />
                                }

                                {isAlreadyPaid
                                    &&
                                    <Text>You have already mark this invoice as paid</Text>
                                }
                            </>
                        } */}
                    </>

                </LinearGradient>
            </View>
        )
    }
}