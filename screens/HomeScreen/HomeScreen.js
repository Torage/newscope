import React, { useContext, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { HomeScreenStylesLight, HomeScreenStylesDark } from './HomeScreen.styles';
import { NewsCardComponent } from '../../components/NewsCardComponent/NewsCard.component';
import { NewsContext } from '../../Data/newsContext';
import { Topnews } from '../../Models/TopnewsModel';
import { SettingsContext } from '../../Data/settingsContext';

export const HomeScreen = (props) => {
    // Global State object
    const {theme, push} = useContext(SettingsContext);
    const [currentTheme, setCurrentTheme] = theme;
    const [sendPushNotification, setSendPushNotification] = push;
    
    const [newsState] = useContext(NewsContext);
    const [newsData, setNewsData] = useContext(NewsContext);
    // called if topnews changes, set
    useEffect(() => {
        //logging the id's to the console
        console.log('news status:', newsData.liveTopnews.status, '\n');
        newsData.liveTopnews.articles.map((article) => {
            console.log('Article ID:', article.source.id);
        });
        console.log('Number of Articles', newsData.liveTopnews.articles.length);
    }, [newsData]);

    function fetchNews() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f4635151d8bf47af94cec511748e296e', true);
        xhr.onload = () => {
            setNewsData((newsData) => ({
                liveTopnews: new Topnews(JSON.parse(xhr.response)),
            }));
        };
        xhr.send();
    }

    return (
        <View style={currentTheme === 'light' ? HomeScreenStylesLight.viewContainer : HomeScreenStylesDark.viewContainer}>
            <FlatList
                refreshing={false}
                onRefresh={() => {
                    fetchNews();
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
                    />
                )}
            />
        </View>
    );
};
