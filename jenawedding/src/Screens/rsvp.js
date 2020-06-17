import React, { Component } from 'react'
import Guest from '../components/guest'
import axios from 'axios'
import '../Rsvp.css'
import TextField from '@material-ui/core/TextField';

axios.defaults.baseURL = "https://us-central1-jenawedding-ecede.cloudfunctions.net/api"



class Rsvp extends Component {
    constructor() {
        super()
        this.state={
            search: '',
            originalAttendeesList: [],
            partyAttendees: [],
            error: '',
            loading: false,
            loaded: false,
            email: "",
            emailError: false,
            emailLoading: false,
            emailSuccess: false,
            success: false,
            loadingSubmit: false
        }
    }

    searchChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    capitalize = (name) => {
        const nameList = name.split(' ')
        const newNameList = []
        nameList.forEach(n => {
            const newName = n[0].toUpperCase() + n.substring(1, name.length)
            newNameList.push(newName)
        })
        return newNameList.join(' ')
    }

    searchName = () => {
        this.setState({loading: true, success: false})
        const name = this.capitalize(this.state.search).replace(' ', '%20')        
        axios.get(`guests/${name}`, ()=>{
            return {withCredentials: true}
        })
        .then((res) => {
            if (res) {
            this.setState({
                originalAttendeesList: res.data.members,
                partyAttendees: res.data.members,
                error: ''
            })
            this.setState({loading: false, loaded: true})
        }
        })
        .catch(err => {
            this.setState({loading: false, loaded: false})
            console.error(err)
            this.setState({error: `${this.state.search} not found`})
        })
    }

    guestRsvpCallBack = data => {
        const newList = this.state.partyAttendees.filter(person => person.name !== data.name)
        newList.push(data)
        this.setState({partyAttendees: newList.sort((a,b)=> (a.name > b.name ? 1 : -1))})
    }

    // onUnload = () => {
    //     const {partyAttendees, originalAttendeesList} = this.state
    //     if (JSON.stringify(partyAttendees) !== JSON.stringify(originalAttendeesList)) {
    //         axios.post('guests',{
    //             party: this.state.partyAttendees[0].party,
    //             members: partyAttendees
    //         })
    //         .then(() => {
    //             console.log("Guest information successfully changed!")
    //         })
    //         .catch(err => {
    //             console.error(err)
    //         })
    //     } else {
    //         console.log("Guest hasn't made any changes!")
    //     }
    // }
    
    componentWillUnmount() {
        const {partyAttendees, originalAttendeesList} = this.state
        if (JSON.stringify(partyAttendees) !== JSON.stringify(originalAttendeesList)) {
            axios.post('guests',{
                party: this.state.partyAttendees[0].party,
                members: partyAttendees
            })
            .then(() => {
                console.log("Guest information successfully changed!")
            })
            .catch(err => {
                console.error(err)
            })
        } else {
            console.log("Guest hasn't made any changes!")
        } 
    }

    submitRSVP = () => {
        const {partyAttendees, originalAttendeesList} = this.state
        this.setState({loadingSubmit: true})
        if (JSON.stringify(partyAttendees) !== JSON.stringify(originalAttendeesList)) {
            axios.post('guests',{
                party: this.state.partyAttendees[0].party,
                members: partyAttendees
            })
            .then(() => {
                console.log("Guest information successfully changed!")
                this.setState({success: true, loadingSubmit: true})
            })
            .catch(err => {
                console.error(err)
                this.setState({loadingSubmit: false})
            })
        } else {
            console.log("Guest hasn't made any changes!")
        }
    }

    submitEmail = () => {
        this.setState({emailLoading:true})
        axios.post('/email', {
            email: this.state.email.trim()
        }).then(()=> {
            console.log("Email Saved")
            this.setState({email: "", emailError: false, emailLoading: false, emailSuccess: true})
        }).catch((err)=> {
            console.log(err)
            this.setState({emailError: true, emailLoading: false})
        })
    }

    render() {
        return (
            <div style={{textAlign: 'center', display: "flex", flexDirection: "column", alignItems: "center"}}>
                {/* <p style={{fontFamily: "Barlow Condensed"}}>Please enter your first and last name and click Search. <br></br>If you're unable to find your name, enter another guest in your party's name.</p>
                <div style={{marginBottom: '2em', display: "flex",flexDirection: "row", justifyContent: "center"}}>
                    <div style={{marginRight: "10%"}}>
                    <TextField onChange={this.searchChange} value={this.state.search} name='search' autoFocus = {true} type='text' label='Search Name' />
                    </div>
                    <button disabled={this.state.loading} className='searchButton' onClick={this.searchName}>Search</button>
                </div>
                <p className='error'>{this.state.error}</p>
                <p style={{fontFamily: "Barlow Condensed", fontSize: "18px"}}>
                    If you are experiencing difficulties using this page or have any questions please reach out to the couple at <span style={{color: "red", fontStyle: "bold"}}>mattandjenaswedding@gmail.com</span>
                </p>
                
                {this.state.loading?
                <div className="loader">
                    <div className="sk-chase">
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                    </div>
                </div>
                : null}
                <div style ={{marginBottom: '3em'}}>
                    {this.state.partyAttendees.map((pers,i) => {
                        return <Guest callback={this.guestRsvpCallBack} key={i} party={pers.party} attending={pers.attending} name={pers.name} />
                    })}
                    <div style={{marginTop: "50px"}}>
                    {this.state.loaded ? 
                    <button onClick={this.submitRSVP} className="searchButton">Submit RSVP</button> : 
                    null
                    }

                    {this.state.success ? <p style={{fontFamily: "Barlow Condensed", fontSize: "18px"}}>Thank you for your submission. You may update your R.S.V.P. status here at any time, before May 15th. </p> : null}

                    <div style={{display: "flex", justifyContent:"center",flowDirection: "row"}} >
                    </div>

                    </div>
                </div>*/}
                    <p className="centerText" style={{display: "inline-block", width: "400px", fontFamily: "Barlow Condensed", fontStyle: "italic", fontSize: "24px"}}>
                    <span style={{color: "red"}}>Due to the coronavirus outbreak, the wedding has been postponed to June 11th, 2021.</span>
                    <br/>
                    <br/>
                    Thank you and stay safe.
                    <br/>
                    <br/>
                    Love,<br/>
                    Matthew and Jenafer
                    </p>
                    <div style={{textAlign: "center", display: "inline-block"}}>
                    <p style={{display: "block",width: "400px",fontFamily: "Barlow Condensed",textAlign: "center", fontSize: "18px"}}>
                        If you'd like to recieve email updates regarding the wedding, please enter your email here
                    </p>
                    <TextField size="small" onChange={this.searchChange} value={this.state.email} name="email" type='text' label="Email" />
                    {this.state.emailLoading ? 
                        <div className="loader">
                            <div className="sk-chase">
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                            </div>
                        </div>
                        :
                    <button style={{width: "80px", marginLeft: "20px"}} disabled={this.state.emailLoading} className="searchButton" onClick={this.submitEmail}>Submit</button>}
                    {this.state.emailSuccess ? <p style={{fontFamily: "Barlow Condensed", color: "black"}}>Your email has been saved!</p> : null}
                    {this.state.emailError ? <p style={{fontFamily: "Barlow Condensed", color: "red"}}>Something went wrong! Please try again</p>: null} 
                    </div>
                </div>
        )
    }
}

export default Rsvp
