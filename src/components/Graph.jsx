import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import {Chart} from "react-charts";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter, ScatterChart, ResponsiveContainer} from 'recharts';

class Graph extends React.Component {
    constructor() {
        super();
    }

    handleSelectChange = (e) => {
        this.setState({
            a: e.target.value
        })
    }

    render() {

        let maxX = Math.max(...this.props.xData);
        let minX = Math.min(...this.props.xData);

        let dataLine = [
            {x: minX, y: Number(this.props.a)*minX+Number(this.props.b)},
            {x: maxX, y: Number(this.props.a)*maxX+Number(this.props.b)}
        ]

        let dataScatter = [];

        if (this.props.xData.length > 0) {
            for (let i = 0; i < this.props.xData.length; i++) {
                dataScatter.push({
                    x: this.props.xData[i],
                    y: this.props.yData[i]
                })
            }
        }

        return (
            <div className="model-output__graph" style={{width: "99%", height: "500px"}}>
                <ResponsiveContainer style={{width: "99%", height: "100%"}}>
                    <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey={'x'} type="number" name='x' domain={['auto', 'auto']}/>
                        <YAxis dataKey={'y'} type="number" name='y' domain={['auto', 'auto']}/>
                        <Scatter name='A school' data={dataScatter} fill='#C96758'/>
                        <Scatter data={dataLine} fill='#037f51' line shape={()=>{}}/>
                        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        xData: store.xData,
        yData: store.yData,
        a: store.a,
        b: store.b
    }
}

export default connect(mapStateToProps)(Graph)