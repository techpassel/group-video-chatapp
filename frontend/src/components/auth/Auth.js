import React, { useState } from 'react'
import { FaHollyBerry } from 'react-icons/fa'
import './Auth.scss'
const Auth = () => {
    const [username, setUsername] = useState('');
    const submitHandler = () => {
        console.log('submit pressed');
    }
    return (
        <div className='container'>
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
                    <button onClick={submitHandler} className="button">Start</button>
                </div>
            </div>
        </div>
    )
}

export default Auth