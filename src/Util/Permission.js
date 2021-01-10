import React, { useState, useEffect } from 'react';
// import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export const useCameraPermision = () => {
  const [ permission, setPermission ] = useState(null);
  const confilmPermision = async() => {
    const { status } = await MediaLibrary.getPermissionsAsync();
    if ( status === 'granted' ) {
      setPermission(true);
    } else {
      const { status : askStatus } = await MediaLibrary.requestPermissionsAsync(); 
      if ( askStatus === 'granted' ) {
        setPermission(true);
      } else {
        setPermission(false);
      }
    }
  }
  useEffect(() => {
    confilmPermision();
  }, []);
  
  return permission;
}