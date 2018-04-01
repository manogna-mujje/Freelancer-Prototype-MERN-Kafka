import * as API from '../APIs/api';

const initialState = {};

export default function (initialState, action) {
    switch (action.type){
        case 'CLICK_USERNAME':
            console.log(typeof(action.data));
            if(action.data.length < 3 || action.data.length > 16)
                return "Username must be 3-16 characters.";
            if(action.data.length >= 3  && action.data.length <= 16)
                API.validateUsername(action.data);
                return "";
            return "default";

        default:
            return "";
    }
}