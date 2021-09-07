import { loadState } from '../../store/sessionStorage';
import { ISetAuth, IUserState, UserAction } from './types';
import { SET_AUTH } from '../../actions/actionTypes';

// let STATE = loadState('userData')

const STATE: IUserState = {
    firstName: null,
    lastName: null,
    email: null,
    isAuthorized: true,
};

export const user = (state = STATE, action: UserAction): IUserState => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuthorized: action.payload,
            };
        default:
            return state;
    }
};
