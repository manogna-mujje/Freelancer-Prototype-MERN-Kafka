import { withRouter } from 'react-router-dom';
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://18.144.51.236:3001';

var url;

export const validateSignup = function (email, username, password, object){
  console.log(`API: ${api}`);
    url = `${api}/signup`;
    fetch(url, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                  email: email,
                  username: username,
                  password: password
              })
            })
            .then(res => {
                console.log(res);
                if(res.status === 200){
                    object.setState({
                        signedUp: true,
                        message: 'Signup successful'
                    })
                } else if (res.status === 400){
                    object.setState({
                        signedUp: false,
                        message: 'Username already exists.'
                    })
                }
      }); 
      return true;   
  };

  export const validateLogin = function (username, password){
      console.log(`API-username: ${username}`);
      console.log(`API-password: ${password}`);
        url = `${api}/login`;
        return fetch(url, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }, 
              credentials: 'include',
              body: JSON.stringify({
                  username: username,
                  password: password
              })
            })
  };

  export const validateUsername = function (username){
    url = `${api}/validateUsername`;
    fetch(url, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                  username: username
              })
            })
            .then(res => {
                console.log(res);
                if(res.status === 200){
                    document.getElementById("username-message").style.display= "none";
                    document.getElementById("id-username").style.border= "2px solid green";
                    document.getElementById('username-message').innerHTML = '';
                } else if (res.status === 400){
                    document.getElementById("username-message").style.display= "block";
                    document.getElementById('username-message').innerHTML = 'This username already exists, please choose another';
                }
            }); 
};


export const profile = function (){
    url = `${api}/profile`;
    return fetch(url, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: 'include'
            })
};

export const logout = function (){
    url = `${api}/logout`;
    return fetch(url, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: 'include'
            })
};

export const checkSession = function (){
    url = `${api}/checkSession`;
    return fetch(url, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: 'include'
            })
};

export const postProject = function (title, description, skills, budget){
    // console.log('Project owner: ' + owner);
    url = `${api}/postProject`;
    return fetch(url, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                title, 
                description, 
                skills, 
                budget
              })
            }) 
  };


  export const postBid = function (project, bidAmount, employer, freelancerEmail){
    console.log(employer);
    url = `${api}/postBid`;
    return fetch(url, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                project,
                bidAmount, 
                employer,
                freelancerEmail
              })
            }) 
  };

  export const showBids = function (project){
    url = `${api}/showBids`;
    console.log('Frontend API');
    return fetch(url, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                project: project
              })
            }) 
  };

   /* Show Project Details */
  export const showProjectDetails = function (project){
    url = `${api}/showProjectDetails`;
    return fetch(url, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                project: project
              })
            }) 
  };

  /* Show all Projects */
  export const showProjects = function (){
    url = `${api}/showProjects`;
    return fetch(url, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: 'include'
            }) 
  };

  /* Update User Profile */
  export const updateProfile = function (firstname, lastname, country, location, phone ){
    url = `${api}/updateProfile`;
    return fetch(url, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                firstName: firstname,
                lastName: lastname,
                country: country,
                location: location,
                phone: phone
              })
            })
};

/* Upload an image */
export const upload = function (data){
  url = `${api}/upload`;
  return fetch(url, {
            method: 'POST',
            body: data,
            credentials: 'include'
          }) 
};

/* Hire a freelancer */
export const hireFreelancer = function (project, freelancer, bidAmount, bidderEmail){
  url = `${api}/hireFreelancer`;
  return fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              project, freelancer, bidAmount, bidderEmail
            })
          })
};

/* Credit Account */
export const creditAccount = function (amount){
  url = `${api}/creditAccount`;
  return fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
               amount
            })
          })
};

/* Make Payment */
export const makePayment = function (project, freelancer, amount){
  url = `${api}/makePayment`;
  return fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              project, freelancer, amount
            })
          })
};

// /* View Transaction Details */
// export const viewTransactionHistory = function (project, employer){
//   url = `${api}/viewTransactionHistory`;
//   return fetch(url, {
//             method: 'POST',
//             headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json',
//             },
//             credentials: 'include',
//             body: JSON.stringify({
//               project, employer
//             })
//           });
// };

/* Withdraw amount */

export const debitAmount = function (amount){
  url = `${api}/debitAmount`;
  return fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              amount
            })
          })
};

/* View Transaction History */

export const viewTransactionHistory = function (){
  url = `${api}/viewTransactionHistory`;
  return fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          })
};

export const myProjects = function (){
  url = `${api}/myProjects`;
  return fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          })
};

export const myBids = function (){
  url = `${api}/myBids`;
  return fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          })
};