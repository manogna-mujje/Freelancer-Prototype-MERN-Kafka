export default function (state = {}, action) {
    console.log('reducer_bid')
      switch (action.type) {
        case 'PROJECT_DETAILS_CLICK_FULFILLED':
        console.log('switch');
        console.log('PROJECT_DETAILS_CLICK_FULFILLED');
        return {
            list: action.payload.list
        }
        default:
          return state;
      };
    }