import { View, Text } from 'react-native'
import React, { createContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Intro from './Screens/Intro';
import NewsList from './Screens/NewsList';
import NewsDetailScreen from './Screens/NewsDetailScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
      <Stack.Screen name='NewsList' component={NewsList} options={{ headerShown: false }} />
      <Stack.Screen name = "NewsDetailScreen" component ={NewsDetailScreen}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App