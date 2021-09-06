import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, auth, ...rest }: any) => (
    <Route
        {...rest}
        render={props =>
            auth
                ? <Component {...props} />
                : <Redirect to="/login" />
        }
    />
);
