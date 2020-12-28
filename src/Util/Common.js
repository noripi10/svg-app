import React from "react";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = new Storage({
  storageBackend: AsyncStorage
});

export const AppContext = React.createContext(null);

export const getGuid = () => {
  let s4 = function () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}