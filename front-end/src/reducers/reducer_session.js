export default function (state = {}, action) {
    switch (action.type) {
      case 'CHECK_SESSION_FULFILLED':
        if(typeof action.payload.user !== "undefined"){
          console.log('LOGIN');
          console.log(action.payload.user);
          return {
            isLoggedin: true,
            user: action.payload.user
          };
        }
        else if (typeof action.payload.error !== "undefined"){
          console.log('NOT LOGIN');
          return {
            isLoggedin: false,
            user: ""
          };
        }
      default:
        return state;
    };
  }