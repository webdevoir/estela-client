import * as Actions from '../actions'

const login = (state = {login: false}, action) => {
	switch (action.type) {
		case Actions.FAILED_LOGIN:
			return {
				login: "failed"
			};
		case Actions.SUCCESS_LOGIN:
			return {
				login: 'ok',
				boat: action.data.boat,
				clubs: action.data.clubs,
			};
		case Actions.ON_LOGIN:
			return {
				login: 'on'
			};
		default:
			return state
	}
}

export default login