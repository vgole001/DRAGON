import React from "react";
import * as signalR from '@microsoft/signalr'
import { eventsBaseUrl } from '../BackendUrl'
import LoadingIcon from './LoadingIcon'
import { Table, Spinner, Button } from 'react-bootstrap'
import { FaTrashAlt } from 'react-icons/fa';
import EventButtons from './EventButtons'
import Footer from './Footer'
import '../styles/EventLoader.css'

class LoadUpcomingEvents extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            events: [],
            hubConnection: null
        }
    }

    componentDidMount = () =>{
        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(eventsBaseUrl + 'hubs/events')
            .build();
        
        this.setState({hubConnection}, () => {
            this.state.hubConnection
                .start()
                .then(()=>console.log('Connection started!'))
                .catch(error=>console.log('Failed establishing connection.',error))
            
            this.state.hubConnection.on('ReceiveUpcomingEvents', (event) => {
                const currentEvent = event;
                const foo = this.state.events.concat([JSON.parse(currentEvent)])
                const events = [].concat.apply([], foo);
                this.setState(state => ({
                    events: events 
                }))
            })
        })
    }

    parading(){
        console.log('PARADING PRESSED')
    }

    atPost(){
        console.log('AT POST PRESSED')
    }

    off = (index)=>{
        console.log('OFF PRESSED')
        const btns = document.querySelectorAll(`[id='${index}']`)
        btns.forEach(btn => {
            btn.disabled = true
        });
    }

    finish(){
        console.log('FINISH PRESSED')
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    deleteEvent = (index) =>{
        const delConfirm = window.confirm('Are you sure you want to delete this forever?')
        if(delConfirm){
            this.setState(state => {
                const events = [...this.state.events];
                events.splice(index, 1);
                return {
                    events: events
                };
            });
            const lala = document.querySelectorAll(`[data-lala='${index}']`)
            lala.forEach(bar => {bar.remove()})
        }
    }

    render(){
        const data = this.state.events.map((event, index) => {
            return(
                <tr data-lala={index} key={index}>
                    <th>{event.event_id}</th>
                    <td>{event.event_track}</td>
                    <td>{event.feed_code}</td>
                    <td>{event.event_time}</td>
                    <td><EventButtons
                        id = {index}
                        data-foo = {index}
                        parading = {this.parading}
                        atPost = {this.atPost} 
                        off = {() => this.off(index)}
                        finish = {this.finish}
                        />
                        <button
                            data-index={index}
                            className='btn btn-danger btn-sm'
                            onClick={()=>this.deleteEvent(index)}
                            style={{float:'right'}}
                        >
                            <FaTrashAlt size={16}/>
                        </button>
                    </td>
                </tr>   
            ) 
        });
        
        return (
            <div className='container-fluid'>
                <div className='tableFixHead'>
                    {!this.state.events || !this.state.events.length ?
                        <LoadingIcon/>
                        :        
                        <Table hover className="table" style={{fontSize:'0.8rem'}}>
                            <thead>
                                <tr>
                                    <th>Event ID</th>
                                    <th>Race Course</th>
                                    <th>Feed Name</th>
                                    <th style={{textAlign:'center'}}>Race Time (UTC)</th>
                                    <th style={{textAlign:'center'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td> 
                                        Loading more {' '}
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    </td>
                                </tr>
                            </tfoot>
                        </Table>
                    }
                </div>
                <Footer events={this.state.events.length}/>                
            </div>
        )
    }
}

export default LoadUpcomingEvents