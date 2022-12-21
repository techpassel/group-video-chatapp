import React from 'react'
import { useSelector } from 'react-redux'
import './DashboardInfo.scss'

const DashboardInfo = () => {
    const { userInfo: { username } } = useSelector((state) => state.user);
    return (
        <div className='dashboardInfoContainer'>
            <span className='dashboardInfoTitle'>
                Hello <span className='dashboardUsername'>{username}</span>, welcome to <span className='dashboardLogo'>EnnaMeet</span>.
            </span>
            <span className='dashboardInfoDescription'>
                You can start calling directly to a person from the list or
                you can create or join group call.
            </span>
        </div>
    )
}

export default DashboardInfo