import React from 'react';
import ReactDOM from 'react-dom';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export class Graph extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        // Create chart instance
        let chart = am4core.create("chartdiv", am4charts.XYChart);

// Add data
        chart.data = [{
            "ax": 1,
            "ay": 0.5
        }, {
            "ax": 2,
            "ay": 1.3
        }, {
            "ax": 3,
            "ay": 2.3
        }, {
            "ax": 4,
            "ay": 2.8
        }, {
            "ax": 5,
            "ay": 3.5
        }, {
            "ax": 6,
            "ay": 5.1
        }, {
            "ax": 7,
            "ay": 6.7
        }, {
            "ax": 8,
            "ay": 8
        }, {
            "ax": 9,
            "ay": 8.9
        }, {
            "ax": 10,
            "ay": 9.7
        }, {
            "ax": 11,
            "ay": 10.4
        }, {
            "ax": 12,
            "ay": 11.7
        }];

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
        trend.strokeWidth = 2
        trend.stroke = chart.colors.getIndex(0);
        trend.strokeOpacity = 0.7;
        trend.data = [
            { "value": 1, "value2": 2 },
            { "value": 12, "value2": 11 }
        ];

        // //scrollbars
        // chart.scrollbarX = new am4core.Scrollbar();
        // chart.scrollbarY = new am4core.Scrollbar();

        this.chart = chart;
    }

    componentDidUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <div>
                <div id="chartdiv" style={{width: "500px", height: "500px"}}></div>
            </div>

        )
    }
}


