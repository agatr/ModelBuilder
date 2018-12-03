import React from "react";

export class Topics extends React.Component {
    constructor() {
        super();
        this.state = {
            topics: [],
            selectedTopics: []
        }
    }

    getTopics = () => {
        let topicsUrl = 'http://api.worldbank.org/v2/topics?format=json';

        fetch(topicsUrl + '&per_page=100')
            .then(response => response.json())
            .then(data => {
                let topics = data[1];

                this.setState({
                    topics: topics.map(e => e.value)
                });

                //console.log(this.state.topics)
            })
            .catch(error => {
                console.log(error);
            });

    }

    addTopic = (e) => {
        this.setState({selectedTopics: [...this.state.selectedTopics, e.target.value]},()=>{this.props.onTopicsChange(this.state.selectedTopics)});
    };

    //removes country from selected ones
    removeTopic = (e) => {
        this.setState({selectedTopics: this.state.selectedTopics.filter(val => val != e.target.id)},()=>{this.props.onTopicsChange(this.state.selectedTopics)})
    };


    componentDidMount() {
        this.getTopics();
    }

    render() {
        if (this.state.topics !== []) {
            return (
                <div>
                    <select name="topics" id="topics" onChange={this.addTopic}>
                        {this.state.topics.map(e => {
                            return <option key={e} value={e}>{e}</option>
                        })}
                    </select>
                    <div>{this.state.selectedTopics.map(e => {
                        return <p key={e} id={e} onClick={this.removeTopic}>{e}</p>
                    })}</div>
                </div>
            )
        } else {
            return null;
        }
    }
}