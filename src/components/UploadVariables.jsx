import React from 'react';
import {connect} from "react-redux";
import CSVReader from 'react-csv-reader'

class UploadVariables extends React.Component {
    constructor() {
        super();
    }

    handleUpload = (response) => {
        //set header
        this.props.setFileHeaders(response[0]);

        //store uploaded data
        let responseData = [];
        for (let i=1; i<response.length-1; i++) {
            responseData.push(response[i])
        }
        this.props.storeFileData(responseData);

        //set initial x and y data
        let arr = [];
        this.props.fileData.forEach((e) => {
            arr.push(Number(e[0]))
        })
        this.props.setInitialXData(arr)
        this.props.setInitialYData(arr)
    }

    handleError = (error) => {
        console.log(error)
    }

    render() {
        return (

            <div>
                <p>upload variables</p>
                <CSVReader
                    cssClass="csv-input"
                    label="Select CSV"
                    onFileLoaded={this.handleUpload}
                    onError={this.handleError}
                />
            </div>
        )
    }
}


function mapStateToProps(store) {
    return {
        fileData: store.fileData,
        fileDataHeader: store.fileDataHeader,
        xData: store.xData,
        yData: store.yData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeFileData: data => {
            dispatch({type: 'STORE_DATA', payload: data})
        },
        setFileHeaders: headers => {
            dispatch({type: 'SET_HEADER', payload: headers})
        },
        setInitialXData: dataX => {
            dispatch({type: 'SET_DATA_X', payload: dataX})
        },
        setInitialYData: dataY => {
            dispatch({type: 'SET_DATA_Y', payload: dataY})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadVariables);