import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, Modal, Text, StatusBar, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { HeaderStylesDark, HeaderStylesLight } from './Header.styles';
import Constants from 'expo-constants';
import ToggleButton from '../ToggleButtonComponent/ToggleButton';

export function HeaderComponent() {
    
    const changeToggleValue = value => {
        setToggleEnabled(value);
        AsyncStorage.setItem('DarkSkinSetting', JSON.stringify(value));

        if (value === true ? setCurrentTheme('dark') : setCurrentTheme('light'));

    }

    const [modalVisible, setModalVisible] = useState(false);
    const [toggleEnabled, setToggleEnabled] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('light');

    useEffect(() => {
        AsyncStorage.getItem('DarkSkinSetting').then(storedValue => {
            if (storedValue != null) {
                if (JSON.parse(storedValue) === true){
                    setCurrentTheme('dark');
                }
                else{
                    setCurrentTheme('light'); 
                }

                setToggleEnabled(JSON.parse(storedValue))
            }
        });

    }, []);

    return (
        <SafeAreaView style={currentTheme === 'light' ? HeaderStylesLight.safeAreaView : HeaderStylesDark.safeAreaView}>
            <StatusBar barStyle={'light-content'} backgroundColor={currentTheme === 'light' ? Colors.light.statusBarBG : Colors.dark.statusBarBG} />
            <Modal
                statusBarTranslucent='true'
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    console.log('modal closed');
                }}
            >
                <View style={currentTheme === 'light' ? HeaderStylesLight.centeredView : HeaderStylesDark.centeredView}>
                    <View>
                        <View style={currentTheme === 'light' ? HeaderStylesLight.modalView : HeaderStylesDark.modalView}>
                            <View style={currentTheme === 'light' ? HeaderStylesLight.modalViewHeader : HeaderStylesDark.modalViewHeader}>
                                <View style={currentTheme === 'light' ? HeaderStylesLight.modalIconContainer : HeaderStylesDark.modalIconContainer}>
                                </View>
                                <View style={currentTheme === 'light' ? HeaderStylesLight.modalTextContainer : HeaderStylesDark.modalTextContainer}>
                                    <Text style={currentTheme === 'light' ? HeaderStylesLight.modalHeaderText : HeaderStylesDark.modalHeaderText} >Settings</Text>
                                </View>
                                <View style={currentTheme === 'light' ? HeaderStylesLight.modalIconContainer: HeaderStylesDark.modalIconContainer}>
                                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                        <MaterialCommunityIcons name='close' color={currentTheme === 'light' ? Colors.light.accent: Colors.dark.accent} size={24} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={currentTheme === 'light' ? HeaderStylesLight.modalViewContent : HeaderStylesDark.modalViewContent}>
                               <ToggleButton title='Dark Theme' description='Change to the dark theme' toggleValue={toggleEnabled} onPress={changeToggleValue} currentTheme={currentTheme}></ToggleButton>
                            </View>
                            <View style={currentTheme === 'light' ? HeaderStylesLight.modalViewFooter : HeaderStylesDark.modalViewFooter}>
                                <Text style={currentTheme === 'light' ? HeaderStylesLight.modalFooterText : HeaderStylesDark.modalFooterText} >{Constants.manifest.name} {Constants.manifest.version} </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={currentTheme === 'light' ? HeaderStylesLight.headerLeftContainer : HeaderStylesDark.headerLeftContainer}></View>
            <View style={currentTheme === 'light' ? HeaderStylesLight.headerMidContainer : HeaderStylesDark.headerMidContainer}>
                <Image style={{ width: 250, height: 30 }} source={ currentTheme === 'light' ? require('../../assets/newscope_logo_light.png') : require('../../assets/newscope_logo_dark.png')} />
            </View>
            <View style={currentTheme === 'light' ? HeaderStylesLight.headerRightContainer : HeaderStylesDark.headerRightContainer}>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <MaterialCommunityIcons name='settings' color={currentTheme === 'light' ? Colors.light.accent : Colors.dark.accent} size={26} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
