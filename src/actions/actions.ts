import { SET_AUTH } from './actionTypes';
import { ISetAuth } from '../reducers/user/types';

export const setUser = (data: boolean) => (dispatch: any) => {
    dispatch({ type: SET_AUTH, payload: data });
};
