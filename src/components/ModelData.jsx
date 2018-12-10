import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios/index";
import {connect} from 'react-redux';
import * as tf from "@tensorflow/tfjs/dist/index";

class ModelData extends React.Component {
    constructor() {
        super();
    }

    //API request for variable X data
    getXData = () => {
        // let url = 'http://api.worldbank.org/v2/countries/'+this.props.predefinedCountries+'/indicators/'+this.props.x+'?format=json';

        let url = 'http://api.worldbank.org/v2/countries/' + this.props.predefinedCountries + '/indicators/' + this.props.x + '?date=1990:2016&format=json';

        axios.get(url)
            .then(response => {
                //console.log(response.data);
                let x = response.data[1];
                let xValues = x.map(e => e.value);
                console.log(xValues);
                console.log(url);
                this.props.setXData(xValues);
            }).catch(error=>console.log(error));
    };

    getYData = () => {
        let url = 'http://api.worldbank.org/v2/countries/' + this.props.predefinedCountries + '/indicators/' + this.props.y + '?date=1990:2016&format=json';

        axios.get(url)
            .then(response => {
                console.log('to jest response',response.data);
                console.log('to jest url',url);
                let y = response.data[1];
                let yValues = y.map(e => e.value);
                console.log(yValues);
                console.log(url);
                this.props.setYData(yValues);
            }).catch(error=>console.log(error));

    }

    getXDataFromFile = () => {
        let arr = [];
        console.log(this.props.fileData);
        console.log(this.props.x);
        this.props.fileData.forEach((e) => {
            arr.push(e[this.props.x])
        },this.props.setXData(arr))
    }

    getYDataFromFile = () => {
        let arr = [];
        this.props.fileData.forEach((e) => {
            arr.push(Number(e[this.props.y]))
        },this.props.setYData(arr))
    }

    setIterations = (e) => {
        this.props.setIterations(e.target.value);
    }

    getModelData = () => {
        console.log(this.props.dataSource);
        switch (this.props.dataSource) {
            case 'World Bank':
                if (this.props.x !== 'Choose X' && this.props.y !== 'Choose Y') {
                    this.getXData();
                    this.getYData();
                } else {
                    console.log('choose both x and y')
                }
                break;
            case 'Own data':
                console.log('own');
                this.getXDataFromFile();
                this.getYDataFromFile();
                console.log(this.props.xData);
                break;
            default:
                console.log('ss')
        }
    }

    trainModel = () => {
        console.log('training model')

//START MODEL GENERATION
        //Initialize coefitients
        //y = ax+b
        //y-we're looking for prediction of this value (output)
        //x - input
        let a = tf.variable(tf.scalar(Math.random(1)));
        let b = tf.variable(tf.scalar(Math.random(1)));
        let lossValue;

        //prediction function that takes as inout x and generates y
        function predict(x) {
            //tidy clears unused tensors, so that they don't use memory
            return tf.tidy(() => {
                    return a.mul(x).add(b);
                }
            )
        }

        //loss function - measures how well model (equation) fits the data
        // mean squared error (MSE) - avg((y_pred - y_real)^2)
        function loss(y_predicted, y_observed) {
            const meanSquareError = y_predicted.sub(y_observed).square().mean();
            //console.log(meanSquareError.toString());
            return meanSquareError;
        }

        //optimizer - algorithm that will look for best a,b values, goal: minimize loss function
        //Stochastic Gradient Descent- SDG
        //learning rate - controls how big are adjustments of the model
        // let lossValue;

        //let {setLoss} = this.props;

        //training loop - run optimizer to minimize loss function
        async function train(xs, ys, iterations){
            const learningRate = 0.01;
            const optimizer = tf.train.sgd(learningRate);
            let lossVal;

            for (let i = 0; i < iterations; i++) {
                optimizer.minimize(() => {
                    const predicted_ys = predict(xs);
                    lossVal = loss(predicted_ys, ys);
                    lossValue = lossVal.dataSync();
                    console.log(lossValue);
                    return lossVal;
                })
                //     .then(res => {
                //     console.log('then ',res)
                // })
            }
        }


        if (this.props.xData.length > 0) {
            console.log('test',this.props.xData);
            const x_train = tf.tensor(this.props.xData);
            const y_train = tf.tensor(this.props.yData);

            train(x_train, y_train, this.props.iterations).then(() => {
                console.log('training complete');
                console.log('loss function ' + parseFloat(lossValue));
                console.log('type ' + parseFloat(Number(lossValue.toString())));
                a.print();
                b.print();
            });
        }

        // const x_train = tf.tensor([1,2,3]);
        // const y_train = tf.tensor([1,2,3]);
        //
        // train(x_train, y_train, this.props.iterations).then(() => {
        //     console.log('training complete');
        //     console.log('loss function ' + parseFloat(lossValue));
        //     console.log('type ' + parseFloat(Number(lossValue.toString())));
        //     console.log('test ' + parseFloat(10.21313131).toFixed(2));
        //     a.print();
        //     b.print();
        // });

        a.print();
        this.props.setA(parseFloat(a.dataSync()).toFixed(2));
        this.props.setB(parseFloat(b.dataSync()).toFixed(2));
        this.props.setLoss(parseFloat(lossValue).toFixed(2));

        //END OF MODEL GENERATION
    }


    componentDidMount() {
        this.getModelData();
        this.trainModel();
    }

    render() {
        return (
            <div className="model-data">
                <p>Number of iterations</p>
                <input type="number" value={this.props.iterations} onChange={this.setIterations}/><br/>
                {/*<button className="btn" onClick={()=>{this.getModelData; this.trainModel()}}>Generate model</button>*/}
                <button className="btn" onClick={this.getModelData}>data model</button>
                <button className="btn" onClick={this.trainModel}>Generate model</button>
                {this.props.xData}
                {this.props.yData}
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
        iterations: store.iterations,
        fileData: store.fileData,
        a: store.a,
        b: store.b,
        loss: store.loss
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
        },
        setA: aValue => {
            dispatch({type: 'SET_A', payload: aValue})
        },
        setB: bValue => {
            dispatch({type: 'SET_B', payload: bValue})
        },
        setLoss: lossValue => {
            dispatch({type: 'SET_LOSS', payload: lossValue})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelData);