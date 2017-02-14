import React, {Component, PropTypes} from 'react';
import {resizeScreen} from '../actions';
import {connect} from 'react-redux';
import {CatView} from './../container/index';

class App extends Component {

    componentDidMount() {
        window.addEventListener('resize', this.props.resizeScreen, false);
    }

    render() {
        return <div>
            <CatView />
            {this.props.children}
        </div>;
    }

}

App.propTypes = {
    resizeScreen: PropTypes.func.isRequired
};

export default connect(
    null,
    {resizeScreen}
)(App);
