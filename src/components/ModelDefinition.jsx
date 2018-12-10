import React from "react";
import {ModelSettings} from './ModelSettings.jsx';
import PredefinedVariables from "./PredefinedVariables.jsx";
import ModelVariables from "./ModelVariables.jsx";

export class ModelDefinition extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="model-definition">
                <ModelSettings/>
                <PredefinedVariables/>
                <ModelVariables/>
            </div>
        )
    }
}