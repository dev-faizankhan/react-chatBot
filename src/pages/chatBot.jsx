import React, { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdOutlineSettingsVoice, MdStopCircle, MdOutlineClose } from "react-icons/md";

import { ReactMic } from 'react-mic';
import AudioTimer from '../components/AudioTimmer';

const ChatBot = () => {
    const [showChat, setShowChat] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const [allowVoice, setAllowVoice] = useState(false);
    const [startRecording, setStartRecording] = useState(false)
    const [voiceMessage, setVoiceMessage] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    const handleToggle = () => {
        setShowChat(prev => !prev)
        setInput("")
        setAllowVoice(false)
    }

    const handleToggleVoiceMessage = () => {
        if (allowVoice == false) {
            setAllowVoice(true)
            setStartRecording(true)
            setInput('')
        } else {
            setStartRecording(false)
        }
    }

    const handleCancleVoice = () => {
        setAllowVoice(false)
        setVoiceMessage(null)
        setStartRecording(false)
        setElapsedTime(0)
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()

        if (voiceMessage) {
            handleSendRec()
            return;
        }

        if (input.trim() == "") return;

        const userMessage = { name: 'User', message: input.trim() };
        setMessages(prev => [userMessage, ...prev]);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: input }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const answerMessage = { name: 'Sam', message: data.answer };
                setMessages(prev => [answerMessage, ...prev]);
            })
            .catch((error) => {
                console.error('Error:', error);
            }).finally(() => {
                setInput("");
            })
    }

    const handleSendRec = async () => {
        if (!voiceMessage) return;

        const recordedBlob = voiceMessage;
        const audioBlob = new Blob([recordedBlob], { type: 'audio/mp3' });

        const formData = new FormData();
        formData.append('recording', audioBlob, 'recording.mp3');

        // console.log("voiceMessage", voiceMessage);
        // console.log([...formData]);

        const userMessage = { name: 'User', recording: voiceMessage };
        setMessages(prev => [userMessage, ...prev]);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: formData,
            mode: 'cors',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const answerMessage = { name: 'Sam', message: data.answer };
                setMessages(prev => [answerMessage, ...prev]);
            })
            .catch((error) => {
                console.error('Error:', error);
            }).finally(() => {
                handleCancleVoice();
            })
    }

    const onStop = (recordedBlob) => {
        console.log("recordedBlob", recordedBlob);
        setVoiceMessage(recordedBlob.blobURL);
    };

    useEffect(() => {
        setInput("")
        setVoiceMessage(null)
    }, [])

    return (
        <div className="chatbox" style={{ height: '90.5%', width: "40%" }}>
            <div className={`chatbox__support ${showChat ? 'chatbox--active' : ''}`} style={{ height: '100%', width: "100%" }}>
                <div className="chatbox__header">
                    <div className="chatbox__image--header">
                        <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
                    </div>
                    <div className="chatbox__content--header">
                        <h4 className="chatbox__heading--header"></h4>
                        <p className="chatbox__description--header">Mental Health Psychiatrist</p>
                    </div>
                    <div onClick={handleToggle} className='cross' style={{ position: "absolute", right: "30px", color: "white" }}  >
                        <AiOutlineClose />
                    </div>
                </div>
                <div className="chatbox__messages">
                    {messages?.map((item, index) => {
                        if (item?.recording) {
                            return (
                                <div key={`message-${index}`} className={`messages__item ${item.name == 'Sam' ? 'messages__item--visitor' : 'messages__item--operator'}`}>
                                    <audio controls src={item?.recording} />
                                </div>
                            )
                        } else {
                            return (
                                <div key={`message-${index}`} className={`messages__item ${item.name == 'Sam' ? 'messages__item--visitor' : 'messages__item--operator'}`}>
                                    {item?.message}
                                </div>
                            )
                        }
                    })}
                </div>
                <div className="chatbox__footer">
                    {/* Text Input */}
                    {!allowVoice && <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Write a message..." style={{ width: "100%", borderRadius: "15px" }} />}


                    <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                        {startRecording && <AudioTimer isRunning={startRecording} elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} />}
                        <ReactMic
                            record={startRecording}
                            className='w-25 bg-none d-none'
                            onStop={onStop}
                            mimeType="audio/mp3"
                        />

                        {voiceMessage &&
                            <audio controls src={voiceMessage} />
                        }
                    </div>

                    {/* Send Message Button */}
                    {!startRecording && <button onClick={handleSendMessage} className="chatbox__send--footer send__button">Send</button>}
                    {/* To Cancle Voice Recording */}
                    {allowVoice && <button onClick={handleCancleVoice} className="mx-2 reound_button">
                        <MdOutlineClose />
                    </button>}
                    {/* To Enable Voice Recorder */}
                    <button onClick={handleToggleVoiceMessage} className="reound_button">
                        {!startRecording ? <MdOutlineSettingsVoice /> : startRecording ? <MdStopCircle /> : null}
                    </button>
                </div>
            </div>

            {/* Show ChatBot Button */}
            {!showChat ? <div className="chatbox__button">
                <button onClick={handleToggle}>
                    <img style={{ width: "50px", height: "50px", position: "absolute", bottom: "50px", right: "100px" }} src="https://cdn-icons-png.flaticon.com/512/1380/1380370.png" />
                </button>
            </div> : null}
        </div>
    )
}

export default ChatBot