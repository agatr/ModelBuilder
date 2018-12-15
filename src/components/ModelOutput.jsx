import React from "react";
import ModelEquation from './ModelEquation.jsx';
import Graph from './Graph.jsx';
import DescriptiveStatistics from "./DescriptiveStatistics.jsx";

export class ModelOutput extends React.Component {
    constructor() {
        super();
    }
    render(){
        return (
            <div className="model-output">
                <ModelEquation/>
                <DescriptiveStatistics/>
                <Graph/>
            </div>
        )
    }
}
