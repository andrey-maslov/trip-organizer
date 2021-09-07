import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, isAuthorized, ...rest }: any) => (
    <Route
        {...rest}
        render={props => (isAuthorized ? <Component {...props} /> : <Redirect to="/login" />)}
    />
);
