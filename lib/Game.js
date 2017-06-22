import _ from "lodash";

import Row from "./Row";
import Cell from "./Cell";
import Footer from "./Footer";

class Game extends React.Component {

  // extension to this game pushes id numbers but also Schweizerduutsch names to the grid
  constructor(props) {
        super(props);

        this.matrix = [];
        
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
          gameState: "ready" //init state
          // wrongGuesses: [],
          // correctGuesses: []
        };

  }

    //using componentDidMount() set timers
    componentDidMount() {
      setTimeout(() => {
        this.setState({gameState: 'memorize'}, () => {
          setTimeout(() => this.setState( {gameState: 'recall'}), 2000);
          });
      },2000);
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


    
    render(){
      console.log("this.activeCells"+ this.activeCells);
          return (
            
            <div className="grid">
              {this.matrix.map((row, ri) => (
                <Row key={ri}>
                  {row.map(cellId => <Cell 
                                      key={cellId} id={cellId}
                                      activeCells={this.activeCells}
                                      {...this.state}  />)}
                </Row>
              ))}
              <br />
              <Footer {...this.state} />
            </div>
    );

  }//end render
}// end Component

export default Game;
