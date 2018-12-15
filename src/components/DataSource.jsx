import React from "react";
import {connect} from "react-redux";

class DataSource extends React.Component {
    constructor() {
        super();
    }



    onChange = (e) =>{
        this.props.chooseSource(e.target.value);
        if (e.target.value === "Own data" ){
            this.props.setFileHeaders(['upload file'])
        }

        if (e.target.value === "World Bank") {
            this.props.btnDisabled(false)
        }
    };

    render() {
       return (
            <div className="model-definition__model-settings_data-source model-el">
                <p>Data source:</p>
                <select name="dataSource" id="ds" onChange={this.onChange}>
                    <option value="World Bank">World Bank</option>
                    <option value="Own data">Own data</option>
                </select>
            </div>

        )
    }
}

function mapStateToProps(store) {
    return {
        dataSource: store.dataSource,
        btnDisabled: store.btnDisabled
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chooseSource: type => {
            dispatch({type: 'CHOOSE_SOURCE', payload: type})
        },
        btnDisabled: type => {
            dispatch({type: 'SET_DISABLED_STATE', payload: type})
        },
        setFileHeaders: headers => {
            dispatch({type: 'SET_HEADER', payload: headers})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSource);