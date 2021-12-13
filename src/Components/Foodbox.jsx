import React from 'react';
import './Foodbox.css';


let FOODBOX = (props)=>{
    return (
        <article id={props.data.id}>
            <div>
                <img src={props.data.imgLink} alt={props.data.name}/>
            </div>
            <div className="content">
                <strong>{props.data.name}</strong> <br/>
                <small>{props.data.cal}</small>
            </div>
            <div className="control">
                <input className="input" type="number" defaultValue="1" />
                <button className="button" id={props.data.id} onClick={props.callback}>+</button>
            </div>
        </article>
    );
}


 
export default FOODBOX;