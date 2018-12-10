import React from 'react';
import ReactDOM from 'react-dom';
import Countries from './Countries.jsx';
import Indicators from './Indicators.jsx';
import UploadVariables from './UploadVariables.jsx';
import {connect} from "react-redux";

class PredefinedVariables extends React.Component {
    constructor() {
        super();
    }


    render() {
        return (
            <div className="model-definition__predefined-variables">
                {this.props.dataSource === 'World Bank' ?
                    <>
                        <Countries/>
                        <Indicators/>
                    </> :
                    <UploadVariables/>}
            </div>

        )
    }
}

function mapStateToProps(store) {
    return {
        dataSource: store.dataSource
    }
}

export default connect(mapStateToProps)(PredefinedVariables);


