import React, {Component} from 'react';
import {Link} from 'react-router';
import BaseView from '../core/Base-view';

export default class HomeView extends BaseView {

    render() {
        return <div>
            <h1>Home view</h1>

            <Link to="/game/tic-tac-toe">to tic tac toe</Link>

        </div>;
    }

}


