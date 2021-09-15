import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

export default class ThemeButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, onPress } = this.props;
        return (
            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['#fe6c44', '#a0452c']} style={styles.buttonGradientContainer}>
                {/* <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7} onPress={this.onLogin}> */}
                <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
                    <Text style={styles.buttonTitle}>{title}</Text>
                </TouchableOpacity>
            </LinearGradient>
        )
    }
}