import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {CatView} from './../container/index';

class App extends Component {

    componentDidMount() {
        window.addEventListener('resize', this.props.resizeScreen, false);
        document.body.addEventListener('click', this.props.click, false);
    }

    render() {
        return <div>
            <CatView />
            {this.props.children}
        </div>;
    }

}

App.propTypes = {
    resizeScreen: PropTypes.func.isRequired,
    click: PropTypes.func.isRequired
};

export default connect(
    null,
    {...actions}
)(App);
