import Row from "./Row";
import Cell from "./Cell";
import Footer from "./Footer";

class Game extends React.Component {

    constructor(props){
        super(props);
        this.state = {gameState: 'ready'};
    }

    //using componentDidMount() set timers
    componentDidMount(){
        setTimeout( ()=> this.setState( { gameState: 'memorize'}, () =>
          { setTimeout( ()=> this.setState({ gameState: 'recall'}), 4000);}
        ), 2000);
    }
    
    render() {

        let matrix = [], row;
        for (let r = 0; r < this.props.rows; r++) {
            let row = [];
            for (let c = 0; c < this.props.columns; c++) {
                row.push(`${r}${c}`);
        }
        matrix.push(row);
    }

    return (
      <div className="grid">
        {matrix.map((row, ri) => (
          <Row key={ri}>
            {row.map(cellId => <Cell key={cellId} id={cellId} />)}
          </Row>
        ))}
        <br />
        <Footer {...this.state} />
      </div>
    );

  }//end render
}

export default Game;
