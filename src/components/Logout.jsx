import React from 'react';
import axios from "axios";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    svg {
        font-size: 1.3rem;
        color: #ebe7ff;
    }
`;

const Logout = () => {
    const navigate = useNavigate();
    
    const handdleLogout = async () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <Button onClick={handdleLogout}>
            <BiPowerOff />
        </Button>
    )
};

export default Logout;