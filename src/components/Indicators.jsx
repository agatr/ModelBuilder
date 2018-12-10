import React from "react";
import axios from 'axios';
import {connect} from "react-redux";

class Indicators extends React.Component {
    constructor() {
        super();
        this.state = {
            indicators: []
        }
    }

    getIndicators = () => {
        let indicatorsUrl = 'http://api.worldbank.org/v2/indicators?format=json';

        axios.get('http://api.worldbank.org/v2/topics/3/indicators?format=json&per_page=1000')
            .then(response => {
                let indicators = response.data[1];

                this.props.loadIndicators(
                    indicators.map(e => {
                        return {name: e.name, id: e.id}
                    })
                )
            });
    };

    addIndicator = (e) => {
        this.props.addPredefinedIndicator(e.target.value)
    };

    componentDidMount() {
        this.getIndicators();
    }

    render() {
        return (<div></div>)
    }
}
function mapStateToProps(store) {
    return {
        predefinedIndicators: store.predefinedIndicators,
        indicators: store.indicators
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPredefinedIndicator: type => {
            dispatch({type: 'ADD_INDICATOR', payload: type})
        },
        loadIndicators: type => {
            dispatch({type: 'LOAD_INDICATORS', payload: type})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Indicators);