import React from 'react';
import styled from 'styled-components';

import robot from "../assets/robot.gif";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    img {
        height: 20rem;
    }
    span {
        color: #4e0eff;
    }
`;

const Welcome = ({ currentUser }) => {
    return (
        <Container>
            <img src={robot} alt="robot" />
            <h1>
                Welcome <span>{currentUser.username}!</span>
            </h1>
            <h3>Please select a chat to start messageing.</h3>
        </Container>
    )
};

export default Welcome;
