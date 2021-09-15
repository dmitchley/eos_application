import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

export default class StickyHeader extends React.Component {
    static propTypes = {
        isBackButton: PropTypes.bool,
    };

    static defaultProps = {
        isBackButton: false
    };

    constructor(props) {
        super(props);

    }

    onOpenDrawer = () => {
        const { navigation } = this.props;
        navigation.openDrawer();
    }

    onBackButton = () => {
        const { navigation } = this.props;
        navigation.goBack()
    }

    render() {
        const { isBackButton } = this.props;
        return (
            <View style={styles.headerContainer}>
                {isBackButton
                    ?
                    <TouchableOpacity style={styles.menuContainer} onPress={() => this.onBackButton()}>
                        <Image source={require('../../assets/image/icon_arrow.png')} style={styles.menuIcon} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.menuContainer} onPress={() => this.onOpenDrawer()}>
                        <Image source={require('../../assets/image/menu.png')} style={styles.menuIcon} />
                    </TouchableOpacity>
                }

                <View style={styles.headerImgContainer}>
                    <Image source={require('../../assets/image/logo.png')} style={styles.headerLogoImage} />
                </View>
            </View>
        )
    }
}