import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import { allUserRoute, host } from "../utils/apiRoute";
import Contact from '../components/Contact';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`;

const Chat = () => {
    const navigate = useNavigate();
    const socket = useRef();

    const [currentUser, setCurrentUser] = useState(undefined);
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    useEffect(() => {
        const setUser = async () => {
            if (!localStorage.getItem("chat-app-user")) {
                navigate("/login");
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
                setIsLoading(true);
            }
        }
        setUser();
    }, []);

    useEffect(() => {
        const socket = new WebSocket(host);


        return () => {
            if (socket.readyState === 1) { // <-- This is important
                socket.close();
            }
        };
    });

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {
        const getAllUser = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImgSet) {
                    const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
                    setContacts(data.data);
                } else {
                    navigate("/avatar");
                }
            }
        };
        getAllUser();
    }, [currentUser]);

    return (
        <Container>
            <div className="container">
                <Contact
                    contacts={contacts}
                    currentUser={currentUser}
                    changeChat={handleChatChange}
                />
                {
                    isLoading && currentChat === undefined ? (
                        <Welcome currentUser={currentUser}/>
                    ) : (
                        <ChatContainer
                            currentChat={currentChat}
                            currentUser={currentUser}
                            socket={socket}
                        />
                    )
                }
            </div>
        </Container>
    )
};

export default Chat;
