import {loginReducer} from './isLogged'
import {combineReducers} from 'redux'

export const allReducers = combineReducers({
    login: loginReducer
})
