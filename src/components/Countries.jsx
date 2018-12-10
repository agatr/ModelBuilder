import React from "react";
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';
import {connect} from 'react-redux';

// //Initialize coefitients
// //y = ax+b
// //y-we're looking for prediction of this value (output)
// //x - input
// let a = tf.variable(tf.scalar(Math.random(1)));
// let b = tf.variable(tf.scalar(Math.random(1)));
//
// //prediction function that takes as inout x and generates y
// function predict(x) {
//     //tidy clears unused tensors, so that they don't use memory
//     return tf.tidy(() => {
//             return a.mul(x).add(b);
//         }
//     )
// }
//
// //training data - to be sourced fram API later
// const x_train = tf.tensor([1, 2, 3, 4, 5, 6]);
// const y_train = tf.tensor([1, 2, 3, 4, 5, 6]);
//
// //loss function - measures how well model (equation) fits the data
// // mean squared error (MSE) - avg((y_pred - y_real)^2)
// let meanSquareError;
//
// function loss(y_predicted, y_observed) {
//     const meanSquareError = y_predicted.sub(y_observed).square().mean();
//     //console.log(meanSquareError.toString());
//     return meanSquareError;
// }
//
// //optimizer - algorithm that will look for best a,b values, goal: minimize loss function
// //Stochastic Gradient Descent- SDG
// //learning rate - controls how big are adjustments of the model
// let lossValue;
// //training loop - run optimizer to minimize loss function
// async function train(xs, ys, iterations) {
//     const learningRate = 0.01;
//     const optimizer = tf.train.sgd(learningRate);
//     let lossVal;
//
//     for (let i = 0; i < iterations; i++) {
//         optimizer.minimize(() => {
//             const predicted_ys = predict(xs);
//             lossVal = loss(predicted_ys, ys);
//             lossValue = lossVal.dataSync();
//             return lossVal;
//         });
//     }
// }
//
// train(x_train, y_train, 3).then(() => {
//     console.log('training complete');
//     console.log('loss function '+lossValue);
//     a.print();
//     b.print();
// });


class Countries extends React.Component {
    constructor() {
        super();
        this.state = {
            countries: []
        }
    }

    //gets available countries from Worldbank API
    getCountries = () => {
        axios.get('http://api.worldbank.org/v2/countries?format=json&per_page=1000')
            .then(response => {
                //console.log(response.data);
                let countries = response.data[1];

                this.setState({
                    countries: countries.map((e) => {
                        return {name: e.name, id: e.id}
                        })
                });
                console.log(countries)
                console.log(this.state.countries)
            });
    };

    addCountry = (e) => {
        this.props.addPredefinedCountry(e.target.value)
    }

    componentDidMount() {
        this.getCountries();
    }

    render() {
        if (this.state.countries !== []) {
            return (
                <div className="model-definition__predefined-variables__countries">
                    <p>Country:</p>
                    <select name="countries" id="countries" onChange={this.addCountry}>
                        {this.state.countries.map(e => {
                            return <option key={e.id} value={e.id}>{e.name}</option>
                        })}
                    </select>
                   </div>
            )
        } else {
            return null;
        }
    }
}

function mapStateToProps(store) {
    return {
        predefinedCountries: store.predefinedCountries
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPredefinedCountry: type => {
            dispatch({type: 'ADD_COUNTRY', payload: type})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries);