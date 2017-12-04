import React, { Component } from 'react';
import {listEvents} from '../controllers/event.controller';

export default class Event extends Component{
    constructor(props){
        super(props);
        this.state={
            events: [],
            error: ''
        }
    }

    componentDidMount(){
        listEvents((response)=>{
            if(response.code === "1")
                this.setState({events: response.data});
            else
                this.setState({error: response.data});
        });
    }

    render(){
        let arrayOfEvents = this.state.error !== undefined? 
            this.state.events.map((event) => 
                <li key={event.entityKey}>{event.name}</li>
            ) : this.state.error;
        return(
            <div>
                <div>{arrayOfEvents}</div>
            </div>
        )
    }
}