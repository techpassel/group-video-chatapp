import React, { useState } from 'react'
import { FaHollyBerry } from 'react-icons/fa'
import './Auth.scss'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { addUsername } from '../../store/actions/userAction'
import { capitalizeFirstLetter } from '../../utils/CommonUnit'

const Auth = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addUsername(username));
        if (username && username !== "") {
            navigate('/home');
        }
    }

    return (
        <div className='authContainer'>
            <div className='innerContainer'>
                <div className='iconWrapper'>
                    <FaHollyBerry className='icon' />
                    <span className='abc'>EnnaMeet</span>
                </div>
                <form onSubmit={submitHandler} className='inputWrapper'>
                    <input
                        placeholder='Enter your name'
                        type='text'
                        value={username}
                        className="input"
                        onChange={(event) => setUsername(capitalizeFirstLetter(event.target.value))}
                    />
                    <button className="startButton">Start</button>
                </form>
            </div>
        </div>
    )
}

export default Auth