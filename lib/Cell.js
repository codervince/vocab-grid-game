
class Cell extends React.Component {
    active(){
        console.log("this.props.activeCells " + this.props.activeCells);
        return this.props.activeCells.indexOf(this.props.id) >= 0;
    }

    render(){
            let className = "cell";

            if (this.props.gameState === "memorize" && this.active()) {
                className += " active";
            }
            return(
                <div className={className}>
                    <div className="termString">
                        {this.props.front}
                    </div>
                </div>
            );
    }
}

export default Cell;