class Footer extends React.Component {
 
   remainingCount() {
    if (this.props.gameState !== "recall") { return null; }
    return (
      <div className="remaining-count">
        {this.props.activeCellsCount - this.props.correctGuesses.length}
      </div>
    );
  }


 render() {
    return (
      <div className="footer">
        <div className="hint">
            {this.props.hints[this.props.gameState]}...
        </div>
        {this.remainingCount()}
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
