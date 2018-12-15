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
            <div className="model-variables">
                <div>
                    {this.props.dataSource === 'World Bank' ?
                    <>
                        <div className="model-variables__dependent-variable model-el">
                            <p>Dependent variable:</p>
                            <select name="" id="" onChange={this.chooseY}>
                                {this.props.indicators.map((e,i) => {
                                    return <option value={e.id} key={i}>{e.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="model-variables__independent-variable model-el">
                            <p>Independent variable:</p>
                            <select name="" id="" onChange={this.chooseX}>
                                {this.props.indicators.map((e,i) => {
                                    return <option value={e.id} key={i}>{e.name}</option>
                                })}
                            </select>
                        </div>
                    </>
                    : <>
                            <div className="model-variables__dependent-variable model-el">
                                <p>Dependent variable:</p>
                                <select name="" onChange={this.chooseY}>
                                    {this.props.fileDataHeader.map((e,i)=>{
                                        return <option key={i} value={i}>{e}</option>
                                    })}
                                </select>
                            </div>
                            <div className="model-variables__independent-variable model-el">
                                <p>Independent variable:</p>
                                <select name="" onChange={this.chooseX}>
                                    {this.props.fileDataHeader.map((e,i)=>{
                                        return <option key={i} value={i}>{e}</option>
                                    })}
                                </select>
                            </div>
                        </>
                    }
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
        y: store.y,
        fileDataHeader: store.fileDataHeader,
        indicators: store.indicators
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
