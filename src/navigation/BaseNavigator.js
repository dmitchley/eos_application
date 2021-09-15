import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

//navigation pages
import Splash from '../Containers/Welcome/Splash';
import Login from '../Containers/Welcome/Login';

import Dashboard from '../Containers/Home/Dashboard';
import ClassList from '../Containers/Home/ClassList';
import ClassInformation from '../Containers/Home/ClassInformation';
import RequestCatchup from '../Containers/Home/RequestCatchup';
import MyInvoice from '../Containers/Home/MyInvoice';
import UniformSelect from '../Containers/Home/UniformSelect';
import MyChildren from '../Containers/Home/MyChildren';
import EditProfile from '../Containers/Home/EditProfile';

import * as constants from '../constants/constants';
import * as fonts from '../constants/fonts';
import Custom from './custom';

// make navigation instnce
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Dashboard_icon = require('../assets/image/Drawer_icons/dashboard.png')
const Child_icon = require('../assets/image/Drawer_icons/child.png')
const Invoice_icon = require('../assets/image/Drawer_icons/invoice.png')
const Info_icon = require('../assets/image/Drawer_icons/info.png')
const Request_icon = require('../assets/image/Drawer_icons/question.png')
const Uniform_icon = require('../assets/image/Drawer_icons/shirt.png')

const styles = StyleSheet.create({
    iconImage: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },

    drawerText: {
        fontSize: 15,
        color: constants.blueText,
        fontFamily: fonts.MONTSERRATSEMIBOLD,
    },
})

function ClassNavigatorContainer() {
    return (
        <Stack.Navigator
            initialRouteName='ClassList'
            screenOptions={{
                gestureEnabled: true,
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS
            }}>
            <Stack.Screen
                name='ClassList'
                component={ClassList}
                initialParams={{ title: 'ClassList' }}
            />
            <Stack.Screen
                name='ClassListInformation'
                component={ClassInformation}
            />
        </Stack.Navigator>
    )
}

function RequestNavigatorContainer() {
    return (
        <Stack.Navigator
            initialRouteName='ClassList'
            screenOptions={{
                gestureEnabled: true,
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS
            }}>
            <Stack.Screen
                name='ClassList'
                component={ClassList}
                initialParams={{ title: 'RequestList' }}
            />
            <Stack.Screen
                name='RequestInformation'
                component={RequestCatchup}
            />
        </Stack.Navigator>
    )
}

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerStyle={{
                height: '100%',
                width: '70%',
                backgroundColor: constants.offWhite,
                zIndex: 9,
            }}
            drawerContentOptions={{
                activeTintColor: constants.buttonColor,
                gestureEnabled: true,
                labelStyle: styles.drawerText,
                // ...TransitionPresets.SlideFromRightIOS
                // backgroundColor: '#000',
                // inactiveTintColor: '#808080',
                // activeBackgroundColor: '#00000000',
            }}
            drawerContent={(props) => <Custom {...props} />}
        // drawerType='slide'
        >
            <Drawer.Screen
                name='Dashboard'
                component={Dashboard}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={Dashboard_icon}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name='MyChildren'
                component={MyChildren}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={Child_icon}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name='MyInvoice'
                component={MyInvoice}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={Invoice_icon}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name='ClassInformation'
                component={ClassNavigatorContainer}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={Info_icon}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name='RequestCatchup'
                component={RequestNavigatorContainer}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={Request_icon}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name='UniformSelect'
                component={UniformSelect}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={Uniform_icon}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    )
}

function MainStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Splash'
                screenOptions={{
                    gestureEnabled: false,
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS
                }}>
                <Stack.Screen
                    name='Splash'
                    component={Splash}
                    options={{ title: 'Splash Screen' }}
                />
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{
                        ...TransitionPresets.ScaleFromCenterAndroid
                    }}
                />
                <Stack.Screen
                    name='Home'
                    options={{
                        gestureEnabled: false,
                        ...TransitionPresets.ScaleFromCenterAndroid
                    }}
                    component={DrawerNavigator}
                />
                <Stack.Screen
                    name='EditProfile'
                    component={EditProfile}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export { MainStackNavigator as BaseNavigator };