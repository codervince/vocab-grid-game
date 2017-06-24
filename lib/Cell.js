class Cell extends React.Component {
  
  
  
  
  active() {
    console.log("this.props.activeCells " + this.props.activeCells);
    return this.props.activeCells.indexOf(this.props.id) >= 0;
  }
  //click handler for guess
  handleClick() {
    //do not call on a cell with an existing value
    if (this.guessState() === undefined && this.props.gameState === "recall") {
      this.props.recordGuess({
        cellId: this.props.id,
        userGuessIsCorrect: this.active()
      });
    }
  }

  guessState() {
    if (this.props.correctGuesses.indexOf(this.props.id) >= 0) {
      return true;
    } else if (this.props.wrongGuesses.indexOf(this.props.id) >= 0) {
      return false;
    }
  }
  render() {
    let className = "cell";

    //blink_me
     if (this.props.gameState === "won" && this.active()) {
      className += " blink_me";
    }   

    if (this.props.showActiveCells && this.active()) {
      className += " active";
    }
    className += " guess-" + this.guessState();
    
    return (
      <div className={className} onClick={this.handleClick.bind(this)} >
        <div className="termString">
          {this.props.front}
          <div className="back"> {this.props.back} </div>
        </div>
      </div>
    );
  }
}

export default Cell;
