import React from "react";
import ModelEquation from './ModelEquation.jsx';
import {Graph} from './Graph.jsx';

export class ModelOutput extends React.Component {
    constructor() {
        super();
    }
    render(){
        return (
            <div>
                <h4>model output</h4>
                <ModelEquation/>
                <Graph/>
            </div>
        )
    }
}
