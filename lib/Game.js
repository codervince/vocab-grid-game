import _ from "lodash";
import Row from "./Row";
import Cell from "./Cell";
import Footer from "./Footer";

import data2 from "./datastore/swiss"; //this is too slow  cache it

class Game extends React.Component {
  // extension to this game pushes id numbers but also Schweizerduutsch names to the grid
  constructor(props) {
    super(props);
    this.matrix = [];
    this.fronts = {};
    this.backs = {};
    this.data = _.shuffle(data2).slice();
    // let fpath = "./data/swiss.json";
    // this.data = readFile(fpath);
    //instantiate data from JSON
    for (let r = 0; r < this.props.rows; r++) {
      for (let c = 0; c < this.props.columns; c++) {
        let { front, back } = this.data.pop();

        back = _.truncate(back, { length: 60 });

        this.fronts[`${r}${c}`] = `${front}`;
        this.backs[`${r}${c}`] = `\n\n${back}`;
      }
    }
    // console.log("mydata"+ this.mydata);
    for (let r = 0; r < this.props.rows; r++) {
      let row = [];

      for (let c = 0; c < this.props.columns; c++) {
        row.push(`${r}${c}`);
      }
      this.matrix.push(row);
    }

    let flatMatrix = _.flatten(this.matrix);
    this.activeCells = _.sampleSize(flatMatrix, this.props.activeCellsCount);

    this.state = {
      gameState: "ready", //init state
      wrongGuesses: [],
      correctGuesses: []
    };
  }

  //using componentDidMount() set timers
  componentDidMount() {
    this.memorizeTimerId = setTimeout(() => {
      this.setState({ gameState: "memorize" }, () => {
        this.recallTimerId = setTimeout(
          () => this.setState({ gameState: "recall" }),
          2000
        );
      });
    }, 2000);
  }

  //version 2 gives players X seconds to finish game move () => this.setState( {gameState: 'recall'}
  componentDidMount() {
    this.memorizeTimerId = setTimeout(() => {
      this.setState({ gameState: "memorize" }, () => {
        this.recallTimerId = setTimeout(this.startRecallMode.bind(this), 2000);
      });
    }, 2000);
  }

  startRecallMode() {
    this.setState({ gameState: "recall" }, () => {
      this.secondsRemaining = this.props.timeoutSeconds;
      this.playTimerId = setInterval(() => {
        if (--this.secondsRemaining === 0) {
          this.setState({ gameState: this.finishGame("lost") });
        }
      }, 1000);
    });
  }

  componentWillUnmount() {
    clearTimeout(this.memorizeTimerId);
    clearTimeout(this.recallTimerId);
    this.finishGame();
  }

  recordGuess({ cellId, userGuessIsCorrect }) {
    let { wrongGuesses, correctGuesses, gameState } = this.state;
    if (userGuessIsCorrect) {
      correctGuesses.push(cellId);
      if (correctGuesses.length === this.props.activeCellsCount) {
        gameState = this.finishGame("won");
      }
    } else {
      wrongGuesses.push(cellId);
      if (wrongGuesses.length > this.props.allowedWrongAttempts) {
        gameState = this.finishGame("lost");
      }
    }
    this.setState({ correctGuesses, wrongGuesses, gameState });
  }

  finishGame(gameState) {
    clearInterval(this.playTimerId);
    return gameState;
  }

  // componentDidMount(){

  //   this.memorizeTimerId =  setTimeout(() => {
  //     this.setState({ gameState: 'memorize' }, () => {
  //        this.recallTimerId = setTimeout(this.setState({gameState:'recall'}), 2000);
  //     });
  //   }, 2000);

  // this.memorizeTimerId = setTimeout(() => {
  //   this.setState({ gameState: 'memorize' }, () => {
  //       this.recallTimerId = setTimeout(this.setState({gameState:'recall'}), 2000);
  //     // this.recallTimerId = setTimeout(this.startRecallMode.bind(this), 2000);
  //   });
  // }, 2000);

  // }

  componentWillUnmount() {
    clearTimeout(this.memorizeTimerId);
    clearTimeout(this.recallTimerId);
  }

  recordGuess({ cellId, userGuessIsCorrect }) {
    let { wrongGuesses, correctGuesses, gameState } = this.state;
    if (userGuessIsCorrect) {
      correctGuesses.push(cellId);
      if (correctGuesses.length === this.props.activeCellsCount) {
        gameState = this.finishGame("won");
      }
    } else {
      wrongGuesses.push(cellId);
      if (wrongGuesses.length > this.props.allowedWrongAttempts) {
        gameState = this.finishGame("lost");
      }
    }
    this.setState({ correctGuesses, wrongGuesses, gameState });
  }

  finishGame(gameState) {
    clearInterval(this.playTimerId);
    return gameState;
  }

  render() {
    let showActiveCells =
      ["memorize", "lost"].indexOf(this.state.gameState) >= 0;
    return (
      <div className="grid">
        {this.matrix.map((row, ri) =>
          <Row key={ri}>
            {row.map(cellId =>
              <Cell
                key={cellId}
                id={cellId}
                showActiveCells={showActiveCells}
                activeCells={this.activeCells}
                front={this.fronts[cellId]}
                back={this.backs[cellId]}
                recordGuess={this.recordGuess.bind(this)}
                {...this.state}
              />
            )}
          </Row>
        )}
        <br />
        <Footer
          {...this.state}
          playAgain={this.props.createNewGame}
          playAgainWinner={this.props.createNewGameWinner}
          activeCellsCount={this.props.activeCellsCount}
        />
      </div>
    );
  } //end render
} // end Component

//adjust these to adjust difficulty
Game.defaultProps = {
  allowedWrongAttempts: 5,
  timeoutSeconds: 10
};

export default Game;
