import React from 'react';
import './calList.css';

let CALORIELIST = (props) => {
    return (

        <li id={props.data.id}>
            <span>{props.data.qty} {props.data.food} = {props.data.cal}</span> 
            <button className="remove" id={props.data.id} onClick={props.callback}>x</button>
        </li>
    )
}


export default CALORIELIST