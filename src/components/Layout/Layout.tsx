import React, { ReactChildren, ReactPortal, useState, useEffect } from 'react';
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
    Tabs,
    Button,
    Tab,
    MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { ROUTES } from '../../App';

import style from './layout.module.scss';
import { getPageMeta } from '../../helpers/utils';
import ErrorPage from '../../containers/404/404';

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
    const pathToTabs = ['/schedule', '/travels', '/profile'].includes(pathname) ? pathname : null;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [value, setValue] = useState(pathname === '/' ? '/schedule' : pathToTabs);
    const [pageMeta, setPageMeta] = useState(getPageMeta(ROUTES, pathname));

    useEffect(() => {
        setMobileOpen(false);
        setPageMeta(getPageMeta(ROUTES, pathname));
        if (pathname === '/') {
            history.push('/schedule');
        }
    }, [pathname]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    if (!pageMeta || !value) {
        return <ErrorPage />;
    }

    const drawer = (
        <div>
            <div className={classes.toolbar}>some title</div>
            <Divider />
            <List>
                {ROUTES.map(({ title, path }, index) => (
                    <MenuItem component={Link} to={path} key={title}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={title} />
                    </MenuItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                </ListItem>
            </List>
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

                    <Typography className={classes.title} variant="h6" noWrap>
                        {pageMeta.title}
                    </Typography>

                    {/*Main menu*/}
                    <Hidden xsDown implementation="css">
                        <nav>
                            <Tabs value={value} onChange={handleChange} aria-label="navigation">
                                {ROUTES.map(({ title, path }) => (
                                    <Tab
                                        component={Link}
                                        value={path}
                                        label={title}
                                        to={path}
                                        color="inherit"
                                        key={title}
                                    />
                                ))}
                            </Tabs>
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
