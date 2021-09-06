import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import './index.scss';
import Schedule from './containers/schedule/Schedule';
import Layout from './components/Layout/Layout';
import Profile from './containers/profile/Profile';
import Travels from './containers/travels/Travels';
import { RouteType } from './types';
import TravelItem from './containers/travelItem/TravelItem';

export const ROUTES: Array<RouteType> = [
    { path: '/schedule', title: 'Schedule', component: Schedule },
    { path: '/travels', title: 'Travels', component: Travels },
    { path: '/profile', title: 'Profile', component: Profile },
];

const App: React.FC = () => {
    return (
        <ToastProvider>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        {ROUTES.map(({ path, title, component }) => (
                            <Route exact path={path} key={title} component={component} />
                        ))}
                        <Route exact path="/travels/:slug" component={TravelItem} />
                    </Switch>
                </Layout>
                {/*<Modals />*/}
            </BrowserRouter>
        </ToastProvider>
    );

    function getPageClass(path: string): string {
        const pages: any = ROUTES;
        return pages[path] || 'page-404';
    }
};

export default App;
