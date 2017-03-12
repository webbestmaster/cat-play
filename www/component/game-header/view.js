import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class GameHeader extends Component {

    render() {
        return <div>
            <div>back button</div>
            <h1>game header</h1>


        </div>;
    }

}

/*
App.propTypes = {
    resizeScreen: PropTypes.func.isRequired,
    click: PropTypes.func.isRequired,
    screen: PropTypes.object.isRequired
};
*/

export default connect(
    state => ({
        // screen: state.screen
    }),
    null
    // {...actions}
)(GameHeader);
