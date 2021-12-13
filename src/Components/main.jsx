import React, { Component } from 'react';
import './main.css';
import FOODBOX from './Foodbox';
import CALORIELIST from './calList';
import data from './food-data.json';


class HOME extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            typed: false,
            search_text: '',
            details: [...data],
            total_cal: 0,
            food_list: []
        }
    }

    search = () => {
        this.setState({search_text: document.getElementById("search-field").value});
        if (this.state.search_text !== ""){
            this.setState({typed: true})
        }
    }

    addToCart = (e) => {

            console.log(e.target.id);
            let food = document.getElementById(e.target.id);
            let temp = (this.state.food_list.length>0)?[...this.state.food_list]:[];
            let t_cal = this.state.total_cal + (parseInt(food.children[1].children[2].innerHTML.split(' ')[0])*food.children[2].children[0].value);

            temp.push(
                {
                    "id":Math.floor(Math.random()*1000),
                    "food":food.children[1].children[0].innerHTML,
                    "qty":parseInt(food.children[2].children[0].value),
                    "cal": parseInt(food.children[1].children[2].innerHTML.split(' ')[0])*food.children[2].children[0].value
                }
            )
            this.setState({food_list:temp})
            this.setState({total_cal: t_cal})
    }

    removeItem = (e) => {
        console.log(e.target.id);
        console.log(document.getElementById(e.target.id));
        let temp = [...this.state.food_list]
        for (let index = 0; index < temp.length; index++) {
            if(temp[index].id===parseInt(e.target.id) && index+1<temp.length){
                [temp[index], temp[index+1]] = [temp[index+1], temp[index]];
                console.log(temp);
            }
        }
        temp.pop();
        this.setState({food_list: temp})

    }

    render() { 
        return (
            <>
                <div className="head"><h2>Pro-Nutrition</h2></div>
                <div className="search-div">
                    <label htmlFor="search">Search</label>
                    <input type="text" placeholder="Name of Food" id="search-field" onChange={this.search}/>
                </div>

                {/* UPDATE FOOD DISPLAY */}
                {(this.state.typed) && this.state.details.filter((item)=>
                    item.name.startsWith(this.state.search_text)
                )
                .map((item)=>
                    <li className="box" key={item.id}><FOODBOX data={item}/></li>
                )}

                {(!this.state.typed) && this.state.details.map((item)=>
                    <li className="box" key={item.id}><FOODBOX data={item} callback={this.addToCart}/></li>
                )}

                <div className="caloriecart">
                    <h3>Today's Food {this.state.total_cal} cal</h3>
                    <ul>
                        {this.state.food_list.map((item) => <CALORIELIST key={this.state.food_list.length+"-"+item.food+"-"+item.qty} data={item} callback={this.removeItem}/>)}
                    </ul>
                </div>

            </>
        );
    }
}
 
export default HOME;