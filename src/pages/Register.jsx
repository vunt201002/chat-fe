import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from "../assets/logo.svg";
import { registerUser } from '../utils/apiCall';

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
    }
    input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }
    button {
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
            background-color: #4e0eff;
        }
    }
    span {
        color: white;
        text-transform: uppercase;
        a {
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold;
        }
    }
`;

const Register = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { password, username, email } = values;
            const user = {
                username,
                email,
                password,
            }
            const data = await registerUser(user);
            if (data.data !== undefined) {
              	toast.error(data.data, toastOptions);
            } else {
				localStorage.setItem("chat-app-user", JSON.stringify(data));
				navigate("/")
			}
        }
    };

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;

        if (password !== confirmPassword) {
            toast.error("password and confrm password must be the same", toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password should be greater than 8 characters", toastOptions);
            return false;
        }

        return true;
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="brand">
                        <img src={logo} alt="logo" />
                        <h1>Chat</h1>
                    </div>
                    <input
                        type="text"
                        placeholder='Username'
                        name='username'
                        onChange={e => handleChange(e)}
                        required
                    />
                    <input
                        type="email"
                        placeholder='Email'
                        name='email'
                        onChange={e => handleChange(e)}
                        required
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        name='password'
                        onChange={e => handleChange(e)}
                        required
                    />
                    <input
                        type="password"
                        placeholder='Confirm password'
                        name='confirmPassword'
                        onChange={e => handleChange(e)}
                        required
                    />
                    <button type='submit'>Create user</button>
                    <span>
                        Already have an account?
                        <Link to='/login'>Login</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
};

export default Register;
