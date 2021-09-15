import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as constants from '../../constants/constants';

export default class RadioButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} >
                <View style={{
                    height: 22,
                    width: 22,
                    borderRadius: 11,
                    borderWidth: this.props.checked ? 2 : 1,
                    borderColor: this.props.checked ? constants.buttonColor : '#9ca4c7',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: this.props.checked ? constants.buttonColor : '#e6e8fd'
                }}>
                    <View style={{
                        height: this.props.checked ? 10 : 8,
                        width: this.props.checked ? 10 : 8,
                        borderRadius: this.props.checked ? 5 : 4,
                        backgroundColor: '#FFF',
                    }} />
                </View>
            </TouchableOpacity>
        )
    }
}