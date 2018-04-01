export default function (state = {}, action) {
    switch (action.type) {
      case 'CHECK_SESSION_FULFILLED':
        if(typeof action.payload.user !== "undefined"){
          return {
            isLoggedin: true,
            user: action.payload.user
          };
        }
        else if (typeof action.payload.error !== "undefined"){
          return {
            isLoggedin: false,
            user: ""
          };
        }
      default:
        return state;
    };
  }