import {combineReducers} from "redux";
import calculator from './calculator/reducer'
// import user from './user/reducer'
// import calculator from './calculator/reducer'
// import payment from './payment/reducer'
// import alert from './alert/reducer'

export const rootReducer = combineReducers({
    calculator,
    // user,
    // calculator,
    // payment,
    // alert,
})