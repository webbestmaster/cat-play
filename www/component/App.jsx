import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
// import {CatView} from './../container/index';

class App extends Component {

    componentDidMount() {
        window.addEventListener('resize', this.props.resizeScreen, false);
        document.body.addEventListener('click', this.props.click, false);
    }

    render() {
        const props = this.props;
        const {width, height} = props.screen;
        return <div style={{width: width + 'px', height: height + 'px'}}>
            {props.children}
            {/*<CatView />*/}
        </div>;
    }

}

App.propTypes = {
    resizeScreen: PropTypes.func.isRequired,
    click: PropTypes.func.isRequired,
    screen: PropTypes.object.isRequired
};

export default connect(
    state => ({
        screen: state.screen
    }),
    {...actions}
)(App);
