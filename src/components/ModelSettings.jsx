import React from "react";
import ModelType from './ModelType.jsx';
import DataSource from './DataSource.jsx';

export class ModelSettings extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="model-definition__model-settings">
                <ModelType/>
                <DataSource/>
            </div>
        )
    }
}