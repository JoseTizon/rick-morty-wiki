import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Character = ({characterUrl}) => {

    const [characterInfo, setCharacterInfo] = useState({})

    useEffect(() => {
        axios.get(characterUrl)
        .then(res => setCharacterInfo(res.data))
    }, [])

    const getStatus = () => {

        let colorStatus = ""
        if(characterInfo.status === 'Alive'){
           colorStatus="#b4e24d"
        }else if(characterInfo.status === 'Dead'){
            colorStatus="#ff0000"
        }else{
            colorStatus="#808080"
        }
        return colorStatus;
    }

    return (
        <div className='card'>
            <div className='card-img'>
                <img src={characterInfo.image} alt="" />
            </div>
            <div className='card-info'>
                <h2>{characterInfo.name}</h2>
                <div className='status-color' style={{backgroundColor: getStatus()}}></div>
                <br />
                <p>Status</p>
                <h3>{characterInfo.status}</h3>
                <p>Origin</p>
                <h3>{characterInfo.origin?.name}</h3>
                <p>Episodes where appeared</p>
                <h3>{characterInfo.episode?.length}</h3>
            </div>
        </div>
    );
};

export default Character;