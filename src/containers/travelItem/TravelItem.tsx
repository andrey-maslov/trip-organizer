import React from 'react';
import { useParams } from 'react-router-dom';

const TravelItem = () => {
    let { id, slug } = useParams<{ id: string | any; slug: any }>();

    console.log('sdfdsfdsf');

    return <div>{slug}</div>;
};

export default TravelItem;
