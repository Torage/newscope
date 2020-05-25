import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderComponent } from '../components/HeaderComponent/Header.component';
import { HomeNavigator } from './HomeNavigator';
import { FavoritesNavigator } from './FavoritesNavigator';
import { SearchNavigator } from './SearchNavigator';
import { Colors } from '../constants/colors';
import { Styles } from '../constants/styles';
import { SettingsContext } from '../Data/settingsContext';

const Tab = createMaterialTopTabNavigator();
export const MainNavigator = () => {

    const {theme, push} = useContext(SettingsContext);
    const [currentTheme, setCurrentTheme] = theme;
    const [sendPushNotification, setSendPushNotification] = push;

    return (
        <NavigationContainer>
            <HeaderComponent/>
            <Tab.Navigator
                initialRouteName='Home'
                tabBarPosition='bottom'
                tabBarOptions={{
                    labelStyle: {
                        fontSize: 10,
                        fontFamily: Styles.defaultFont,
                        alignSelf: 'center',
                    },
                    style: currentTheme === 'light' ? { backgroundColor: Colors.light.background } : { backgroundColor: Colors.dark.background },
                    showIcon: true,
                    showLabel: true,
                    activeTintColor: currentTheme === 'light' ? Colors.light.accent : Colors.dark.accent,
                    inactiveTintColor: currentTheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
                }}
            >
                <Tab.Screen
                    name='Favorites'
                    component={FavoritesNavigator}
                    options={{
                        tabBarLabel: 'Favorites',
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name='bookmark-check' color={color} size={26} />,
                    }}
                />
                <Tab.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{
                        tabBarLabel: 'home',
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name='home' color={color} size={26} />,
                    }}
                    initialParams
                />
                <Tab.Screen
                    name='Search'
                    component={SearchNavigator}
                    options={{
                        tabBarLabel: 'Search',
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name='magnify' color={color} size={26} />,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
