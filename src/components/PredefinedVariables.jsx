import React from 'react';
import ReactDOM from 'react-dom';
import Countries from './Countries.jsx';
import Indicators from './Indicators.jsx';

export class PredefinedVariables extends React.Component {
    constructor() {
        super();
    }


    render() {
        return (
            <div>
                <Countries/>
                <Indicators/>
            </div>

        )
    }
}


