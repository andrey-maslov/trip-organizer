import React from 'react';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { ITravelCard } from '../../../types';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const TravelCard: React.FC<ITravelCard> = ({ name, slug, summary, image }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia className={classes.media} image={`./img/${image}`} title={name} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {summary}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button component={Link} to={`travels/${slug}`} size="small" color="primary">
                    Go to
                </Button>
            </CardActions>
        </Card>
    );
};

export default TravelCard;
