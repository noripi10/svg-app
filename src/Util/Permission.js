import * as Admob from 'expo-ads-admob';
// import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import {useEffect, useState} from 'react';

export const useCameraPermission = () => {
  const [permission, setPermission] = useState(null);
  const confirmPermission = async () => {
    const {status} = await MediaLibrary.getPermissionsAsync();
    if (status === 'granted') {
      setPermission(true);
    } else {
      const {status: askStatus} = await MediaLibrary.requestPermissionsAsync();
      if (askStatus === 'granted') {
        setPermission(true);
      } else {
        setPermission(false);
      }
    }
  };
  useEffect(() => {
    confirmPermission();
  }, []);

  return permission;
};

export const useAdmobPermission = () => {
  const [permission, setPermission] = useState(null);

  const isAvailableAdmobApi = async () => {
    const result = await Admob.isAvailableAsync();
    return result;
  };

  const confirmPermission = async () => {
    const {status} = await Admob.getPermissionsAsync();
    if (status === 'granted') {
      setPermission(true);
    } else {
      const {status: askStatus} = await Admob.requestPermissionsAsync();
      if (askStatus === 'granted') {
        setPermission(true);
      } else {
        setPermission(false);
      }
    }
  };

  useEffect(() => {
    confirmPermission();
  }, []);

  return {permission, isAvailableAdmobApi};
};
