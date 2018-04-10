export default function (state = {}, action) {
      switch (action.type) {
        case 'PROJECT_DETAILS_CLICK_FULFILLED':
        console.log('PROJECT_DETAILS_CLICK_FULFILLED');
        return {
            list: action.payload.list
        }
        default:
          return state;
      };
    }