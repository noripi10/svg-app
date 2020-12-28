import { storage } from './Common';
import { getGuid } from '../Util/Common';

export const initState = {
  memoList: [],
}
export const reducer = (state, action) => {
  switch (action.TYPE){
    case 'ITEM_ADD' :
      const newMemoList = [
        ...state.memoList,
        {
          id: action.id,
          title: action.title,
          lastDate: new Date(),
          lines: action.lines,
        }
      ]
      storage.save({
        key: 'memoList',
        data: newMemoList
      });
      return {
        ...state,
        memoList: newMemoList
      }
    case 'DATA_INIT' :
      storage.save({
        key: 'memoList',
        data: action.memoList
      });
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
    default :
      storage.save({
        key: 'memoList',
        data: state.memoList
      });
      return state;
  }

}