import React from "react";
import {connect} from 'react-redux';

class ModelVariables extends React.Component {
    constructor() {
        super();
    }

    chooseX = (e) => {
        this.props.chooseX(e.target.value)
    }

    chooseY = (e) => {
        this.props.chooseY(e.target.value)
    }

    render() {
        return (
            <div>
                {this.props.modelType}
                {this.props.dataSource}
                {this.props.predefinedCountries}
                {this.props.predefinedIndicators}
                <h1>Test</h1>

                <div>
                    <h2>model variables:</h2>
                    <p>y: {this.props.y}</p>
                    <select name="" id="" onChange={this.chooseY}>
                        {this.props.predefinedIndicators.map(e => {
                            return <option value={e} key={e}>{e}</option>
                        })}
                    </select>

                    <p>x: {this.props.x}</p>
                    <select name="" id="" onChange={this.chooseX}>
                        {this.props.predefinedIndicators.map(e => {
                            return <option value={e} key={e}>{e}</option>
                        })}
                    </select>
                </div>


            </div>

        )
    }
}
function mapStateToProps(store) {
    return {
        modelType: store.modelType,
        dataSource: store.dataSource,
        predefinedCountries: store.predefinedCountries,
        predefinedIndicators: store.predefinedIndicators,
        x: store.x,
        y: store.y
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chooseX: typeX => {
            dispatch({type: 'CHOOSE_X', payload: typeX})
        },
        chooseY: typeY => {
            dispatch({type: 'CHOOSE_Y', payload: typeY})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelVariables);
