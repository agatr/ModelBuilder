import React from "react";
import {ModelSettings} from './ModelSettings.jsx';
import {PredefinedVariables} from "./PredefinedVariables.jsx";

export class ModelDefinition extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <ModelSettings/>
                <PredefinedVariables/>

            </div>
        )
    }
}