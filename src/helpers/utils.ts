import { RouteType } from '../types';

export const getPageMeta = (routes: Array<RouteType>, pathname: string): RouteType | null => {
    const metaList = routes.filter(route => pathname === route.path);
    return metaList.length ? metaList[0] : null;
};
