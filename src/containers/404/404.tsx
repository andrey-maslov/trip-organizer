import React from 'react';
import style from './error-page.module.scss';
import { NavLink } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    return (
        <div className={`main section flex-centered ${style.wrapper}`}>
            <div className="container">
                <h1>Error 404. Page not found</h1>
                <div
                    className={style.content}
                    dangerouslySetInnerHTML={{
                        __html: 'You are on a page that does not exist. This is probably due to a typo or incorrect keyboard layout',
                    }}
                />
                <NavLink to="/" className="btn btn-outlined">
                    To main
                </NavLink>
            </div>
        </div>
    );
};

export default ErrorPage;
