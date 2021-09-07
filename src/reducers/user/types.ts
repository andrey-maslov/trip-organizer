import { SET_AUTH } from '../../actions/actionTypes';

export interface IUserState {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    isAuthorized: boolean;
}

export interface ISetAuth {
    type: typeof SET_AUTH;
    payload: boolean;
}

export type UserAction = ISetAuth;
