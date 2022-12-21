import React from 'react'
import { IoPersonCircle } from "react-icons/io5";
import { FaCheck } from "react-icons/fa"
import './ActiveUsersSection.scss';
import { useSelector } from 'react-redux';

const users = ['Aman', 'Mohan', 'Pawan', 'Payal', 'Priyanka', 'Shweta', 'Priyanshi', 'Sameer'];
const active = true;

const ActiveUsersSection = () => {
    const { activeUsers } = useSelector((state) => state.user)

    return (
        <div className='ausContainer'>
            {activeUsers.length == 0 ? (
                <div className='noActiveUsers'>
                    <span className='noActiveUSerText'>No active users now.</span>
                </div>
            ) : (<>
                {
                    activeUsers.map((user, index) => (
                        <div className='userAtiveWrapper' key={index}>
                            <div className='userWrapper'>
                                <IoPersonCircle className='avatar' />
                                <span>{user.username}</span>
                            </div>
                            {/* {active && (
                        <FaCheck className='activeUserCheck' />
                    )} */}
                        </div>
                    ))
                }
            </>)}
        </div>
    )
}

export default ActiveUsersSection