import {createStore,applyMiddleware,combineReducers,compose} from 'redux'
import thunk from 'redux-thunk'
import datareducer from './reducers/datareducer'
import uireducer from './reducers/uireducer'
import userreducer from './reducers/userreducer'

const reducers=combineReducers({
    user:userreducer,
    data:datareducer,
    UI:uireducer
})
const initials={}

const middleware=[thunk]

const store=createStore(reducers,
    initials,compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store