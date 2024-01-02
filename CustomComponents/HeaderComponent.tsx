import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Scale} from '../Components/scale';
import { color } from '../Components/colors';

const CustomHeader = ({onBack, about, title, navigation, onBackPress}: any) => {
  return (
    <SafeAreaView>
      <View style={styles.row}>
        <TouchableOpacity onPress={onBackPress}>
          <Image source={onBack} />
        </TouchableOpacity>
        <Text style={styles.headertext}>{title}</Text>
        <TouchableOpacity onPress={navigation}>
          <Image source={about} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Scale(10),
    alignItems: 'center',
  },
  headertext: {
    fontFamily: 'sans-serif',
    fontSize: Scale(18),
    color: color.primary,
    fontWeight: '700',
  },
});

export default CustomHeader;