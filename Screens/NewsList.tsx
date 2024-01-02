import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Search, WallPaper, arrow, backIcon} from '../Components/assests';
import {Scale, screenHeight, screenWidth} from '../Components/scale';
import {color} from '../Components/colors';
import {FlatList} from 'react-native-gesture-handler';
import {API_KEY, base_URL} from '../Components/constant';
import {Article} from '../TypeScript/NewsListAll';
import CustomHeader from '../CustomComponents/HeaderComponent';
import PaginationDot from 'react-native-animated-pagination-dot';
import useTheme from '../Components/useTheme';
import NewsDetailScreen from './NewsDetailScreen';

const NewsList = ({navigation}: any) => {
  const [searchNews, setSearchNews] = useState('');
  const [selectedTab, setSelectedTab] = useState('All');

  const [articleList, setArticleList] = useState<Article[]>([]);
  const [index, setIndex] = useState(0);

  const theme = useTheme();

  const flatListRef = useRef<FlatList | null>(null);

  const DATA = [
    {
      id: '1',
      title: 'All',
      apiEndpoint: 'top-headlines?country=us&category=business',
    },
    {
      id: '2',
      title: 'Technology',
      apiEndpoint: 'top-headlines?sources=techcrunch',
    },
    {
      id: '3',
      title: 'Apple',
      apiEndpoint:
        'everything?q=apple&from=2023-12-31&to=2023-12-31&sortBy=popularity',
    },
    {
      id: '4',
      title: 'Tesla',
      apiEndpoint: 'everything?q=tesla&from=2023-12-01&sortBy=publishedAt',
    },
    {
      id: '5',
      title: 'Wall Street Journal',
      apiEndpoint: 'everything?domains=wsj.com',
    },
  ];

  const selectTab = (title: string, apiEndpoint: string) => {
    setSelectedTab(title);
    apiCall(apiEndpoint);
  };

  const renderList = ({item}: any) => {
    let selectedItem = item.title === selectedTab;
    return (
      <TouchableOpacity
        onPress={() => selectTab(item.title, item.apiEndpoint)}
        style={[
          styles.list,
          {backgroundColor: selectedItem ? color.primary : color.white},
        ]}>
        <Text
          style={{color: selectedItem ? color.backGround : color.titleGrey}}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const apiCall = async (ApiEndPoint: string) => {
    await fetch(`${base_URL}${ApiEndPoint}&apiKey=${API_KEY}`)
      .then(response => response.json())
      .then(response => setArticleList(response.articles));
  };

  const renderArticleList = ({item}: {item: Article}) => {
    return (
      <View style={styles.listContainer}>
        <TouchableOpacity
        onPress = {()=> navigation.navigate('NewsDetailScreen', {item: item})}
         style={styles.mainView}>
          <Image
            source={{
              uri:
                item.urlToImage ??
                'https://media.istockphoto.com/id/157399872/photo/news.webp?b=1&s=170667a&w=0&k=20&c=PGyIbgCz9yjbBK70ypjZinJLPK5O_jGvRTfW1xNkSiA=',
            }}
            style={styles.image}
          />
          <View style={styles.text_View}>
            <Text style={styles.text} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={styles.row}>
              <Text style={styles.authorTxt}>
                {item.author ? item.author.slice(0, 10) : 'Anonymous'}
              </Text>
              <Text style={styles.authorTxt}>
                {item.publishedAt.split('T')[0]}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item}: {item: Article}) => {
    return (
      <View style={styles.carouselView} key={item.title}>
        <View style={{position: 'relative'}}>
          <Image source={{uri: item.urlToImage}} style={styles.imageCarousel} />
          <View style={{bottom: 30}}>
            <Text style={styles.source_name}>{item.source.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    apiCall('top-headlines?country=us&category=business');
  }, []);
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <CustomHeader
        onBack={backIcon}
        onBackPress={() => navigation.goBack()}
        title={'Top Headlines'}
      />
      {articleList.length === 0 ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={color.primary} />
        </View>
      ) : (
        <View style={{marginHorizontal: Scale(15)}}>
          <View>
            <FlatList
              ref={flatListRef}
              data={articleList.slice(0, 5)}
              renderItem={renderItem}
              horizontal
              scrollEnabled
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carousel}
              onMomentumScrollEnd={e => {
                console.log(e.nativeEvent.contentOffset.x + Scale(30.5))
                setIndex(
                  Math.ceil(
                    (e.nativeEvent.contentOffset.x + Scale(30.5)) / screenWidth,
                  ),
                );
              }}
            />
          </View>
          <View style={styles.dots}>
            <PaginationDot
              activeDotColor={color.primary}
              curPage={index}
              maxPage={5}
            />
          </View>
          <View>
            <FlatList
              data={DATA}
              renderItem={renderList}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.view}>
            <FlatList
              data={articleList}
              renderItem={renderArticleList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    marginLeft: Scale(10),
  },
  view: {
    marginTop: Scale(15),
  },
  searchBarView: {
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: Scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
  },
  container: {
    flex: 1,
  },
  list: {
    marginLeft: Scale(15),
    paddingHorizontal: Scale(8),
    paddingVertical: Scale(3),
    borderRadius: Scale(10),
  },
  image: {
    width: Scale(100),
    height: Scale(75),
    borderRadius: Scale(12),
  },
  listContainer: {
    marginBottom: Scale(20),
    backgroundColor: color.grey,
    borderRadius: Scale(10),
  },
  mainView: {
    flexDirection: 'row',
    flex: 1,
  },
  text: {
    color: color.headingMain,
    flex: 1,
  },
  text_View: {
    marginHorizontal: Scale(10),
    flex: 1,
    paddingVertical: Scale(10),
  },
  authorTxt: {
    color: color.titleGrey,
    fontSize: Scale(10),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Scale(10),
  },
  carousel: {
    paddingVertical: Scale(20),
  },
  imageCarousel: {
    width: screenWidth * 0.78,
    height: screenHeight * 0.3,
    borderRadius: Scale(20),
  },
  carouselView: {
    paddingHorizontal: Scale(25),
  },
  source_name: {
    color: color.white,
    textAlign: 'center',
    fontSize: Scale(20),
    fontWeight: '700',
  },
  dots: {
    alignItems: 'center',
    marginTop: Scale(-30),
    marginBottom: Scale(15),
  },
  loader: {
    justifyContent: 'center',
    flex: 1,
  },
});

export default NewsList;
