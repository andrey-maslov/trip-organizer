import React, { useState, useEffect } from 'react';
import { CircularIndeterminate } from '../../components/Loading/Loading';
import { travelsList } from './data';
import TravelCard from './TravelCard/TravelCard';
import { ITravelCard } from '../../types';
import { Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        marginBottom: 20,
    },
});

const Travels = () => {
    const [loading, setLoading] = useState(true);
    const [travels, setTravels] = useState<Array<ITravelCard>>([]);
    const classes = useStyles();

    useEffect(() => {
        setTimeout(() => {
            if (travelsList && travelsList.length) {
                setTravels(travelsList);
                setLoading(false);
            }
        }, 2300);
    }, [travelsList]);

    return (
        <div>
            <Container maxWidth="lg">
                {loading ? (
                    <CircularIndeterminate />
                ) : (
                    <div>
                        <Typography gutterBottom variant="h5" component="h2">
                            List of my travels
                        </Typography>
                        <Grid container spacing={1}>
                            {travels.map(({ id, slug, name, summary, image }) => {
                                return (
                                    <Grid item xs={4} className={classes.card} key={slug}>
                                        <TravelCard
                                            id={id}
                                            name={name}
                                            summary={summary}
                                            image={image}
                                            slug={slug}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Travels;
