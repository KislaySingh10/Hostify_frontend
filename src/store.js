import {createStore , applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import { userRegisterReducer, userSignInReducer} from './reducers/userReducer'
import { userDetailReducer } from './reducers/infoReducer'

const reducer=combineReducers({
    userSign: userSignInReducer,
    userRegister: userRegisterReducer,
    userDetail:userDetailReducer
})

const store=createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store