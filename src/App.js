import React, { PureComponent } from 'react';
import { View, LogBox, StatusBar, Platform } from 'react-native';
import { BaseNavigator } from "./navigation";
import NetInfo from "@react-native-community/netinfo";
import NoInternet from './Components/NoInternet';

let unsubscribe = null;

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: true
    }
  }

  componentDidMount() {
    LogBox.ignoreAllLogs();
    StatusBar.setBarStyle("dark-content");
    this.checkInternet();
    Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
    Platform.OS === 'android' && StatusBar.setTranslucent(true);
  }

  checkInternet = () => {
    try {
      unsubscribe = NetInfo.addEventListener(state => {
        this.setState({ isConnected: state.isConnected })
      });
    } catch (error) {
      console.log(error)
    }
  }

  componentWillUnmount() {
    if (unsubscribe != null) unsubscribe()
  }

  render() {
    const { isConnected } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <NoInternet isConnected={isConnected} reTryPress={this.checkInternet} />
        <BaseNavigator />
      </View>
    );
  }
}
