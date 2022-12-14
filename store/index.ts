import {applyMiddleware, createStore} from "redux";
import {rootReducer} from './store'
import rootSaga from './saga'
import {HYDRATE, createWrapper} from "next-redux-wrapper";
import createSagaMiddleware from 'redux-saga';

const bindMiddleware = (middleware: any) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const masterReducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        return nextState;
    } else {
        return rootReducer(state, action);
    }
}

const initStore = () => {
    const sagaMiddleware = createSagaMiddleware()
    const store:any = createStore(masterReducer, bindMiddleware([sagaMiddleware]))
    store.sagaTask = sagaMiddleware.run(rootSaga)
    return store
}

export const wrapper = createWrapper(initStore, { debug: true })