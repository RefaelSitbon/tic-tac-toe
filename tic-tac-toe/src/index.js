import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button
      className='square'
      onClick={() => {
        console.log('click on ' + props.value);
        props.onClick();
      }}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className='status'>{this.props.status}</div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length-1];
    const squares = current.squares.slice();

    // squares[i] = this.state.xIsNext ? 'X' : 'O';
    // this.setState({
    //   squares: squares,
    //   xIsNext: !this.state.xIsNext,
    // });
    if(calaulateWinner(squares)){return;}

    if ((squares[i] === 'X') || squares[i] === 'O') {
      console.log("You clicked this square before, the current value is: " + (this.state.xIsNext ? 'X' : 'O'))
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calaulateWinner(current.squares);
    let status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    if (winner) {
      status = "The Winner is: " + winner;
    }


    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{
            <h1>Wecome to my Tic-Tac-Toe</h1>
          }</div>
          <h2>{status}</h2>
          <ol>{'you will have in the right of the board every step that you make this far'}</ol>
        </div>
      </div>
    );
  }
}

function calaulateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; ++i) {
    const [a, b, c] = lines[i];
    if (squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
      return squares[a]
    }
  }

  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);