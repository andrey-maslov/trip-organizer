import React, { useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Hidden,
    ListItemIcon,
    ListItemText,
    ListItem,
    MenuItem,
    Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import style from './layout.module.scss';
import { getPageMeta } from '../../helpers/utils';
import ErrorPage from '../../containers/404/404';
import { privateRoutes, publicRoutes } from '../../routes';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setUser } from '../../actions/actions';
import { useDispatch } from 'react-redux';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawerPaper: {
            width: drawerWidth,
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        title: {
            flexGrow: 1,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

type LayoutType = {
    children: any;
    window?: () => Window;
};

const Layout: React.FC<LayoutType> = ({ children, window, ...props }) => {
    const { pathname } = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();

    const { isAuthorized } = useTypedSelector(state => state.user);

    const routes = isAuthorized ? privateRoutes : publicRoutes;

    const pageMeta = getPageMeta(routes, pathname.includes('/travels/') ? '/travels' : pathname);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    useEffect(() => {
        setMobileOpen(false);
        if (pathname === '/') {
            history.push('/schedule');
        }
    }, [pathname]);

    const logout = () => {
        dispatch(setUser(false));
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    if (!pageMeta) {
        return <ErrorPage />;
    }

    const drawer = (
        <div>
            <div className={classes.toolbar}>some title</div>
            <Divider />
            <List>
                {routes.map(({ title, path }, index) => (
                    <MenuItem
                        component={Link}
                        to={path}
                        selected={pathname.includes(path)}
                        key={title}
                    >
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={title} />
                    </MenuItem>
                ))}
            </List>
            {isAuthorized && (
                <>
                    <Divider />
                    <List>
                        <ListItem button onClick={logout}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </>
            )}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={clsx(style.wrapper, 'app-wrapper')}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/*Mobile menu*/}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{ paper: classes.drawerPaper }}
                            ModalProps={{ keepMounted: true }} // Better open performance on mobile.
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>

                    {/*page title*/}
                    <Typography className={classes.title} variant="h6" noWrap>
                        {pageMeta.title}
                    </Typography>

                    {/*Main menu*/}
                    <Hidden xsDown implementation="css">
                        <nav>
                            <Grid container spacing={2}>
                                {routes.map(({ title, path }) => (
                                    <MenuItem
                                        selected={pathname.includes(path)}
                                        component={Link}
                                        to={path}
                                        key={title}
                                    >
                                        <ListItemText primary={title} />
                                    </MenuItem>
                                ))}
                            </Grid>
                        </nav>
                    </Hidden>
                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
};

export default Layout;
