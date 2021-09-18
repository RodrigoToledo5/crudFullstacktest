import reducerLog from './reducerLog';
import reducerPost from './reducersPost';
import { combineReducers } from 'redux';

const rootReducer=combineReducers({reducerLog,reducerPost})

export default rootReducer;