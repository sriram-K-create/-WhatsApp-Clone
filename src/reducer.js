export const initialState = {
    user : null,
};

export const actionTypes = {
    SET_USER :"SET_USER",
}

const reducer = (state , action) =>{
    console.log("this is tha action : " ,action);
    console.log( "this is the state : ", state);
    if(action.type === actionTypes.SET_USER){
        return {
            ...state,
            user :action.user,
        };
    }

    else{
        return state;
    }
}

export default reducer;
