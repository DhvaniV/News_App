import {useColorScheme} from 'react-native';


const useTheme = () => {
  const theme = useColorScheme();
  if (theme === 'dark') {
    return {
      background: '#111',
    
    };
  } else {
    return {
      background: '#EEE',
     
    };
  }
};

export default useTheme;