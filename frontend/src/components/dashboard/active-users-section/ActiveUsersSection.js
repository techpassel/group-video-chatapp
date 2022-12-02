import React from 'react'
import { IoPersonCircle } from "react-icons/io5";
import { FaCheck } from "react-icons/fa"
import './ActiveUsersSection.scss';

const users = ['Aman', 'Mohan', 'Pawan', 'Payal', 'Priyanka', 'Shweta', 'Priyanshi', 'Sameer'];
const active = true;
const ActiveUsersSection = () => {
    return (
        <div className='ausContainer'>
            {users.map((user, index) => (
                <div className='userAtiveWrapper' key={index}>
                    <div className='userWrapper'>
                        <IoPersonCircle className='avatar' />
                        <span>{user}</span>
                    </div>
                    {active && (
                        <FaCheck className='activeUserCheck' />
                    )}
                </div>
            ))}
        </div>
    )
}

export default ActiveUsersSection