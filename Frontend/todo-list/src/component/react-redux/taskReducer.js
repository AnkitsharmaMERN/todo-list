import {
    Get_task_Request, Get_task_Success, Get_task_Fail,
    Get_task_Details_Request, Get_task_Details_Success, Get_task_Details_Fail,
    Get_task_Remove_Request,Get_task_Remove_Success,Get_task_Remove_Fail
     
} from "./constant";




// all task reducer 
export const taskReducer = (state = { task: [] }, action) => {
    switch (action.type) {
        case Get_task_Request:
            return {
                loading: true,

            };
        case Get_task_Success:
            return {
                loading: false,
                task: action.payload
            };
        case Get_task_Fail:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

//  task details reducer 

export const taskDetailsReducer = (state = { task: {} }, action) => {
    switch (action.type) {
        case Get_task_Details_Request:
            return {
                loading: true,
                ...state
            };
        case Get_task_Details_Success:
            return {
                loading: false,
                task: action.payload
            }
        case Get_task_Details_Fail:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }

}


export const taskRemoveReducer = (state = { removeproduct: {} }, action) => {
    switch (action.type) {
        case Get_task_Remove_Request:
            return {
                loading: true,
                ...state
            };
        case Get_task_Remove_Success:
            return {
                loading: false,
                removeproduct: action.payload
            }
        case Get_task_Remove_Fail:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }

}
