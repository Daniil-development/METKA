import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Redirect, Route, Switch} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {ADMIN_ROUTE, INDEX_ROUTE, USER_ROUTE} from "../utils/consts";

const AccountMenu = observer( () => {
    const {user} = useContext(Context);
    return (
        <div id="account-menu" className="account_block-close">
            <Switch>
                {user.isAuth === true && user.isAdmin === true && adminRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
                )}
                {user.isAuth === true && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
                )}
                {user.isAuth === true && user.isAdmin === true && localStorage.getItem('token') !== null && <Redirect to={ADMIN_ROUTE}/>
                }
                {user.isAuth === true && localStorage.getItem('token') !== null && <Redirect to={USER_ROUTE}/>
                }
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
                )}
                <Redirect to={INDEX_ROUTE}/>
            </Switch>
        </div>
    );
}
);

export default AccountMenu;