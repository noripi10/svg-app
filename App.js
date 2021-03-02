import React, {useReducer} from 'react';
import {AppNavigator} from './src/Navigation/AppNavigator';
import {initState, reducer} from './src/Util/Reducer';
import {AppContext} from './src/Context/AppContext';
import {useCameraPermission} from './src/Util/Permission';

export default function App() {
  const permissionCameraRoll = useCameraPermission();
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AppContext.Provider
      value={{state, dispatch, permission: permissionCameraRoll}}>
      <AppNavigator />
    </AppContext.Provider>
  );
}
