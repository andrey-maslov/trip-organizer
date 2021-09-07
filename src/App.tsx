import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import './index.scss';
import Layout from './components/Layout/Layout';
import { Provider } from 'react-redux';

import store from '../src/store';
import AppRouter from './components/AppRouter/AppRouter';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ToastProvider>
                <BrowserRouter>
                    <Layout>
                        <AppRouter />
                    </Layout>
                    {/*<Modals />*/}
                </BrowserRouter>
            </ToastProvider>
        </Provider>
    );
};

export default App;
