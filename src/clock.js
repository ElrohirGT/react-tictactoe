import React, { useState, useEffect } from 'react';

export function Clock(props) {
    const [date, setDate] = useState(new Date());

    function tick() {
        setDate(new Date());
    }

    //Passing an empty array as the second argument
    //will tell React this effect has no dependencies on properties of the component.
    //Therefore it will be only cleaned once at the end.
    useEffect(()=>{
        let intervalId = setInterval(() => tick(), 1000);
        return () => clearInterval(intervalId);
    }, []); 

    return (
        <div>
            <h1>Hello! </h1>
            <h2>Current time: {date.toLocaleTimeString()}</h2>
        </div>
    );
}