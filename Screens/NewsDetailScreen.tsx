import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Article} from '../TypeScript/NewsListAll';
import {Scale, screenHeight, screenWidth} from '../Components/scale';
import {color} from '../Components/colors';
import useTheme from '../Components/useTheme';

const NewsDetailScreen = ({route}: any) => {
  console.log('first', route.params.item);
  const [data, setData] = useState<Article | null>(null);

  const theme = useTheme()

  useEffect(() => {
    setData(route.params.item);
  }, []);
  return (
    <View style = {{backgroundColor: theme.background, flex: 1}}>
      <Image
        style={styles.image}
        source={{
          uri:
            data?.urlToImage ??
            'https://media.istockphoto.com/id/157399872/photo/news.webp?b=1&s=170667a&w=0&k=20&c=PGyIbgCz9yjbBK70ypjZinJLPK5O_jGvRTfW1xNkSiA=',
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>• {data?.title}</Text>
        <Text style={styles.author}>-{data?.author}</Text>
        <Text style ={styles.title}>Description:-</Text>
        <Text style={styles.content}>{data?.description}</Text>
        <Text style ={styles.title}>Content:-</Text>
        <View style={styles.row}>
        <Text style={styles.content}>
          {data?.content?.split('[+')[0]}
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(data?.url ?? 'https://www.foxbusiness.com')
            }>
            <Text style={styles.link}> more...</Text>
          </TouchableOpacity>
        </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: screenHeight * 0.5,
    width: screenWidth,
  },
  container: {
    marginHorizontal: Scale(20),
    marginTop: Scale(16),
  },
  text: {
    color: color.headingMain,
    fontSize: Scale(15),
    fontWeight: '700',
  },
  author: {
    color: color.primary,
    fontSize: Scale(15),
    fontWeight: '700',
    marginTop: Scale(8),
    textAlign: 'right',
  },
  content: {
    fontSize: Scale(12),
   marginBottom: Scale(10),
    color: color.titleGrey,
  },
  link: {
    color: '#33F',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: color.headingMain,
    fontWeight: '500'
  }
});

export default NewsDetailScreen;
