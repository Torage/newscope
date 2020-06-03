import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { SearchScreenStylesLight, SearchScreenStylesDark } from './SearchScreen.styles';
import { NewsCardComponent } from '../../components/NewsCardComponent/NewsCard.component';
import { NewsContext } from '../../Data/newsContext';
import { Topnews } from '../../Models/TopnewsModel';
import { SettingsContext } from '../../Data/settingsContext';
import { Input } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-simple-toast';
import { Colors } from '../../constants/colors';

export const SearchScreen = (props) => {
    // Global State object
    const { theme, push, country } = useContext(SettingsContext);
    const [currentTheme, setCurrentTheme] = theme;
    const [sendPushNotification, setSendPushNotification] = push;
    const [currentCountry, setCurrentCountry] = country;

    const { topNews, favoriteNews } = useContext(NewsContext);
    const [newsData, setNewsData] = topNews;
    const [favoriteData, setFavoriteData] = favoriteNews;

    function fetchNews(query) {
        const xhr = new XMLHttpRequest();
        if (query == '' || query == null) {
            console.log('query is empty null!');
            // xhr.open('GET', 'https://newsapi.org/v2/everything?q=' + query + '&apiKey=f4635151d8bf47af94cec511748e296e', true);
            xhr.open(
                'GET',
                'http://newsapi.org/v2/top-headlines?country=' + currentCountry + '&pageSize=100&apiKey=f4635151d8bf47af94cec511748e296e',
                true
            );
        } else {
            console.log('query is  FILLED!');
            // console.log('https://newsapi.org/v2/everything?q=' + query + '&apiKey=f4635151d8bf47af94cec511748e296e');
            console.log('&apiKey=f4635151d8bf47af94cec511748e296e');
            xhr.open('GET', 'https://newsapi.org/v2/everything?q=' + query + '&apiKey=f4635151d8bf47af94cec511748e296e', true);
        }
        xhr.onload = () => {
            setNewsData((newsData) => ({
                liveTopnews: new Topnews(JSON.parse(xhr.response)),
            }));
        };
        xhr.send();
    }

    return (
        <View style={currentTheme === 'light' ? SearchScreenStylesLight.viewContainer : SearchScreenStylesDark.viewContainer}>
            <View style={currentTheme === 'light' ? SearchScreenStylesLight.inputView : SearchScreenStylesDark.inputView}>
                <Input
                    inputContainerStyle={currentTheme === 'light' ? SearchScreenStylesLight.input : SearchScreenStylesDark.input}
                    placeholder='Search for News...'
                    leftIcon={
                        <MaterialCommunityIcons
                            name='magnify'
                            color={currentTheme === 'light' ? Colors.light.accent : Colors.dark.accent}
                            size={24}
                        />
                    }
                    onSubmitEditing={(value) => {
                        fetchNews(value.nativeEvent.text);
                    }}
                />
            </View>
            <FlatList
                refreshing={false}
                onRefresh={() => {
                    // fetchNews();
                }}
                keyExtractor={(article) => article.source.id}
                data={newsData.liveTopnews.articles}
                renderItem={({ item }) => (
                    <NewsCardComponent
                        category={item.source.name}
                        title={item.title}
                        description={item.description}
                        imageUrl={item.urlToImage}
                        url={item.url}
                        content={item.content}
                        publishedAt={item.publishedAt}
                        author={item.author}
                        screen='Search'
                        id='0'
                    />
                )}
            />
        </View>
    );
};
