import React,{Component} from 'react'
import jwtDecode from "jwt-decode"
import "./Styles/home.css"
import axios from "axios"
import Guest from "../Components/guests"

class Home extends Component {
    state = {
        guests: [],
        latestParty: 0,
        searchName: "",
        searchedGuests: [],
        addGuest: "",
        error: "",
        rsvpCount: 0,
        guestCount: 0

    }
    loadGuests = () => {
        axios.get("/getGuests",{headers: {'Authorization':localStorage.Authorization}})
        .then(data=> {
            let guestCount = 0
            let rsvpCount = 0
            this.setState({guests: data.data.guests})
            console.log("Success!")
            this.setState({latestParty: 
                data.data.guests.sort((a,b) => {
                    return a.party-b.party
                })[data.data.guests.length-1].party + 1
            })
            this.state.guests.forEach((guest)=> {
                guestCount++
                if (guest.attending) {
                    rsvpCount++
                }
            })
            this.setState({guestCount, rsvpCount})
            console.log(this.state.latestParty)
        }).catch(err=>{
            if (err === "Error: Request failed with status code 403") {
                window.location.href="/login"
            }
        })
    }

    capitalize = (name, nP=false) => {
        const nameList = name.split(' ')
        const newNameList = []
        nameList.forEach(n => {
            const newName = n[0].toUpperCase() + n.substring(1, name.length)
            newNameList.push(newName)
        })
        if (nP) {
            return newNameList.join(' ')
        } else {
            return newNameList.join('%20')
        }
    }

    searchName=()=>{
        if (this.state.searchName.trim() !== "" && this.state.searchName !== undefined) {
        const name = this.capitalize(this.state.searchName)
        console.log(name)
        axios.get(`/guests/${name}`)
        .then(res=> {
            this.setState({error: ""})
            this.setState({searchedGuests: res.data.members})
            this.setState({searchName: ""})
            console.log(this.state.searchedGuests)
        })
        .catch(err=> {
            this.setState({error: "Guest not Found"})
            console.log(err)
        })
    }
    }

    textChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    deleteGuest=(id)=> {
        axios.delete(`/deleteGuest/${id}`, {headers: {'Authorization': localStorage.Authorization}})
        .then(res=>{
            console.log("Success! " + id + " Deleted!")
            const updated = this.state.searchedGuests.filter(pers=> pers.docId !== id)
            console.log(updated)
            this.setState({
                searchedGuests: updated
            })
        })
        .catch(err=>{
            console.log(err)
            if (err.status===403) {
                window.location.href="/login"
            }
        })
    }

    addGuest = () => {
        if (this.state.addGuest.trim() !== "" && this.state.addGuest !== undefined) {
        const guest = {
            name: this.capitalize(this.state.addGuest, true),
            party: this.state.latestParty
        }
        axios.post("/addGuest", guest, {headers: {'Authorization': localStorage.Authorization}})
        .then(res => {
            console.log("Success!")
            this.setState({addGuest:""})
        })
        .catch(err=>{
            console.log(err)
            if (err.response.status === 403) {
                console.log()
                window.location.href="/login"
            }
        })
    }
    }

    addGuestToParty = (party, guestName) => {
            const guest = {
                name: this.capitalize(guestName, true),
                party: party
            }
            axios.post("/addGuest", guest, {headers: {'Authorization': localStorage.Authorization}})
            .then(res => {
                console.log("Success!")
                this.setState({addGuest:""})
            })
            .catch(err=>{
                console.log(err)
                if (err.response.status === 403) {
                    console.log()
                    window.location.href="/login"
                }
            })
    }

    componentDidMount() {
        if (localStorage.Authorization) {
        const decodedToken = jwtDecode(localStorage.Authorization.split("Bearer ")[1])
        
        if (localStorage.Authorization) {
            if (decodedToken.exp *1000 < Date.now()) {    
                window.location.href = "/login"
            }
        } else {
            window.location.href = "/login"
        }
        this.loadGuests()
    } else {
        window.location.href = "/login"
    }
    }

    render() {
        return (
            <div className="home">
                <label>Search Guest</label>
                <div style={{display:"flex",flowDirection:"row", marginBottom: "50px"}}>
                    <input style={{marginRight:"20px"}} type="text" placeholder="Search" name="searchName" value={this.state.searchName} onChange={this.textChange}/>
                    <button onClick={this.searchName}>Search</button>
                </div>
                <div className="mainBody">
                    <div style={{overflow:"auto", height: "500px",width: "100%"}}>
                        {this.state.guests.map((guest)=> 
                            <Guest add={this.addGuestToParty} party={guest.party} call={this.deleteGuest} id={guest.docId}key={guest.docId} name={guest.name} attending={guest.attending}/>
                        )}
                    </div>
                    <div style={{width: "100%", textAlign: "center"}}>
                        <h5 style={{color:"red"}}>{this.state.error}</h5>
                        {this.state.searchedGuests.map(guest=> 
                            <Guest add={this.addGuestToParty} party={guest.party} call={this.deleteGuest} id={guest.docId} key={guest.docId} name={guest.name} attending={guest.attending} />
                        )}
                    </div>
                </div>
                <div style={{display:"flex",flowDirection:"row"}}>
                    <input style={{marginRight:"20px"}} type="text" placeholder="Add Guest" name="addGuest" value={this.state.addGuest} onChange={this.textChange}/>
                    <button onClick={this.addGuest}>Add Guest</button>
                </div>
                <h3>RSVP Count: {this.state.rsvpCount}</h3>
                <h3>Total Guests Invited {this.state.guestCount}</h3>
            </div>
        )
    }
}

export default Home