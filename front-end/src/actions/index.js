import * as API from '../APIs/api';

export const clickEmail=(data) => {
	return {
		type: 'CLICK_EMAIL',
		data
	}
		
}

export const clickPassword = (data) =>  {
	return {
		type: 'CLICK_PASSWORD',
		data
	}
		
}

export const clickUsername = (data) => {
	return {
		type: 'CLICK_USERNAME',
		data
	}
}


export const createAccount = () => {
	return {
		type: 'CREATE_ACCOUNT'
	}
}
  

export const loginAccount = (username, password) => ({
	type: 'LOGIN_ACCOUNT',
	meta: {user: username},
	payload: new Promise(resolve => {
	  setTimeout(() => API.validateLogin(username, password).then(response => {
		resolve(response.status);
	  }), 500);
	})
});

export const checkSession = () => ({
	type: 'CHECK_SESSION',
	payload: new Promise((resolve, reject) => {
	  API.checkSession().then(response => {
			resolve(response.json());
			}).catch((err) => {
				reject(err);
			})
	})
});

export const bidsTabClick = (project) => ({
	type: 'BIDS_CLICK',
	payload: new Promise((resolve, reject) => {
		API.showBids(project).then(response => {
			console.log('resolving response');
			  resolve(response.json());
			  }).catch((err) => {
				  reject(err);
			  })
	  })
});

export const detailsTabClick = (project) => ({
	type: 'PROJECT_DETAILS_CLICK',
	payload: new Promise((resolve, reject) => {
		API.showProjectDetails(project).then(response => {
			console.log('resolving response');
			  resolve(response.json());
			  }).catch((err) => {
				  reject(err);
			  })
	  })
});