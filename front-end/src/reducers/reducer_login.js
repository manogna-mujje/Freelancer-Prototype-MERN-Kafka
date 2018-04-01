
// export default function (state={}, action) {
//     switch (action.type){
//         case 'LOGIN_ACCOUNT':
//            return {output: promOutput(action.payload, action.object, action.username)};
//         default:
//             return {output: ""};
//     }
// }

// const promOutput = (prom, obj, usr) => {
//     prom.then((res) => {
//         if (res.status === 200){
//             obj.props.history.push({
//                     pathname: '/profile/' + usr,
//                     state: {
//                         username: usr
//                     }
//             })
//         }
//         else 
//         document.getElementById("error-message").style.display = "block";
//     });
// }
  

export default function (state = {}, action) {
    switch (action.type) {
      case 'LOGIN_ACCOUNT_PENDING':
      console.log('In switch case pending');
        return {
          isPending: true
        };
  
      case 'LOGIN_ACCOUNT_FULFILLED':
        console.log('In switch case fulfilled');
        return {
            isFulfilled: true,
            data: action.payload,
            username: action.meta.user
        };
    
     case 'LOGIN_ACCOUNT_REJECTED':
     console.log('In switch case rejected');
        return {
            isFulfilled: false,
            error: action.payload
        };
  
      default:
        return state;
    };
  }

