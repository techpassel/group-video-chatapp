import React, { useContext, useState } from 'react'
import { FaHollyBerry } from 'react-icons/fa'
import './Auth.scss'
import { useNavigate } from "react-router-dom"
import { SocketContext } from '../../contexts/SocketContext'

const Auth = () => {
    const { username, setUsername } = useContext(SocketContext);
    const navigate = useNavigate();
    const submitHandler = () => {
        if (username !== "") {
            navigate('/home');
        }
    }

    return (
        <div className='authContainer'>
            <div className='innerContainer'>
                <div className='iconWrapper'>
                    <FaHollyBerry className='icon' /><span className='abc'>EnnaMeet</span>
                </div>
                <div className='inputWrapper'>
                    <input
                        placeholder='Enter your name'
                        type='text'
                        value={username}
                        className="input"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <button onClick={submitHandler} className="startButton">Start</button>
                </div>
            </div>
        </div>
    )
}

export default Auth