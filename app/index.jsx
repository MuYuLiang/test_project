import React from 'react';
import "babel-polyfill";
import { render } from 'react-dom';
import { Router,useRouterHistory} from 'react-router';
import { createHashHistory } from 'history';
import routes from './config/routes';

const history = useRouterHistory(createHashHistory)({ queryKey: false }) ;

render(
    <Router  history={history} routes={routes} />,
    document.getElementById('content')
);
