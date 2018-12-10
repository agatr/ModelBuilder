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
import fileDataReducer from './reducers/fileDataReducer.jsx';
import fileDataHeaderReducer from './reducers/fileDataHeaderReducer.jsx';
import indicatorsReducer from './reducers/indicatorsReducer.jsx';
require ('./scss/main.scss');
import {Header} from "./components/Header.jsx";
import {Footer} from "./components/Footer.jsx";
import UploadVariables from "./components/UploadVariables.jsx";

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
    loss: lossValueReducer,
    fileData: fileDataReducer,
    fileDataHeader: fileDataHeaderReducer,
    indicators: indicatorsReducer
});

const store = createStore(reducers);

document.addEventListener('DOMContentLoaded', function () {

    class App extends Component {
        constructor() {
            super();
        }

        render() {
            return (
                <div className="wrapper">
                    <Header/>
                    <ModelDefinition/>
                    <ModelData/>
                    <ModelOutput/>
                    <Footer/>
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

