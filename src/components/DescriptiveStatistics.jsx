import React from 'react';
import {connect} from "react-redux";
import * as math from 'mathjs'

class DescriptiveStatistics extends React.Component {
    constructor() {
        super();
    }
    render(){
        return (
            <div className="model-output__descriptive-statistics">
                <div className="model-el">
                    <p className="strong">Independent</p>
                    <p>MAX: {parseFloat(math.max(...this.props.xData)).toFixed(2)}</p>
                    <p>MIN: {parseFloat(math.min(...this.props.xData)).toFixed(2)}</p>
                    <p>MEAN: {parseFloat(math.mean(this.props.xData)).toFixed(2)}</p>
                    <p>STD: {parseFloat(math.std(...this.props.xData)).toFixed(2)}</p>
                    <p>VAR: {parseFloat(math.var(...this.props.xData)).toFixed(2)}</p>
                </div>
                <div className="model-el">
                    <p className="strong">Dependent</p>
                    <p>MAX: {parseFloat(math.max(...this.props.yData)).toFixed(2)}</p>
                    <p>MIN: {parseFloat(math.min(...this.props.yData)).toFixed(2)}</p>
                    <p>MEAN: {parseFloat(math.mean(this.props.yData)).toFixed(2)}</p>
                    <p>STD: {parseFloat(math.std(...this.props.yData)).toFixed(2)}</p>
                    <p>VAR: {parseFloat(math.var(...this.props.yData)).toFixed(2)}</p>
                </div>
            </div>
        )
    }
 }

function mapStateToProps(store) {
    return {
        xData: store.xData,
        yData: store.yData,
        x: store.x,
        y: store.y
    }
}

export default connect(mapStateToProps)(DescriptiveStatistics);