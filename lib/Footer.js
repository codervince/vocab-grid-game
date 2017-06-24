class Footer extends React.Component {
  
  //playAgainWon
  playAgainButton() {
    let wonLost = ["won", "lost"].indexOf(this.props.gameState) >= 0;
    if (!wonLost) {
      return null;
    }
    if (this.props.gameState === "won"){
         return (
      <div className="play-again">
        
        <button 
        className="play-again-button"
        onClick={this.props.playAgainWinner}>
        Play again Winner
        </button>
      </div>
    );
    } else {
         return (
        <div className="play-again">
        <button 
        className="play-again-button"
        onClick={this.props.playAgain}>
        Play again
        </button>
      </div>
    );
    }
 
  }

  remainingCount() {
    if (this.props.gameState !== "recall") {
      return null;
    }
    return (
      <div className="remaining-count">
        {this.props.activeCellsCount - this.props.correctGuesses.length} to find
      </div>
    );
  }

  render() {
    return (
      <div className="footer">
        <div className="hint">
          {this.props.hints[this.props.gameState]}
        </div>
        {this.remainingCount()}
        <br/>
        {this.playAgainButton()}
      </div>
    );
  }
}

Footer.defaultProps = {
  hints: {
    ready: "Get Ready",
    memorize: "Memorize",
    recall: "Recall",
    won: "Well Done!",
    lost: "Game Over"
  }
  //   hints_de: {
  //   ready: "Bereit",
  //   memorize: "Merken",
  //   recall: "Abrufen",
  //   won: "Gut gemacht!",
  //   lost: "Versuch's noch einma' Armluuchter"
  // },
};

export default Footer;
