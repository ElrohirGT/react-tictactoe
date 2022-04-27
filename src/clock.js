import React, { useState, useEffect } from 'react';

export function Clock(props) {
    const [date, setDate] = useState(new Date());

    function tick() {
        setDate(new Date());
    }

    useEffect(()=>{
        let intervalId = setInterval(() => tick(), 1000);
        return () => clearInterval(intervalId);
    });

    return (
        <div>
            <h1>Hello! </h1>
            <h2>Current time: {date.toLocaleTimeString()}</h2>
        </div>
    );
}

// export class Clock extends React.Component {
//     TimerID = 0;

//     constructor(props) {
//         super(props);
//         this.state = {date: new Date()};
//     }

//     componentDidMount() {
//         this.TimerID = setInterval(()=>this.tick(), 1000);
//     }

//     componentWillUnmount() {
//         clearInterval(this.TimerID);
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Hello! </h1>
//                 <h2>Current time: {this.state.date.toLocaleTimeString()}</h2>
//             </div>
//         );
//     }

//     tick() {
//         this.setState({ date: new Date() });
//     }
// }