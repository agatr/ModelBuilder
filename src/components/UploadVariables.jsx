import React from 'react';
import {connect} from "react-redux";
import CSVReader from 'react-csv-reader'

class UploadVariables extends React.Component {
    constructor() {
        super();
    }

    handleUpload = (response) => {

        console.log(response);

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
        this.props.setInitialXData(arr);
        this.props.setInitialYData(arr);

        // set initial x and y variable name (actually its index - which is always 0)
        // based on index I parse the data for xData and yData from the csv
        this.props.setInitialX(0);
        this.props.setInitialY(0);

        //enable button
        this.props.btnDisabled(false);
    }

    handleError = (error) => {
        console.log(error)
    }

    componentDidMount(){
        //disable button in the beginning
        if(this.props.fileDataHeader == 'upload file'){
            this.props.btnDisabled(true)
        }
    }

    handleChange = (e) => {
        console.log(e.target.files);

        if(e.target.files[0]) {

            console.log(e.target.files[0].type);

            if(e.target.files[0].type !== 'text/csv') {
                alert("Plik musi byc w formacie csv")
            }


            let file = new FileReader();

            file.onload = function(res) {
                console.log(res.target.result);

                let arr = []
                res.target.result.forEach(e=>{

                })

                //set header
                // this.props.setFileHeaders(res.target.result[0]);
                // console.log(this.props.setFileHeaders());

                // //store uploaded data
                // let responseData = [];
                // for (let i=1; i<response.length-1; i++) {
                //     responseData.push(response[i])
                // }
                // this.props.storeFileData(responseData);
                //
                // //set initial x and y data
                // let arr = [];
                // this.props.fileData.forEach((e) => {
                //     arr.push(Number(e[0]))
                // })
                // console.log('wpycham do tablicy', arr);
                // this.props.setInitialXData(arr);
                // this.props.setInitialYData(arr);
                //
                // // set initial x and y variable name (actually its index - which is always 0)
                // // based on index I parse the data for xData and yData from the csv
                // this.props.setInitialX(0);
                // this.props.setInitialY(0);
                //
                // //enable button
                // this.props.btnDisabled(false);


            }

            file.readAsText(e.target.files[0])


        }
    }

    render() {
        return (
            <div>
                <p>Select CSV</p>
                <CSVReader
                    cssClass="csv-input"
                    // label="Select CSV"
                    onFileLoaded={this.handleUpload}
                    onError={this.handleError}
                />

                <input onChange={this.handleChange} type="file"/>
            </div>
        )
    }
}


function mapStateToProps(store) {
    return {
        fileData: store.fileData,
        fileDataHeader: store.fileDataHeader,
        xData: store.xData,
        yData: store.yData,
        x: store.x,
        y: store.y,
        btnDisabled: store.btnDisabled
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
        },
        setInitialX: X => {
            dispatch({type: 'CHOOSE_X', payload: X})
        },
        setInitialY: Y => {
            dispatch({type: 'CHOOSE_Y', payload: Y})
        },
        btnDisabled: type => {
            dispatch({type: 'SET_DISABLED_STATE', payload: type})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadVariables);