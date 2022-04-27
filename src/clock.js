import React from 'react';

export class Clock extends React.Component {
    TimerID = 0;

    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.TimerID = setInterval(()=>this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.TimerID);
    }

    render() {
        return (
            <div>
                <h1>Hello! </h1>
                <h2>Current time: {this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }

    tick() {
        this.setState({ date: new Date() });
    }
}