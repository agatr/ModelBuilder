import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import * as tf from "@tensorflow/tfjs/dist/index";


class ModelEquation extends React.Component {
    constructor() {
        super();
    }

    componentDidMount(){
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
            const learningRate = 0.1;
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


        // if (this.props.xData.length > 0) {
        //     const x_train = tf.tensor(this.props.xData);
        //     const y_train = tf.tensor(this.props.yData);
        //
        //     train(x_train, y_train, 5).then(() => {
        //         console.log('training complete');
        //         console.log('loss function ' + lossValue);
        //         a.print();
        //         b.print();
        //     });
        // }

        const x_train = tf.tensor([1,2,3]);
        const y_train = tf.tensor([1,2,3]);

        train(x_train, y_train, 3).then(() => {
            console.log('training complete');
            console.log('loss function ' + parseFloat(lossValue));
            console.log('type ' + parseFloat(Number(lossValue.toString())));
            console.log('test ' + parseFloat(10.21313131).toFixed(2));
            a.print();
            b.print();
        });
        a.print();
        this.props.setA(parseFloat(a.dataSync()).toFixed(2));
        this.props.setB(parseFloat(b.dataSync()).toFixed(2));
        this.props.setLoss(parseFloat(lossValue).toFixed(2));

        //END OF MODEL GENERATION
    }

    render() {

        return (
            <div>
                <p>data for x:</p>
                {this.props.xData}
                <p>data for y:</p>
                {this.props.yData}
                <p>iterations</p>
                {this.props.iterations}
                <p>Model equation:</p>
                <p>y = {this.props.a} x + {this.props.b}</p>
                {this.props.loss}
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        xData: store.xData,
        yData: store.yData,
        iterations: store.iterations,
        a: store.a,
        b: store.b,
        loss: store.loss
    }
}

function mapDispatchToProps(dispatch) {
    return {
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

export default connect(mapStateToProps,mapDispatchToProps)(ModelEquation);