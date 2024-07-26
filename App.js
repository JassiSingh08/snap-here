// App.js
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import MainScreen from './Components/MainScreen';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';

const App = () => {
  const [bgColor, setBgColor] = useState(["#4c669f", "#3b5998", "#192f6a"]);
  let [fontsLoaded] = useFonts({
    RobotoMono: require("./assets/Fonts/RobotoMono-VariableFont_wght.ttf"),
  });

  const colorScheme = useColorScheme();
  console.log(colorScheme)

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: bgColor[0] }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
      />
    ),
  };

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MainScreen bgColor={bgColor} setBgColor={setBgColor} deviceTheme={colorScheme} fonts={fontsLoaded} />
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
