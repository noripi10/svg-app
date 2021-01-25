import React, {useReducer} from 'react';
import {AppNavigator} from './src/Navigation/AppNavigator';
import {initState, reducer} from './src/Util/Reducer';
import {AppContext} from './src/Context/AppContext';
import {useCameraPermision} from './src/Util/Permission';

export default function App() {
  const permissonCameraRoll = useCameraPermision();
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AppContext.Provider
      value={{state, dispatch, permission: permissonCameraRoll}}>
      <AppNavigator />
    </AppContext.Provider>
  );
}
