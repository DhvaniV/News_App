import {View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {WallPaper, arrow} from '../Components/assests';
import {Scale, screenHeight, screenWidth} from '../Components/scale';
import {color} from '../Components/colors';
import useTheme from '../Components/useTheme';

const Intro = ({navigation}: any) => {
  const theme = useTheme()
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.mainContainer}>
        <Image source={WallPaper} style={styles.image} />
        <Text style={styles.heading}>Find Interested News Across World</Text>
        <Text style={styles.title}> Get the Latest Updates On</Text>
        <Text style={styles.title}>The Most Popular And Hot News With Us.</Text>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
        style = {styles.button}
         onPress={() => navigation.navigate('NewsList')}>

   <Text style ={styles.next}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    borderRadius: Scale(20),
    width: screenWidth * 0.9,
    height: screenHeight * 0.3,
  },
  heading: {
    color: color.headingMain,
    textAlign: 'center',
    fontSize: Scale(32),
    marginTop: Scale(20),
    marginHorizontal: Scale(16),
    marginBottom: Scale(25),
  },
  mainContainer: {
    marginHorizontal: Scale(20),
    marginTop: Scale(40)

  },
  title: {
    color: color.titleGrey,
    fontSize: Scale(16),
    textAlign: 'center',
    marginTop: Scale(3),
  },
  bottom: {
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
    marginRight: Scale(20),
  },
  next: {
    color: color.white,
    letterSpacing: Scale(1),
    fontSize: Scale(18),
    textAlign: 'center'
  },
  button: {
    backgroundColor: color.primary,
    width: screenWidth*0.7,
    paddingVertical: Scale(10),
    borderRadius: Scale(20)
  }

});
export default Intro;
