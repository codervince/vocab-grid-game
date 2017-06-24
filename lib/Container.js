import Game from "./Game";



class Container extends React.Component {    

  constructor(props) {
    super(props);
    this.state = { 
      gameId:1,
      theRows:5,
      theCols:5,
      theActiveCellsCount:6
    };
  }

  createNewGame() {
    this.setState({ gameId: this.state.gameId + 1 });
  }
//make grid bugger , increment activeCells
  createNewGameWinner() {
    this.setState({ 
      gameId: this.state.gameId + 1,
      theRows: this.state.theRows + 1,
      theCols: this.state.theCols + 1,
      theActiveCellsCount: this.state.theActiveCellsCount+1
     });
  }

    render(){
        return (
            <div>
                <Game 
                    key={this.state.gameId}
                    createNewGame={this.createNewGame.bind(this)}
                    createNewGameWinner={this.createNewGameWinner.bind(this)}
                    rows={this.state.theRows} columns={this.state.theCols}
                    activeCellsCount={this.state.theActiveCellsCount}
                />
            </div>
        ); 
    }
}

export default Container;