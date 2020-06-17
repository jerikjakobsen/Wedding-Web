import React, { Component } from 'react'
import '../App.css'

    const resizeStyle = {
        borderRadius: "50%", 
        backgroundRepeat: "no-repeat",
        width: "100px",
        height: "100px"
    } 
    const style = {
        borderRadius: "50%", 
        backgroundRepeat: "no-repeat",
    }


class Weddingparty extends Component {
    
    render() {
        const {image, title, position, resize} = this.props
        return (
            <div style={{textAlign: 'center', display: 'inline-block', width: '100%', height: '500px'}}>
                <img style={resize ? resizeStyle : style} src={image} alt='Person' />
                <p className='playfair mediumText'>{title}</p>
                <p style={{fontFamily: 'Alex Brush', fontSize: '36px'}}>{position}</p>
            </div>
        )
    }
}

export default Weddingparty
