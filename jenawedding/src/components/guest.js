import React, { Component } from 'react'
import '../App.css'
import '../Rsvp.css'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup';


class Guest extends Component {

    sendNotGoing = () => {
        const person = {
            party: this.props.party,
            attending: false,
            name: this.props.name
        }
        this.props.callback(person)
    }

    sendRsvp = () => {
        const person = {
            party: this.props.party,
            attending: true,
            name: this.props.name
        }
        this.props.callback(person)
    }

    render() {
        const {name, attending} = this.props
        return (
            <div>
                <h4 className='playfair center'>{name}</h4>
                <div className='container attendingButtons'>
                <button className = "attending" disabled={attending} onClick={this.sendRsvp}>Attending</button>
                <button className = "attending" disabled={!attending} onClick={this.sendNotGoing}>Not Attending</button>
                {/* <ButtonGroup variant="text" aria-label="text rgb(20,50,150) button group">
                    <Button color="default" disabled={attending} onClick={this.sendRsvp}>Attending</Button>
                    <Button color="default" disabled={!attending} onClick={this.sendNotGoing}>Not Attending</Button>
                </ButtonGroup> */}
                </div>
            </div>
        )
    }
}

export default Guest
