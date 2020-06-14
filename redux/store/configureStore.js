import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from '../reducers/index';
import {createLogger} from "redux-logger";

const logger = createLogger();
const middlewares = [thunk, logger];

export default function configureStore() {
    return createStore(
        rootReducer, composeWithDevTools(applyMiddleware(...middlewares))
    );
}
