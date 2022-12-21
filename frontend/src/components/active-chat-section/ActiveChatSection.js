import React, { useState } from 'react';
import { IoPersonCircle } from "react-icons/io5";
import { dateInFormat } from '../../utils/CommonUnit'
import './ActiveChatSection.scss';

const messages = [
  {
    message: 'Hi! how r you?',
    username: 'Aman',
    userId: '123456'
  },
  {
    message: 'I am fine. What about you?',
    username: 'Pooja Singh',
    userId: '456789'
  },
  {
    message: 'R u there?',
    username: 'Pooja Singh',
    userId: '456789',
  },
  {
    message: 'Yup. But little busy.',
    username: 'Aman',
    userId: '123456'
  },
  {
    message: 'Wait for 2 minutes. I will be back. And yes, pease be ready with your questions till then.',
    username: 'Aman',
    userId: '123456'
  },
  {
    message: 'Hi! how r you?',
    username: 'Aman',
    userId: '123456'
  },
  {
    message: 'I am fine. What about you? Where were you for so long. I was waiting for you.',
    username: 'Pooja Singh',
    userId: '456789'
  },
  {
    message: 'R u there?',
    username: 'Pooja Singh',
    userId: '456789',
  },
  {
    message: 'Yup. But little busy.',
    username: 'Aman',
    userId: '123456'
  },
  {
    message: 'Wait for 2 minutes. I will be back.',
    username: 'Aman',
    userId: '123456'
  }
]

const currentUserId = '123456';
const date = new Date();

const ActiveChatSection = () => {
  const [msg, setMsg] = useState('');
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(msg);
  }

  return (
    <div className='acsContainer'>
      <div className='messageArea'>
        {messages.map((message, index) => {
          return message.userId === currentUserId ?
            (
              <div className='selfMessageContainer' key={index}>
                <div className='userInfo'>
                  <IoPersonCircle className='selfUserAvatar' />
                  <div className='selfUserName'>{message.username}</div>
                </div>
                <div className='messageWrapper'>
                  <div className='selfMessage'>{message.message}</div>
                  <div className='selfMessageDate'><span>{dateInFormat(date)}</span></div>
                </div>
              </div>
            ) : (
              <div className='messageContainer' key={index}>
                <div className='userInfo'>
                  <IoPersonCircle className='userAvatar' />
                  <div className='userName'>{message.username}</div>
                </div>
                <div className='messageWrapper'>
                  <div className='message'>{message.message}</div>
                  <div className='messageDate'>{dateInFormat(date)}</div>
                </div>
              </div>
            )
        })}
      </div>
      <form className='formArea' onSubmit={onSubmitHandler}>
        <input className='chatInput' type='text' placeholder='Write and press enter to send your message.' value={msg} onChange={(event) => setMsg(event.target.value)} />
      </form>
    </div>
  )
}

export default ActiveChatSection