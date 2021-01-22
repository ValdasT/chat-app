import React, { useContext, memo } from 'react';
import Message from './Message';
// import { GlobalContext } from '../../context/GlobalState';
// import { useUserSession } from '../../context/AuthContext';
import LoadingAnswer from '../Spinner/LoadingAnswer';
import { v4 as uuidv4 } from 'uuid';
import logo from '../../img/profile.jpeg'
import otherLogo from '../../img/profile2.jpg'
import { showTimeFromMS } from '../../utils/utils' 
// import './Chat.css';
import './Chat.scss';

const ChatBubble = memo(({ message }) => {
    // const { darkMode, showAlert } = useContext(GlobalContext)
    // const { user } = useUserSession()

    return (
        <div>
            {message.sender === 'me' ?
                <div className='message'>
                    <div className='message-block' style={{ flexDirection: "row-reverse" }}>
                        <div>
                            <img className='userAvatar' id={`Hugo avatar ${uuidv4()} `} alt="my photo" src={logo} />
                        </div>
                        <div className="point-right"></div>
                        <div className="bubble">
                            <Message response={message} />
                        </div>
                    </div>
                    <div className="message-time" align={"right"} >{showTimeFromMS(message.time)}</div>
                </div>
                :
                <div className='message'>
                    <div className='message-block'>
                        <div>
                            <img className='userAvatar' id={`Profile avatar ${uuidv4()} `} alt={`first-name last-name`}
                                src={otherLogo} />
                        </div>
                        <div className="point-left"></div>
                        <div className="bubble bubble-left">
                            <Message response={message} />
                        </div>
                    </div>
                    <div className="message-time" align={"left"} >{showTimeFromMS(message.time)}</div>
                </div>

            }
            {/* <div className='message'>
                <div>
                    {message.sender === 'me' ? <img className='userAvatar' id={`Hugo avatar ${uuidv4()} `} alt="my photo" src={logo} />
                        : <img className='userAvatar' id={`Profile avatar ${uuidv4()} `} alt={`first-name last-name`}
                            src={otherLogo} />}

                </div>
                <div className={message.sender !== 'me' ? "bubble bubble-left" :
                    "bubble bubble-right"}>
                    <Message response={message} />
                </div>
            </div> */}



            {/* <ListItem>
                <Grid container>
                    <Grid item xs={12} className={message.sender === 'hugo' ? "d-flex" : "d-flex flex-row-reverse"}>
                        <div>
                            {message.sender === 'hugo' ? <Avatar id={`Hugo avatar ${uuidv4()} `} alt="Hugo bot" src={require("../../img/hugo_logo.svg")} />
                                : <Avatar id={`Profile avatar ${uuidv4()} `} alt={`${user['first-name']} ${user['last-name']}`}
                                    src={`https://w3-services1.w3-969.ibm.com/myw3/unified-profile-photo/v1/image/${user.uid}?s=90`} />}
                        </div>
                        {darkMode ?
                            <Fragment>
                                {message.message.loading ?
                                    <div className="bubble-loading bubble-left bubble-left-dark"><LoadingAnswer /></div> :
                                    <div style={message.message.answerURL ? { padding: '1.125em 1.5em 5px 1.5em' } : null}
                                        className={message.sender === 'hugo' ? "bubble bubble-left bubble-left-dark" :
                                            "bubble bubble-right bubble-right-dark"}>
                                        <Message response={message} darkMode={darkMode} showAlert={showAlert} />
                                    </div>
                                }
                            </Fragment>
                            :
                            <Fragment>
                                {message.message.loading ?
                                    <div className="bubble-loading bubble-left bubble-left-light"><LoadingAnswer /></div> :
                                    <div style={message.message.answerURL ? { padding: '1.125em 1.5em 5px 1.5em' } : null}
                                        className={message.sender === 'hugo' ? "bubble bubble-left bubble-left-light" :
                                            "bubble bubble-right bubble-right-light"}>
                                        <Message response={message} darkMode={darkMode} showAlert={showAlert} />
                                    </div>
                                }
                            </Fragment>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <div className={darkMode ? "messageTime-dark" : "messageTime-light"} align={message.sender === 'hugo' ? "left" : "right"} >{message.time}</div>
                    </Grid>
                </Grid>
            </ListItem> */}
        </div>
    );
})

export default memo(ChatBubble);