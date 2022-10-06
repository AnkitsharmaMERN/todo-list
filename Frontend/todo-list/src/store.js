import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { taskReducer,taskDetailsReducer,taskRemoveReducer} from "./component/react-redux/taskReducer";
import { registration, loginReducer, getuserdetails,  } from "./component/react-redux/userReducer"


const rootReducer = combineReducers({
    task: taskReducer,
    taskdetails:taskDetailsReducer,
    taskremove:taskRemoveReducer,
    login: loginReducer,
    signup: registration,
    profile: getuserdetails,
   
})


let initialState = {};
const middleware = [thunk]

const store = createStore(
    rootReducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware))

);



export default store;
