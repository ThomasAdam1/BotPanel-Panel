import { combineReducers } from 'redux';
import auth_reducer from './auth_reducer';
import data_reducer from './data_reducer';

// import authReducer from "./authReducer";
// import dataReducer from "./dataReducer";
// import userReducer from "./userReducer";

export default combineReducers({
    auth: auth_reducer,
    data: data_reducer
    // page:pageReducer,
    // auth: authReducer,
    // data: dataReducer,
    // user: userReducer
    // notifications:notificationReducer,
    // quick_start:quickStartReducer,
    // builder:builderReducer
    //     id:idReducer,
    //     data:dataReducer,
    //     auth:authReducer
});
