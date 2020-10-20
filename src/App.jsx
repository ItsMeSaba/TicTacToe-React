import React, {useState} from 'react'
import './app.css';

function Square(props) {
    return (
        <div onClick={props.onclick} >
            {props.value}
        </div>
    )
}

function Board() {

    let [list, setList] = useState(Array(9).fill(null));
    let [turnX, setTurn] = useState(true);
    let [freeSpots, setFreeSpots] = useState(9);
    let [winner, setWinner] = useState(null);

    let win = [
        "012",
        "345",
        "678",
        "036",
        "147",
        "258",
        "048",
        "246"
    ];

    function restartGame() {
        setList(Array(9).fill(null));
        setTurn(true);
        setFreeSpots(9);
        setWinner(null);
    }
    
    function handleClick(i) {
        if(list[i] != null) return false;

        let turn = turnX ? 'X' : 'O'; 

        list[i] = turn;
        
        setList(list);
        setTurn(!turnX);
        setFreeSpots(--freeSpots);

        checkEndGame(turn);
    }

    function checkEndGame(player) {
        main : for(let i = 0; i < win.length; i++) {
            for(let a = 0; a < 3; a++) {
                if(list[win[i][a]] !== player) continue main;
            }

            console.log('WON')
            setWinner(<p>{player} Won</p>)

            return true;
        }

        if(freeSpots === 0) setWinner(<p>Draw</p>) 
    }

    return (
        <React.Fragment>
            <div className="endScreen" onClick={restartGame} style={ {display : winner ? 'flex' : 'none'} }>{winner}</div>
            <p>{ turnX ? 'X' : 'O' }-s Turn</p>
            <div className="board">
                { list.map((x, index) => <Square key={index} value={x} onclick={() => handleClick(index)} />) }
            </div>
        </React.Fragment>
    )
}



export default Board;