import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from '../containers/App.jsx';
import IndexContainer from '../containers/IndexContainer/IndexContainer.jsx';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={IndexContainer}/>
    </Route>
);
