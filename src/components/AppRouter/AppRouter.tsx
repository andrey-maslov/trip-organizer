import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../routes';
import TravelItem from '../../containers/travelItem/TravelItem';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const AppRouter = () => {
    const { isAuthorized } = useTypedSelector(state => state.user);

    return isAuthorized ? (
        <Switch>
            {privateRoutes.map(({ path, exact, title, component }) => (
                <Route exact={exact} path={path} key={title} component={component} />
            ))}
            <Route exact path="/travels/:slug" component={TravelItem} />
        </Switch>
    ) : (
        <Switch>
            {publicRoutes.map(({ path, exact, title, component }) => (
                <Route exact={exact} path={path} key={title} component={component} />
            ))}
            <Redirect to={'/login'} />
        </Switch>
    );
};

export default AppRouter;
