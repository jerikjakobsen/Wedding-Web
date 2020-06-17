const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore()
const config = require('./config')
const firebase = require('firebase')
firebase.initializeApp(config)
const express = require('express')
var cors = require('cors')
const fbauth = require("./fbauth")
//const fbauth = require('./fbauth')

const app = express()
const corsOptions = {
    origin: ['http://localhost:5000','https://weddingadmin.web.app', 'http://localhost:3000', 'https://jenawedding-ecede.web.app','https://mattandjenaswedding.info', 'http://localhost:3001'],
    optionsSuccessStatus: 200, 
    credentials: true
  }

app.options('*', cors())
app.use(cors(corsOptions))

app.get('/guests/:name',cors(corsOptions),(req,res) => {
    let guest = {}
    db.collection('guests').where('name', '==', req.params.name).get()
    .then(docs => {
        if (docs.empty) {
            return res.status(404).json({
                error: "Guest not found",
                name: req.params.name,
            })
        } else {
        guest.party = docs.docs[0].data().party
        return db.collection('guests').where('party','==', guest.party).get()
        }
    })
    .then(docs => {
        guest.members = []
        docs.forEach(member => {
            guest.members.push({
                party: member.data().party,
                name: member.data().name,
                attending: member.data().attending,
                docId: member.id
            })
        })

        guest.members = guest.members.sort((a,b)=> (a.name > b.name ? 1 : -1))
        return res.status(200).json(guest)
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({error: err.code})
    })
})

app.post('/guestlists', cors(corsOptions), (req, res) => {
    let batch = db.batch()
    const guestlist = []
    req.body.forEach(pers => {
        const person = {}
        person.name = pers.name
        person.party = pers.party
        person.attending = false
        guestlist.push(person)
    })

    guestlist.forEach(pers => {
        batch.set(db.collection('guests').doc(), pers)
    })

    return batch.commit()
    .then(()=> {
        res.status(200).json({message: `Commited ${guestlist.length}`})
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({error: err.code})
    })
})

app.post('/guests', cors(corsOptions), (req,res) => {
    let batch = db.batch()
    let dbGuests =  db.collection('guests')
    const newList = []
    dbGuests.where('party', '==', req.body.party).get()
    .then(docs => {
        if (docs.empty) {
            return res.status(404).json({error: err.code})
        } else {

        docs.docs.forEach(doc => {
            newList.push({
                id: doc.id,
                name: doc.data().name
            })})

        newList.forEach(person => {
            const attend = req.body.members.filter(pers => pers.name === person.name)[0].attending
            batch.update(dbGuests.doc(person.id), {attending: attend})
            })
        
        return batch.commit()
        }
    }).then(() => {
        res.status(200).json({message: "Success"})
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({error: err.code})
    })

})

//Admin Stuff

app.post('/login', cors(corsOptions), (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
        return data.user.getIdToken()
    })
    .then(token => {
        return res.json({token: token})
    })
    .catch(err => {
        console.error(err)
        if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
            return res.status(403).json({general: "Wrong credentials, please try again"})
        } else return res.status(500).json({error: err.code})
    })
})

app.get("/getGuests",cors(corsOptions), fbauth, (req, res) => {
    db.collection("guests").orderBy("party", "desc").get()
    .then(data => {
        const guestList = []
        data.docs.forEach(doc => {
            guestList.push({
                name: doc.data().name,
                attending: doc.data().attending,
                party: doc.data().party,
                docId: doc.id
            })
        })
        res.status(200).json({guests: guestList})
    })
    .catch(err=> {
        console.error(err)
        res.status(500).json({error: err.code})
    })
})

app.post("/addGuest", cors(corsOptions), fbauth, (req,res) => {

    const newGuest ={
        name: req.body.name,
        attending: false,
        party: req.body.party
    }

    db.collection("guests").where("name", "==", req.body.name).get()
    .then(data => {
        if (data.docs.length > 0) {
            return res.status(400).json({Error: "Guest already added"})
        } else {
            return db.collection("guests").add(newGuest)
        }
    })
    .then(guest => {
        return res.status(200).json({Message: "Success!", docRef: guest.id})
    })
    .catch(err=> {
        console.error(err)
        res.status(500).json({Error: err.code})
    })
})

app.delete("/deleteGuest/:id",cors(corsOptions), fbauth, (req,res) => {
    db.collection("guests").doc(String(req.params.id)).delete()
    .then(response => {
        res.status(200).json({Message: "Success!"})
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({error: err.code})
    })
})

app.post("/email", cors(corsOptions), (req,res)=> {
    const email = {
        email: req.body.email
    }

    db.collection("emails").add(email)
    .then(()=>{
        res.status(200).json({Message: "Success!"})
    })
    .catch(err=> {
        console.log(err)
        res.status(500).json({error: err.code})
    })
})


exports.api = functions.https.onRequest(app)