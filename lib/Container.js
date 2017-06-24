import Game from "./Game";

let maxgridrows = 10;
let maxgridcols = 10;

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
      gameId:  this.state.gameId + 1,
      theRows: ++this.state.theRows < maxgridrows? this.state.theRows + 1:this.state.theRows,
       theCols: ++this.state.theCols < maxgridcols? this.state.theCols + 1:this.state.theCols,
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