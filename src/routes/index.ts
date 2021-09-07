import { RouteType } from '../types';
import Schedule from '../containers/schedule/Schedule';
import Travels from '../containers/travels/Travels';
import Profile from '../containers/profile/Profile';
import Login from '../containers/login/Login';

export const privateRoutes: Array<RouteType> = [
    { path: '/schedule', exact: true, title: 'Schedule', component: Schedule },
    { path: '/travels', exact: true, title: 'Travels', component: Travels },
    { path: '/profile', exact: true, title: 'Profile', component: Profile },
];

export const publicRoutes: Array<RouteType> = [
    { path: '/login', exact: true, title: 'Login', component: Login },
    { path: '/registration', exact: true, title: 'Registration', component: Login },
    // { path: '/access-recovery', exact: true, title: 'Access Recovery', component: Login },
];
