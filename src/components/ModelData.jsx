import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios/index";
import {connect} from 'react-redux';

class ModelData extends React.Component {
    constructor() {
        super();
    }

    //API request for variable X data
    getXData = () => {
        // let url = 'http://api.worldbank.org/v2/countries/'+this.props.predefinedCountries+'/indicators/'+this.props.x+'?format=json';

        let url = 'http://api.worldbank.org/v2/countries/'+this.props.predefinedCountries+'/indicators/'+this.props.x+'?date=1990:2016&format=json';

        axios.get(url)
            .then(response => {
                //console.log(response.data);
                let x = response.data[1];
                let xValues = x.map(e=>e.value);
                console.log(xValues);
                console.log(url);
                this.props.setXData(xValues);
            });
    };

    getYData = () => {
        let url = 'http://api.worldbank.org/v2/countries/'+this.props.predefinedCountries+'/indicators/'+this.props.x+'?date=1990:2016&format=json';

        axios.get(url)
            .then(response => {
                //console.log(response.data);
                let y = response.data[1];
                let yValues = y.map(e=>e.value);
                console.log(yValues);
                console.log(url);
                this.props.setYData(yValues);
            });

    }

    setIterations = (e) => {
        this.props.setIterations(e.target.value);
    }

    getModelData = () => {
        if (this.props.x !== 'Choose X' && this.props.y !== 'Choose Y'){
            this.getXData();
            this.getYData();
        } else {
            console.log('choose both x and y')
        }
    }

    componentDidMount(){
        this.getModelData();
    }

    render() {
        return (
            <div>
                <p>sending query to API here</p>
                <input type="number" value={this.props.iterations} onChange={this.setIterations}/><br/>
                <button onClick={this.getModelData}>Get model data</button>
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
        xData: store.xData,
        yData: store.yData,
        iterations: store.iterations
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setXData: typeX => {
            dispatch({type: 'SET_DATA_X', payload: typeX})
        },
        setYData: typeY => {
            dispatch({type: 'SET_DATA_Y', payload: typeY})
        },
        setIterations: typeIterations => {
            dispatch({type: 'SET_ITERATIONS', payload: typeIterations})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelData);