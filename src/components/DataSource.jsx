import React from "react";
import {connect} from "react-redux";

class DataSource extends React.Component {
    constructor() {
        super();
    }

    onChange = (e) =>{
        this.props.chooseSource(e.target.value);
    };

    render() {
        return (
            <div>
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
        dataSource: store.dataSource
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chooseSource: type => {
            dispatch({type: 'CHOOSE_SOURCE', payload: type})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSource);