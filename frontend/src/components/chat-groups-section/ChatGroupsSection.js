import React, { useState } from 'react'
import './ChatGroupsSection.scss'
import { FaCheck } from "react-icons/fa"
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';

const groups = ['abcdefg', 'lmnopiliu ghghhgh hhggh hjhh hjhjhj', 'hhhuuu', 'ggjjfefwf wfwe',
    'fwfw ffwf fwfwef wefwe fwef', 'wefwefw', 'fwefwef wefwef wefwf', 'fwefwefwef fwefwef wefwef fwefwefw fsfsf fsdfsf',
    'wefwef fwefewefw', 'asdad', 'dadadas acasas', 'dadad', 'asdadad adad', 'adasdasdasd'];
const active = true;

const ChatGroupsSection = () => {
    const [basicModal, setBasicModal] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    return (
        <div className='cgsContainer'>
            <div className='headerWrapper'>
                <div className='header'>
                    <div className='sectionHeaderTitle'>Chat Groups</div>
                    <button className='createGroupButton' onClick={() => setBasicModal(true)}>Create New Group</button>
                </div>
            </div>
            <div className='groupWrapper'>
                {
                    groups.map((group, index) => (
                        <div className='groupItem' key={index}>
                            <div className='groupItemName'>
                                {group.length < 40 ? group : group.substring(0, 40) + "..."}
                                {/* {group.length} */}
                            </div>
                            {active && (
                                <FaCheck className='activeGroupCheck' />
                            )}
                        </div>
                    ))
                }
            </div>
            <MDBModal staticBackdrop show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle className='modalTitle'>Modal title</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setBasicModal(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className='modalBody'>
                            {/* Modal Customized Body */}
                            <div className='modalBodyContainer'>
                                <div className='groupNameWrapper'>
                                    <label>Group Name :</label>
                                    <input type='text' className='groupNameInput' placeholder='Enter new group name' value={newGroupName} onChange={(event) => setNewGroupName(event.target.value)} />
                                </div>
                            </div>
                            {/* Modal Customized Body End */}
                        </MDBModalBody>
                        <MDBModalFooter className='modalFooter'>
                            <button onClick={() => setBasicModal(false)} className="modalCloseBtn">Close</button>
                            <button className='modalSaveBtn'>Save Changes</button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    )
}

export default ChatGroupsSection