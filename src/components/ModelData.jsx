import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios/index";
import {connect} from 'react-redux';
import * as tf from "@tensorflow/tfjs/dist/index";

class ModelData extends React.Component {
    constructor() {
        super();
    }

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
        console.log('date', this.props.fileData);
        console.log('index ', this.props.x);
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
        switch (this.props.dataSource) {
            case 'World Bank':
                if (this.props.x !== 'Choose X' && this.props.y !== 'Choose Y') {
                    this.getXData();
                    this.getYData();
                    this.trainModel();
                }
                break;
            case 'Own data':
                // if(this.props.fileDataHeader == 'upload file') {
                //     this.setState({fileUploaded: false})
                // } else {
                //     this.getXDataFromFile();
                //     this.getYDataFromFile();
                //     this.trainModel();
                // }
                this.getXDataFromFile();
                this.getYDataFromFile();
                this.trainModel();
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
            const meanSquareError = (y_predicted.sub(y_observed)).square().mean();
            //console.log(meanSquareError.toString());
            return meanSquareError;
        }

        //optimizer - algorithm that will look for best a,b values, goal: minimize loss function
        //Stochastic Gradient Descent- SDG
        //learning rate - controls how big are adjustments of the model
        // let lossValue;

        //let {setLoss} = this.props;

        //training loop - run optimizer to minimize loss function
        async function train(xs, ys, iterations, learningRate){
            // const learningRate = 0.01;
            const optimizer = tf.train.sgd(learningRate);
            let lossVal;

            for (let i = 0; i < iterations; i++) {
                optimizer.minimize(() => {
                    const predicted_ys = predict(xs);
                    lossVal = loss(predicted_ys, ys);
                    lossValue = lossVal.dataSync();
                    console.log('loss ',lossValue);
                    return lossVal;
                })
            }
        }


        if (this.props.xData.length > 0) {
            console.log('test',this.props.xData);
            const x_train = tf.tensor(this.props.xData);
            const y_train = tf.tensor(this.props.yData);

            train(x_train, y_train, this.props.iterations, this.props.learningRate).then(() => {
                console.log('training complete');
                console.log('loss function ' + parseFloat(lossValue));
                console.log('type ' + parseFloat(Number(lossValue.toString())));
                a.print();
                b.print();
            });
        }

        a.print();
        this.props.setA(parseFloat(a.dataSync()).toFixed(2));
        this.props.setB(parseFloat(b.dataSync()).toFixed(2));
        this.props.setLoss(lossValue);

        //END OF MODEL GENERATION
    }

    setLearningRate = (e) => {
        this.props.setLearningRate(e.target.value)
    }

    trainQuadraticRegressionModel = (e) => {
        let a = tf.variable(tf.scalar(Math.random(1)));
        let b = tf.variable(tf.scalar(Math.random(1)));
        let c = tf.variable(tf.scalar(Math.random(1)));
        let lossValue;

        //prediction function that takes as inout x and generates y
        function predict(x) {
            return tf.tidy(() => {
                    return c.mul(x).mul(x).add(c).mul(x).add(b);
                }
            )
        }

        function loss(y_predicted, y_observed) {
            const meanSquareError = y_predicted.sub(y_observed).square().mean();
            return meanSquareError;
        }

        //training loop - run optimizer to minimize loss function
        async function train(xs, ys, iterations){
            const learningRate = this.props.learningRate;
            const optimizer = tf.train.sgd(learningRate);
            let lossVal;

            for (let i = 0; i < iterations; i++) {
                optimizer.minimize(() => {
                    const predicted_ys = predict(xs);
                    lossVal = loss(predicted_ys, ys);
                    lossValue = lossVal.dataSync();
                    console.log('loss value:', lossValue);
                    return lossVal;
                })
            }
        }


        if (this.props.xData.length > 0) {
            const x_train = tf.tensor(this.props.xData);
            const y_train = tf.tensor(this.props.yData);

            train(x_train, y_train, this.props.iterations).then(() => {
                console.log('training complete');
                console.log('loss function ' + parseFloat(lossValue));
                console.log('type ' + parseFloat(Number(lossValue.toString())));
                a.print();
                b.print();
                c.print();
            });
        }

        this.props.setA(parseFloat(a.dataSync()).toFixed(2));
        this.props.setB(parseFloat(b.dataSync()).toFixed(2));
        this.props.setC(parseFloat(c.dataSync()).toFixed(2));
        this.props.setLoss(parseFloat(lossValue).toFixed(2));

    }

    componentDidMount() {
        //this.getModelData();
        //this.trainModel();
    }

    render() {
       return (
            <div className="model-data">
                <div className="model-data__iterations model-el">
                    <p>Number of iterations</p>
                    <input type="number" step="1" value={this.props.iterations} onChange={this.setIterations}/>
                </div>
                <div className="model-data__learning-rate model-el">
                    <p>Learning rate</p>
                    <input type="number" value={this.props.learningRate} step="0.01" onChange={this.setLearningRate}/>
                </div>
                <div className="model-el">
                    <button className="btn model-el" onClick={this.getModelData} disabled={this.props.btnDisabled}>Generate model</button>
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
        xData: store.xData,
        yData: store.yData,
        iterations: store.iterations,
        fileData: store.fileData,
        fileDataHeader: store.fileDataHeader,
        a: store.a,
        b: store.b,
        c: store.c,
        loss: store.loss,
        learningRate: store.learningRate,
        btnDisabled: store.btnDisabled
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
        setC: cValue => {
            dispatch({type: 'SET_C', payload: cValue})
        },
        setLoss: lossValue => {
            dispatch({type: 'SET_LOSS', payload: lossValue})
        },
        setLearningRate: learningRate => {
            dispatch({type: 'SET_LEARNING_RATE', payload: learningRate})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelData);