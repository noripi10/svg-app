import { storage } from './common';

export const initState = {
  memoList: [],
  error: {},
}

export const reducer = (state, action) => {
  let newMemoList = [];

  switch (action.TYPE){
    case 'DATA_INIT_FIRST' :
      storage.save({
        key: 'memoList',
        data: action.memoList
      });
      return {
        ...state,
        memoList: action.memoList
      }

    case 'DATA_INIT' :
      return {
        ...state,
        memoList: action.memoList
      }

    case 'DATA_CLEAR' :
      storage.save({
        key: 'memoList',
        data: []
      });
      return {
        ...state,
        memoList: []
      }

    case 'ITEM_UPDATE' :
      
      if (action.INSERT){
        newMemoList = [
          ...state.memoList,
          action.ITEM,
        ]
      }else{
        newMemoList = state.memoList.map((v, i) => {
          if (v.id == action.ITEM.id){
            return action.ITEM
          }
          return v;
        });
      }
      
      storage.save({
        key: 'memoList',
        data: newMemoList
      });
      return {
        ...state,
        memoList: newMemoList
      }

    case 'ITEM_DELETE' :
      newMemoList = (state.memoList || []).filter((v, i) => {
        return v.id !== action.ID;
      });
      storage.save({
        key: 'memoList',
        data: newMemoList
      });
      return {
        ...state,
        memoList: newMemoList
      }

    default :
      return state;
  }

}