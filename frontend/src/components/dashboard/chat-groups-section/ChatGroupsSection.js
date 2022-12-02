import React from 'react'
import './ChatGroupsSection.scss'
import { FaCheck } from "react-icons/fa"

const groups = ['abcdefg', 'lmnopiliu ghghhgh hhggh hjhh hjhjhj', 'hhhuuu', 'ggjjfefwf wfwe',
    'fwfw ffwf fwfwef wefwe fwef', 'wefwefw', 'fwefwef wefwef wefwf', 'fwefwefwef fwefwef wefwef fwefwefw fsfsf fsdfsf',
    'wefwef fwefewefw', 'asdad', 'dadadas acasas', 'dadad', 'asdadad adad', 'adasdasdasd'];
const active = true;

const ChatGroupsSection = () => {

    return (
        <div className='cgsContainer'>
            <div className='headerWrapper'>
                <div className='header'>
                    <div className='sectionHeaderTitle'>Chat Groups</div>
                    <button className='createGroupButton'>Create New Group</button>
                </div>
            </div>
            <div className='groupWrapper'>
                {
                    groups.map((group, index) => (
                        <div className='groupItem' key={index}>
                            <div className='groupItemName'> {group.length < 40 ? group : group.substring(0, 40) + "..."}</div>
                            {active && (
                                <FaCheck className='activeGroupCheck' />
                            )}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ChatGroupsSection