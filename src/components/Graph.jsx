import React from 'react';
import ReactDOM from 'react-dom';

window.d3 = require('d3');
// const functionPlot = require('function-plot');
import {connect} from "react-redux";
import {Chart} from "react-charts";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Graph extends React.Component {
    constructor() {
        super();
    }

    // componentDidMount() {

    //
    // let test = '4x+5';
    // let test2 = this.props.a+'x'+this.props.b;
    //
    // functionPlot({
    //     target: '#model',
    //     data: [{
    //         fn: this.props.a+'x'+this.props.b
    //     }]
    // })
    //
    // functionPlot({
    //     target: '#model',
    //     data: [{
    //         points: [
    //             [1, 1],
    //             [2, 1],
    //             [2, 2],
    //             [1, 2],
    //             [1, 1]
    //         ],
    //         fnType: 'points',
    //         graphType: 'scatter'
    //     }]
    // })
    //
    // let test3 = this.props.b;
    // let test4 = this.props.a;
    // var board = JXG.JSXGraph.initBoard('box', {boundingbox: [-20, 20, 20, -20], axis:true});
    // var fA=function(x){return 3*x+test3;};
    //
    // var f = board.create('functiongraph',fA);
    // }


    componentDidMount() {
        // Create chart instance
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        let data = [];

        if (this.props.xData.length>0) {
            for (let i=0;i<this.props.xData.length;i++){
                data.push({
                    "ax": this.props.xData[i],
                    "ay": this.props.yData[i]
                })
            }
        }

        console.log('this is data', data);


        // Add data
        chart.data = data;

        // Create X Axis
        let valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxisX.title.text = 'X Axis';
        valueAxisX.renderer.minGridDistance = 40;

        // Create Y Axis
        let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxisY.title.text = 'Y Axis';

        // Create series
        let lineSeries = chart.series.push(new am4charts.LineSeries());
        lineSeries.dataFields.valueY = "ay";
        lineSeries.dataFields.valueX = "ax";
        lineSeries.strokeOpacity = 0;


        // Add a bullet
        let bullet = lineSeries.bullets.push(new am4charts.Bullet());

        // Add a triangle to act as am arrow
        let arrow = bullet.createChild(am4core.Triangle);
        arrow.horizontalCenter = "middle";
        arrow.verticalCenter = "middle";
        arrow.strokeWidth = 0;
        arrow.fill = chart.colors.getIndex(0);
        arrow.direction = "top";
        arrow.width = 12;
        arrow.height = 12;

        //add the trendlines
        let trend = chart.series.push(new am4charts.LineSeries());
        trend.dataFields.valueY = "value2";
        trend.dataFields.valueX = "value";
        trend.strokeWidth = 2;
        trend.stroke = chart.colors.getIndex(0);
        trend.strokeOpacity = 0.7;
        trend.data = [
            {"value": 1, "value2": Number(5.55)},
            {"value": 2, "value2": Number(this.props.a) * 2 + Number(this.props.b)},
            {"value": 3, "value2": Number(this.props.a) * 3 + Number(this.props.b)},
            {"value": 4, "value2": Number(this.props.a) * 4 + Number(this.props.b)},
        ];

        this.chart = chart;
    }


    render() {
        return (
            <div className="model-output__graph">
                <div id="chartdiv" style={{width: "400px", height: "300px"}}>

                </div>


                <div
                    style={{
                        width: "400px",
                        height: "300px"
                    }}
                >
                    {/*<Chart*/}
                    {/*data={[*/}

                    {/*{*/}
                    {/*label: "Series 2",*/}
                    {/*data: [[0, Number(this.props.a) * 0 + Number(this.props.b)],*/}
                    {/*[1, Number(this.props.a) * 1 + Number(this.props.b)],*/}
                    {/*[2, Number(this.props.a) * 2 + Number(this.props.b)],*/}
                    {/*[3, Number(this.props.a) * 3 + Number(this.props.b)],*/}
                    {/*[4, Number(this.props.a) * 4 + Number(this.props.b)]]*/}
                    {/*}*/}
                    {/*]}*/}
                    {/*axes={[*/}
                    {/*{ primary: true, type: "linear", position: "bottom" },*/}
                    {/*{ type: "linear", position: "left" }*/}
                    {/*]}*/}
                    {/*/>*/}
                </div>


                {/*<div id="box" className="jxgbox"></div>*/}

                {/*<div id="model"></div>*/}
                {/*<button onClick={this.updateGraph}>update</button>*/}
            </div>

        )
    }
}

function mapStateToProps(store) {
    return {
        xData: store.xData,
        yData: store.yData,
        a: store.a,
        b: store.a
    }
}

export default connect(mapStateToProps)(Graph)