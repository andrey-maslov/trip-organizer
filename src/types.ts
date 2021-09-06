import React from 'react';

export type RouteType = {
    path: string;
    title: string;
    component: React.FunctionComponent;
};

export interface ITravelCard {
    id?: string;
    slug?: string;
    name: string;
    summary: string;
    image?: string;
    dateFrom?: string;
    dateTo?: string;
    destination?: string;
    countries?: string[];
    places?: string[];
    travellersCount?: number;
}
