import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class BookInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            book: null
        }

    }
    render(){


        if(!this.state.book) {
            return <p>Loading ....</p>
        }
        return (
            <div>{this.state.book.volumeInfo.title}</div>
        )
    }

    componentDidMount() {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.props.isbn}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    book: res.data.items[0]
                })
            })
    }
}
document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <BookInfo isbn={"0747532699"}></BookInfo>,
        document.getElementById('app')
    );
});


import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function () {

    class ModelParent extends React.Component {
        constructor() {
            super();
            this.state = {
                modelType: ' initial'
            }
        }

        //callback function - passed to Model Definition->ModelSettings to receive child state change
        //later passed to ModelType as props (so in the end getting state change from grandgrandchild)
        handleModelTypeChange = (modelType) => {
            this.setState({
                modelType: modelType
            })
            console.log(this.state.modelType);
        }

        render() {
            return (
                <div>
                    <ModelDefinition onChange={this.handleModelTypeChange}/>
                    <h1>{this.state.modelType}</h1>
                    <ModelOutput modelType={this.state.modelType}/>
                </div>

            )
        }
    }

    class ModelDefinition extends React.Component {
        constructor() {
            super();
        }

        render() {
            return (
                <div>
                    <ModelSettings onChange={this.props.onChange}/>
                </div>
            )
        }
    }

    class ModelSettings extends React.Component {
        constructor() {
            super();
            this.state = {
                modelType: 'Initial model type state',
                dataSource: ''
            }
        }


        //handle data source returned from DataSource component

        render() {
            return (
                <div>
                    {/*callback function passed from ModelDefinition (parent) as props:*/}
                    <ModelType onChange={this.props.onChange}/>

                </div>
            )
        }
    }

    class ModelType extends React.Component {
        constructor() {
            super();
            this.state = {
                models: ['Linear Regression', 'Multiple Regression'],
                selectedModel: ''
            }
        }

        setModel = (e) => {
            this.setState({selectedModel: e.target.value})
        }

        setModelTypeForParent = (e) => {
            this.props.onChange(e.target.value);
        }

        render() {
            return (
                <div>
                    <select name="frequency" id="frequency" onChange={this.setModelTypeForParent}>
                        {this.state.models.map(e => {
                            return <option key={e} value={e}>{e}</option>
                        })}
                    </select>
                </div>

            )
        }
    }

    // class DataSource extends React.Component {
    //     constructor() {
    //         super();
    //         this.state = {
    //             sources: ['WorldBank', 'Own Data'],
    //             selectedSource: ''
    //         }
    //     }
    //
    //     setSource = (e) => {
    //         this.setState({selectedSource: e.target.value})
    //     }
    //
    //     render() {
    //         return (
    //             <div>
    //                 <select name="frequency" id="frequency" onChange={this.setSource}>
    //                     {this.state.sources.map(e => {
    //                         return <option key={e} value={e}>{e}</option>
    //                     })}
    //                 </select>
    //             </div>
    //
    //         )
    //     }
    // }

    //http://api.worldbank.org/v2/countries/chn;bra/indicators/DPANUSSPB?date=2012M01:2012M03
    //when indicator chosen, call API to get max and min year
    //put years from min to max into array
    //add to selection boxes
    //limit max array based on chosen min value

    // class timeFrame extends React.Component {
    //     constructor() {
    //         super();
    //         this.state = {
    //             minYear: '2000',
    //             maxYear: '2018',
    //             yearsMin: [],
    //             yearsMax: []
    //         }
    //     }
    //
    //     render(){
    //         return (
    //
    //         )
    //     }
    //  }


    class ModelOutput extends React.Component {
        constructor() {
            super();
        }
        render(){
            return (
            <div>
                <ModelEquation modelType={this.props.modelType}/>
            </div>
            )
        }
     }

    class ModelEquation extends React.Component {
        constructor() {
            super();
        }
        render(){
            if (this.props.modelType === 'Linear Regression'){
                return (
                    //<h1>{this.props.y}={this.props.a}*{this.props.x}+{this.props.residual}</h1>
                    <h1>y = ax + b</h1>
                )
            } else if (this.props.modelType === 'Multiple Regression'){
                return (
                    //<h1>{this.props.y}={this.props.a}*{this.props.x1}+{this.props.b}*{this.props.x2}+{this.props.residual}</h1>
                    <h1>y = ax1 + bx2 + ... + residual</h1>
                )
            } else {
                return null;
            }

        }
     }

    // class Frequency extends React.Component {
    //     constructor() {
    //         super();
    //         this.state = {
    //             frequencies: ['Yearly', 'Quarterly', 'Monthly'],
    //             selectedFrequency: '',
    //             selectedFrequencyCode: ''
    //         }
    //     }
    //
    //     setFrequency = (e) => {
    //         this.setState({selectedFrequency: e.target.value, selectedFrequencyCode: e.target.value[0]})
    //     }
    //
    //     render() {
    //         return (
    //             <div>
    //                 <select name="frequency" id="frequency" onChange={this.setFrequency}>
    //                     {this.state.frequencies.map(e => {
    //                         return <option key={e} value={e}>{e}</option>
    //                     })}
    //                 </select>
    //             </div>
    //
    //         )
    //     }
    // }
    //
    // class Indicators extends React.Component {
    //     constructor() {
    //         super();
    //         this.state = {
    //             indicators: [],
    //             selectedIndicators: []
    //         }
    //     }
    //
    //     getIndicators = () => {
    //         let indicatorsUrl = 'http://api.worldbank.org/v2/indicators?format=json';
    //
    //         fetch(indicatorsUrl + '&per_page=100')
    //             .then(response => response.json())
    //             .then(data => {
    //                 let indicators = data[1];
    //
    //                 this.setState({
    //                     indicators: indicators.map(e => e.name)
    //                 });
    //
    //                 console.log(this.state.indicators)
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             });
    //
    //     }
    //
    //     addIndicator = (e) => {
    //         this.setState({selectedIndicators: [...this.state.selectedIndicators, e.target.value]});
    //     };
    //
    //     //removes country from selected ones
    //     removeIndicator = (e) => {
    //         this.setState({indicators: this.state.indicators.filter(val => val != e.target.value)})
    //     };
    //
    //     handleSelectedIndicators = (e) => {
    //         this.addIndicator(e);
    //         this.removeIndicator(e);
    //     }
    //
    //     componentDidMount() {
    //         this.getIndicators();
    //     }
    //
    //     render() {
    //         if (this.state.indicators !== []) {
    //             return (
    //                 <div>
    //                     <select name="indicators" id="indicators" onChange={this.handleSelectedIndicators}>
    //                         {this.state.indicators.map(e => {
    //                             return <option key={e} value={e}>{e}</option>
    //                         })}
    //                     </select>
    //                     <div>{this.state.selectedIndicators.map(e => {
    //                         return <p key={e}>{e}</p>
    //                     })}</div>
    //                 </div>
    //             )
    //         } else {
    //             return null;
    //         }
    //     }
    // }
    //
    // class Topics extends React.Component {
    //     constructor() {
    //         super();
    //         this.state = {
    //             topics: [],
    //             selectedTopics: []
    //         }
    //     }
    //
    //     getTopics = () => {
    //         let topicsUrl = 'http://api.worldbank.org/v2/topics?format=json';
    //
    //         fetch(topicsUrl + '&per_page=100')
    //             .then(response => response.json())
    //             .then(data => {
    //                 let topics = data[1];
    //
    //                 this.setState({
    //                     topics: topics.map(e => e.value)
    //                 });
    //
    //                 console.log(this.state.topics)
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             });
    //
    //     }
    //
    //     addTopic = (e) => {
    //         this.setState({selectedTopics: [...this.state.selectedTopics, e.target.value]});
    //     };
    //
    //     //removes country from selected ones
    //     removeTopic = (e) => {
    //         this.setState({topics: this.state.topics.filter(val => val != e.target.value)})
    //     };
    //
    //     handleSelectedTopics = (e) => {
    //         this.addTopic(e);
    //         this.removeTopic(e);
    //     }
    //
    //     componentDidMount() {
    //         this.getTopics();
    //     }
    //
    //     render() {
    //         if (this.state.topics !== []) {
    //             return (
    //                 <div>
    //                     <select name="topics" id="topics" onChange={this.handleSelectedTopics}>
    //                         {this.state.topics.map(e => {
    //                             return <option key={e} value={e}>{e}</option>
    //                         })}
    //                     </select>
    //                     <div>{this.state.selectedTopics.map(e => {
    //                         return <p key={e}>{e}</p>
    //                     })}</div>
    //                 </div>
    //             )
    //         } else {
    //             return null;
    //         }
    //     }
    // }
    //
    // class Countries extends React.Component {
    //     constructor() {
    //         super();
    //         this.state = {
    //             countries: [],
    //             selectedCountries: []
    //         }
    //     }
    //
    //     //gets available countries from Worldbank API
    //     getCountries = () => {
    //         let countriesUrl = 'http://api.worldbank.org/v2/countries?format=json';
    //
    //         fetch(countriesUrl + '&per_page=100')
    //             .then(response => response.json())
    //             .then(data => {
    //                 let countries = data[1];
    //
    //                 this.setState({
    //                     countries: countries.map(e => e.name)
    //                 });
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             });
    //     };
    //
    //     //adds country to selected ones
    //     addCountry = (e) => {
    //         this.setState({selectedCountries: [...this.state.selectedCountries, e.target.value]});
    //     };
    //
    //     //removes country from selected ones
    //     removeCountry = (e) => {
    //         this.setState({countries: this.state.countries.filter(val => val != e.target.value)})
    //     };
    //
    //     handleSelectedCoutry = (e) => {
    //         this.addCountry(e);
    //         this.removeCountry(e);
    //     }
    //
    //     componentDidMount() {
    //         this.getCountries();
    //     }
    //
    //     render() {
    //         if (this.state.countries !== []) {
    //             return (
    //                 <div>
    //                     <select name="countries" id="countires" onChange={this.handleSelectedCoutry}>
    //                         {this.state.countries.map(e => {
    //                             return <option key={e} value={e}>{e}</option>
    //                         })}
    //                     </select>
    //                     <div>{this.state.selectedCountries.map(e => {
    //                         return <p key={e}>{e}</p>
    //                     })}</div>
    //                 </div>
    //             )
    //         } else {
    //             return null;
    //         }
    //     }
    // }
    //
    // class App extends React.Component {
    //     constructor() {
    //         super();
    //     }
    //
    //     render() {
    //         return (
    //             <div>
    //                 <ModelType/>
    //                 <DataSource/>
    //                 <Countries/>
    //                 <Topics/>
    //                 <Indicators/>
    //                 <Frequency/>
    //                 <Model model='LR'/>
    //             </div>
    //         )
    //     }
    // }


    ReactDOM.render(
        <ModelParent/>,
        document.getElementById('app')
    );
});





