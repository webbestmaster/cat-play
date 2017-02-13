import React, {Component} from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import {Home} from './container';
import {App} from './component';

export default class AppRouter extends Component {

    render() {
        return <Router history={this.props.history}>
            <Route path="/" component={App}>

                <IndexRoute component={Home}/>

            </Route>
        </Router>;
    }

}
