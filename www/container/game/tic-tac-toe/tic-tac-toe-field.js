import React, {Component, PropTypes} from 'react';
import BaseView from '../../../core/Base-view';
import CONST from './tic-tac-toe-const';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {TimelineLite, Back} from "gsap";
import appConst from '../../../const';

const CONST_empty = CONST.empty;
const CONST_X = CONST.X;
const CONST_O = CONST.O;

class TicTacToeFieldView extends BaseView {

    getCellSize() {
        const {width, height} = this.props.screen;
        return Math.round(Math.min(width, height) / 4);
    }

    renderRow(indexOfRow) {

        const view = this;
        const model = view.props.model;
        const field = model.get(CONST.field.object);
        const cellSize = view.getCellSize();
        const td = [];
        const src = require('./img/empty.svg');

        field.forEach((column, x) => {
            column.forEach((cell, y) => {
                if (y !== indexOfRow) {
                    return;
                }

                td.push(
                    <div ref={coordinatesToRef(x, y)} className="tic-tac-toe__cell" key={x + '-' + y}
                         onClick={() => {

                             const wasClick = model.onClickIn(x, y);

                             if (!wasClick) {
                                 return;
                             }

                             model.nextTurn();

                         }} style={{width: cellSize + 'px', height: cellSize + 'px'}}>
                        <img className="tic-tac-toe__cell-content" src={src} alt={cell}/>
                        {(cell === CONST_X || cell === CONST_O) &&
                        <div dangerouslySetInnerHTML={{__html: require('./img/' + cell.toLowerCase() + '.svg.raw')}}/>}
                    </div>
                )
            });

        });

        return td;

    }

    componentDidUpdate(prevProps, prevState) {

        const view = this;

        if (view.props.newDrawing.weapon) {
            const {x, y, weapon} = view.props.newDrawing;
            view.animateWeaponAppearing(x, y, weapon);
        }

    }

    animateWeaponAppearing(x, y, weapon) {

        const view = this;

        const cell = view.refs[coordinatesToRef(x, y)];

        // cell.innerHTML += require('./img/' + weapon.toLowerCase() + '.svg.raw');

    }

    componentDidMount() {

        const view = this;
        const model = view.props.model;

        const refs = view.refs;

        const score1 = refs.score1;
        const score2 = refs.score2;
        const field = refs.field;

        const tweenTime = appConst.tween.time;

        const tl = new TimelineLite();

        model.set(CONST.model.isOnClickEnabled.key, CONST.model.isOnClickEnabled.disabled);

        tl
            .set(score1, {x: '-30%', alpha: 0})
            .set(score2, {x: '30%', alpha: 0})
            .set(field, {y: '30%', alpha: 0})
            .to([score1, score2, field], tweenTime * 4, {
                delay: 0.1,
                x: '0%',
                y: '0%',
                alpha: 1,
                ease: Back.easeOut.config(1.4)
            })
            .call(() => {
                tl.kill();
                model.set(CONST.model.isOnClickEnabled.key, CONST.model.isOnClickEnabled.enabled);
                model.startGame();
            });

    }

    render() {

        const view = this;
        const model = view.props.model;
        const cellSize = view.getCellSize();
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
                width: cellSize * 3 + 'px',
                height: cellSize * 3 + 'px'
            }}>
                {field[0].map((cell, i) => view.renderRow(i))}
            </div>
        </div>;

    }

}

function coordinatesToRef(x, y) {
    return 'cell_' + x + '-' + y;
}


TicTacToeFieldView.propTypes = {
    screen: PropTypes.object.isRequired
};

export default connect(
    state => ({
        screen: state.screen,
        newDrawing: state.ticTacToeReducer.newDrawing
    }),
    {}
)(withRouter(TicTacToeFieldView));
