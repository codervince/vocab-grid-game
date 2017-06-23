import _ from "lodash";

import Row from "./Row";
import Cell from "./Cell";
import Footer from "./Footer";


//dummy data based on a 5*5 grid
//randomly chose 25 objects

var data = [
      { id: 101, de_ch: 'Baascht', explanation: "I bi baascht = i bi kabutt. Dr Joint isch baascht = är isch fertig" },
       { id: 102, de_ch: 'Ascht; en Ascht haa', explanation: "Erschöpfung oder auch plötzliche Müdigkeit (zB. Hungerascht) oder Katermüdigkeit (zB. vom Vorabend)" },
        { id: 103, de_ch: 'Ballon; e Balong Wy', explanation: "ein Glas Rotwein" },
         { id: 104, de_ch: 'Badraxe', explanation: "Sinnloses Gerede ohne Ziel und Zweck. Lustige Meinungsverschiedenheiten, die nicht gelöst werden sondern in's Absurde gezogen werden." },
          { id: 105, de_ch: 'Baschter', explanation: "Bastard; nicht rassenreines Tier; aber auch: u.U. ziemlich böse Beschimpfung" },
           { id: 106, de_ch: 'Batzeli', explanation: "Kleingeld und Münzen in der Kindersprache" },
            { id: 107, de_ch: 'Beck', explanation: "Bäcker" },
             { id: 108, de_ch: 'Beiz', explanation: "Restauraunt, Wirtschaft" },
              { id: 109, de_ch: 'Beizechehr', explanation: "Tour durch alle Gaststätten" },
               { id: 110, de_ch: 'Beielitöff', explanation: "Vespa" },
                { id: 111, de_ch: 'Bhouptihung', explanation: "ein Besserwisser, jemand, der stur etwas behauptet, auch wenn es nicht stimmt" },
                 { id: 112, de_ch: 'Biblere', explanation: "Bibliothek; Schulbibliothek" },
                  { id: 113, de_ch: 'Bhusig', explanation: "Wohnung, Zuhause, Heim, Behausung" },
                   { id: 114, de_ch: 'das Biet', explanation: "Gebiet, Kanton" },
                    { id: 115, de_ch: 'im Biet ha', explanation: "hier Ra. für: jmd. oder etwas im Auge haben, bzw. im Sinn haben usw." },
                     { id: 116, de_ch: 'Bilijee', explanation: "Billet, Fahrkarte, Eintrittskarte usw. Aber auch Führerausweis (Fahrausweis): \"Är hets Bilijee müessen abgäh.\"" },
                      { id: 117, de_ch: 'bireweich', explanation: "hier Ra. für: etwas weich im Kopf, nicht ganz auf der Höhe, intellektuell stark verbesserungswürdig usw." },
                       { id: 118, de_ch: 'hesch öppis gseit, oder nume ds Bis gwächslet?', explanation: "Hast Du etwas gesagt, oder nur das Gebiss ausgewechselt?" },
                        { id: 119, de_ch: 'Bisch bbisse?', explanation: "1. spinnst du? 2. bist du betrunken?" },
                         { id: 120, de_ch: 'Bisch e Nussgipfu', explanation: "du bist ein Versager, Weichei" },
                          { id: 121, de_ch: 'Bitzi', explanation: "1. Stück, Stücklein 2. ein bisschen (alle Formen Diminuitiv)" },
                           { id: 122, de_ch: 'Blas mer! Blas mer id Schue!', explanation: "Lass mich sein! Abgeschwächt: LmaA!" },
                            { id: 123, de_ch: 'Blaue mache', explanation: "Die Schule schwänzen oder sich einen schönen freien Tag kredenzen, anstatt zu arbeiten" },
                             { id: 124, de_ch: 'Blettli', explanation: "Zeitung, Journal (wörtlich: Blättchen)" },
                              { id: 125, de_ch: 'Blöffsack', explanation: "Angeber" }

    ]



class Game extends React.Component {

  // extension to this game pushes id numbers but also Schweizerduutsch names to the grid
  constructor(props) {
        super(props);

        this.matrix = [];
        this.fronts = {};
        this.backs= {};
        this.data = _.shuffle(data).slice();

        //instantiate data map too
        for (let r = 0; r < this.props.rows; r++) {
          for (let c = 0; c < this.props.columns; c++) {

            let termObject =  data.pop();
            let term = termObject['de_ch'];
            //need to truncate this.
            let explanation = termObject['explanation'];
            explanation = _.truncate(explanation, {'length': 60});
            this.fronts[`${r}${c}`]= `${term}`;
            this.backs[`${r}${c}`] = `\n\n${explanation}`;
            
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
      setTimeout(() => {
        this.setState({gameState: 'memorize'}, () => {
          setTimeout(() => this.setState( {gameState: 'recall'}), 2000);
          });
      },4000);
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

    
    render(){

          return (
            
            <div className="grid">
              {this.matrix.map((row, ri) => (
                <Row key={ri}>
                  {row.map(cellId => <Cell 
                                      key={cellId} 
                                      id={cellId}
                                      activeCells={this.activeCells}
                                      front= {this.fronts[cellId]}
                                      back= {this.backs[cellId]}
                                      recordGuess={this.recordGuess.bind(this)}
                                      {...this.state}  />)}
                </Row>
              ))}
              <br />
              <Footer 
                      {...this.state} />
            </div>
    );

  }//end render
}// end Component

export default Game;
