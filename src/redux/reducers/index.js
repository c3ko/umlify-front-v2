import { combineReducers } from 'redux';
import fileReducer from './fileReducer';
import umlReducer from './UMLReducer';

const rootReducer = combineReducers({
    files: fileReducer,
    uml: umlReducer
});

export default rootReducer;