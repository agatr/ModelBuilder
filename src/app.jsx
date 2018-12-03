import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {ModelDefinition} from './components/ModelDefinition.jsx';
import {ModelOutput} from './components/ModelOutput.jsx';
import ModelData from './components/ModelData.jsx';
import ModelVariables from './components/ModelVariables.jsx';
import Test from './components/ModelVariables.jsx';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import modelTypeReducer from './reducers/modelTypeReducer.jsx';
import dataSourceReducer from './reducers/dataSourceReducer.jsx';
import predefinedCountriesReducer from './reducers/predefinedCountriesReducer.jsx';
import predefinedIndicatorsReducer from './reducers/predefinedIndicatorsReducers.jsx';
import variableXReducer from './reducers/variableXReducer.jsx';
import variableYReducer from './reducers/variableYReducer.jsx';
import xDataReducer from './reducers/xDataReducer.jsx';
import yDataReducer from './reducers/yDataReducer.jsx';
import iterationsReducer from './reducers/iterationsReducer.jsx';
import aReducer from './reducers/aReducer.jsx';
import bReducer from './reducers/bReducer.jsx';
import lossValueReducer from './reducers/lossValueReducer.jsx';
require ('../dist/main.css');

class Header extends React.Component {
    constructor() {
        super();
    }
    render(){
        return (
            <header>

            </header>
        )
    }
 }

const reducers = combineReducers({
    modelType: modelTypeReducer,
    dataSource: dataSourceReducer,
    predefinedCountries: predefinedCountriesReducer,
    predefinedIndicators: predefinedIndicatorsReducer,
    x: variableXReducer,
    y: variableYReducer,
    xData: xDataReducer,
    yData: yDataReducer,
    iterations: iterationsReducer,
    a: aReducer,
    b: bReducer,
    loss: lossValueReducer
});

const store = createStore(reducers);

document.addEventListener('DOMContentLoaded', function () {

    class App extends Component {
        constructor() {
            super();
        }

        render() {
            return (
                <div>

                    <ModelDefinition/>
                    <ModelVariables/>
                    <ModelData/>
                    <ModelOutput/>
                </div>
            )
        }
    }

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.querySelector('#app')
    );
});

