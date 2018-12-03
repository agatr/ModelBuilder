import React from 'react';
import ReactDOM from 'react-dom';
import {ModelDefinition} from './ModelDefinition.jsx';
import {ModelOutput} from './ModelOutput.jsx';
import {ModelData} from "./ModelData.jsx";


export class ModelParent extends React.Component {
    constructor() {
        super();
        this.state = {
            modelType: ' initial',
            confidenceLevel: 'initial conf lvl',
            dataSource: 'initial',
            y: '',
            x: []
        }
    }

    handleModelTypeChange = (modelType) => {
        this.setState({
            modelType: modelType
        })
        console.log(this.state.modelType);
    }

    handleConfidenceLevelChange = (confidenceLevel) => {
        this.setState({
            confidenceLevel: confidenceLevel
        })
    }

    handleDataSourceChange = (dataSource) => {
        this.setState({
            dataSource: dataSource
        })
    }

    handleYChange = (y) => {
        this.setState({
            y: y
        })
    }

    handleXChange = (x) => {
        this.setState({
            x: [...this.state.x, x]
        })
    }

    render() {
        return (
            <div>
                <ModelDefinition/>
            </div>
        )

        // return (
        //     <div>
        //         <ModelDefinition onModelTypeChange={this.handleModelTypeChange} onConfidenceLevelChange={this.handleConfidenceLevelChange} onDataSourceChange={this.handleDataSourceChange} modelType={this.state.modelType} confidenceLevel={this.state.confidenceLevel} dataSource={this.state.dataSource} y={this.state.y} onYChange={this.handleYChange} x={this.state.x} onXChange={this.handleXChange}/>
        //         <h1>parent wybrana: {this.state.y}</h1>
        //         <ModelOutput modelType={this.state.modelType}/>
        //         <ModelData x={this.state.x} y={this.state.y}/>
        //     </div>
        //
        // )
    }
}
