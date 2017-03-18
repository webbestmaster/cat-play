import React, {Component, PropTypes} from 'react';
import BaseView from '../../../core/Base-view';
// import TicTacToeModel from './tic-tac-toe-model';
import CONST from './tic-tac-toe-const';
// import PlayerModel from './player-model';
import {connect} from 'react-redux';
// import {setIsReadyToPlay} from './action';
// import GameHeader from './../../../component/game-header/view';
// import headerSetText from './../../../component/game-header/action/setText';
// import i18n from './../../../services/i18n';
// require.context('./img/', true, /\.svg$/);
import {withRouter} from 'react-router';
import {TimelineLite, Power2} from "gsap";
import appConst from '../../../const';

class TicTacToeFieldView extends BaseView {

    getCeilSize() {
        const {width, height} = this.props.screen;
        return Math.round(Math.min(width, height) / 4);
    }

    renderRow(indexOfRow) {

        const view = this;
        const model = view.props.model;
        const field = model.get(CONST.field.object);
        const ceilSize = view.getCeilSize();
        const td = [];

        field.forEach((column, x) => {
            column.forEach((ceil, y) => {
                if (y !== indexOfRow) {
                    return;
                }

                const src = require('./img/' + ceil.toLowerCase() + '.svg');

                td.push(
                    <div className="tic-tac-toe__ceil" key={x + '-' + y} onClick={() => {

                        const wasClick = model.onClickIn(x, y);

                        if (!wasClick) {
                            return;
                        }

                        model.nextTurn();

                        view.forceUpdate(function () {
                            console.log('force update callback');
                        });

                    }} style={{width: ceilSize + 'px', height: ceilSize + 'px'}}>
                        <img className="tic-tac-toe__ceil-content" src={src} alt={ceil}/>
                    </div>
                )
            });

        });

        return td;

    }

    componentDidMount() {

        const view = this;

        const refs = view.refs;

        const score1 = refs.score1;
        const score2 = refs.score2;
        const field = refs.field;

        const tweenTime = appConst.tween.time;

        const tl = new TimelineLite();

        tl
            .set(score1, {x: '-30%', alpha: 0})
            .set(score2, {x: '30%', alpha: 0})
            .set(field, {y: '30%', alpha: 0})
            .staggerTo([score1, score2, field], tweenTime * 5, {
                delay: 0.1,
                x: '0%',
                y: '0%',
                alpha: 1,
                ease: Elastic.easeOut.config(1, 0.3)
            }, tweenTime)
            .call(() => tl.kill());

    }

    render() {

        const view = this;
        const model = view.props.model;
        const ceilSize = view.getCeilSize();
        const field = model.get(CONST.field.object);
        const players = model.get(CONST.players.key);
        const player0 = players[0];
        const player1 = players[1];

        return <div>
            <div
                ref="score1"
                className="tic-tac-toe__score">
                <p className="tic-tac-toe__score-label">Player 1: {player0.get(CONST.player.weapon.key)}</p>
                <p className="tic-tac-toe__score-number">{player0.get(CONST.player.score.key)}</p>
            </div>
            <div
                ref="score2"
                className="tic-tac-toe__score">
                <p className="tic-tac-toe__score-label">Player 2: {player1.get(CONST.player.weapon.key)}</p>
                <p className="tic-tac-toe__score-number">{player1.get(CONST.player.score.key)}</p>
            </div>
            <div
                ref="field"
                className="tic-tac-toe__field" style={{
                width: ceilSize * 3 + 'px',
                height: ceilSize * 3 + 'px'
            }}>
                {field[0].map((ceil, i) => view.renderRow(i))}
            </div>
        </div>;

    }

}

TicTacToeFieldView.propTypes = {
    screen: PropTypes.object.isRequired
};

export default connect(
    state => ({
        screen: state.screen
        // isReadyToPlayReducer: state.ticTacToeReducer.isReadyToPlay
    }),
    {
        // setIsReadyToPlay,
        // headerSetText
    }
)(withRouter(TicTacToeFieldView));
