import React from "react";
import {connect} from 'react-redux';

class ModelType extends React.Component {
    constructor() {
        super();
    }

    onChange = (e) => {
        this.props.chooseType(e.target.value);
    }

    render() {
        return (
            <div>
                <select name="modelType" id="modelType" onChange={this.onChange}>
                    <option key="lr" value="Linear Regression">Linear Regression</option>
                    <option key="ml" value="Multiple regression">Multiple regression</option>
                </select>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        modelType: store.modelType
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chooseType: type => {
            dispatch({type: 'CHOOSE_TYPE', payload: type})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelType);