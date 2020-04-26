import { combineReducers } from 'redux';
import fileReducer from './fileReducer';

const rootReducer = combineReducers({
    files: fileReducer
});

export default rootReducer;