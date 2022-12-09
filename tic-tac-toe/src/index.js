import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props){
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
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    // squares[i] = this.state.xIsNext ? 'X' : 'O';
    // this.setState({
    //   squares: squares,
    //   xIsNext: !this.state.xIsNext,
    // });
    if(calaulateWinner(squares)){return;}
    if ((squares[i] === 'X') || squares[i] === 'O') {
      console.log("You clicked this square before, the current value is: " + squares[i])
    } else if(this.state.xIsNext === false){
      squares[i] = 'O';
      this.setState({ squares: squares, xIsNext: true });
    }else{
      squares[i] = 'X';
      this.setState({ squares: squares, xIsNext: false });
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    const winner = calaulateWinner(this.state.squares);
    
    if(winner){
      status = "The Winner is: " + winner;
    }

    return (
      <div>
        <div className='status'>{status}</div>
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
  render() {
    return (
      <div className='game'>
        <div className='game-board'>
          <Board />
        </div>
        <div className='game-info'>
          <div>{
            <h1>Wekcome to my Tic-Tac-Toe</h1>
          }</div>
          <ol>{'you will have in the right of the board every step that you make this far'}</ol>
        </div>
      </div>
    );
  }
}

function calaulateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for(let i = 0; i < lines.length; ++i){
    const [a,b,c] = lines[i];
    if(squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c])){
      return squares[a]
    }
  }

  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);