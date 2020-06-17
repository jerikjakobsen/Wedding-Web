import React, { Component } from 'react'
import Wpc from '../components/weddingparty'
import madeline from '../assets/madeline.jpeg'
import georgia from '../assets/georgia.jpeg'
import sabrina from '../assets/sabrina.jpeg'
import leila from '../assets/leila.jpeg'
import lyla from '../assets/lyla.jpg'
//import encarnacion from '../assets/encarnacion.jpeg'
import carolyn from '../assets/carolyn.jpeg'
//import frank from '../assets/frank.jpeg'
import jon from '../assets/jon.jpeg'
import john from '../assets/john.JPG'
//import matt from '../assets/matt.jpeg'
import erik from '../assets/erik.jpg'
//import edwin from '../assets/edwin.jpeg'
//import robert from '../assets/robert.jpeg'
import mia from '../assets/mia.jpg'


class Weddingparty extends Component {
    render() {
        return (
            <div style={{overflow: "hidden",display: 'grid', gridTemplateColumns: 'auto 10px auto', gridGap: '20px', padding: '10px'}}>
                <div>
                    <Wpc title='MADELINE DIAZ' image={madeline} position="Maid of Honor"  />
                    <Wpc title='GEORGIA KATEHIS' image ={georgia} position="Bridesmaid"  />
                    <Wpc title='SABRINA JAKOBSEN' image ={sabrina} position="Bridesmaid"  />
                    <Wpc title='LEILA LAGUNA' image ={leila} position="Bridesmaid" />
                    <Wpc title='LYLA JAKOBSEN' image ={lyla} position="Bridesmaid" />
                    <Wpc title='ENCARNACION RAMOS' image ="" position="Mother of the Groom" />
                    <Wpc title='CAROLYN GARDA' image ={carolyn} position="Mother of the Bride" />
                    <Wpc title='MIA' image = {mia} position="Flower Girl" />
                </div>
                <hr />
                <div>
                    <Wpc title='FRANK REDA' image="" position='Best Man' />
                    <Wpc title='JON CORCHADO' image={jon} position="Groomsman"  />
                    <Wpc title='JOHN JAKOBSEN' image={john} position="Groomsman"  />
                    <Wpc title='MATT GRIGGS' image="" position="Groomsman"  />
                    <Wpc title='ERIK JAKOBSEN' image={erik} position="Groomsman"  />
                    <Wpc title='EDWIN RODRIGUEZ' image="" position="Father of the Groom" />
                    <Wpc title='ROBERT ORTEGA' image ="" position="Step Father of the Bride"  />
                </div>
            </div>
        )
    }
}

export default Weddingparty