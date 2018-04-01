const initialState = {};

export default function (initialState, action) {
    switch (action.type){
        case 'CLICK_EMAIL':
            if (action.data == '')
                return "Please enter an email address.";
            else if(!validateEmail(action.data))
                return "Please enter a valid email address.";
            else 
                document.getElementById("email-message").style.display= "none";
                document.getElementById("id-email").style.border= "2px solid green";
                return "";
        default:
            return "";
    }
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
