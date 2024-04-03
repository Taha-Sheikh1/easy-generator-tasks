import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 
const UserAuthentication = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const [currentView, setCurrentView] = useState("signUp");
    const [passwordError, setPasswordError] = useState('');
    const [apiMessage, setApiMessage] = useState('');

    const changeView = (view) => setCurrentView(view);

    const validatePassword = (value) => {
        let errors = [];
    
        if (value.length < 8) {
            errors.push('Password must be at least 8 characters long.');
        }
    
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(value)) {
            errors.push('Password must contain at least 1 letter, 1 number, 1 special character.');
        }
    
        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validatePassword(formData.password);
        if (errors.length > 0) {
            setPasswordError(errors.join(' ')); 
        } else {
            setPasswordError(''); 
            if (currentView === 'signUp') {
                try { 
                    const response = await axios.post('http://localhost:3000/signup', formData);
                    if(response){
                        setApiMessage('New Account Created Successfully!');
                    }
                } catch (error) {
                    setApiMessage('New account couldnt created!');
                }
            } else {
                try { 
                    const response = await axios.post('http://localhost:3000/login', {
                        email: formData?.email,
                        password: formData?.password
                    }); 
                    if(response){
                        setApiMessage('User logged in successfully!');
                        localStorage.setItem('token', response.data.accessToken); // the best implementation is to add this token into the cookies of browser, since, due to short in time, I am adding it to local storage
                        navigate('/dashboard'); // successful login resulting in the navigation of the user to /dashboard page, although for this authentication system, the best way is to implement React Redux, but due to short time, wasnt able to do so
                    }
                } catch (error) {
                    setApiMessage('User couldnt login!');
                }
            }
        }
    };

    return (
        <section id="user-authentication-system">
            <form onSubmit={handleSubmit}>
                <h2>{currentView === 'signUp' ? 'Sign Up' : 'Login'}</h2>
                {currentView === 'signUp' && 
                    <fieldset>  
                        <ul>
                            <li>
                                <label htmlFor="username">Username:</label>
                                <input name='username' onChange={handleInputChange} value={formData.username} type="text" id="username" required/>
                            </li>
                            <li>
                                <label htmlFor="email">Email:</label>
                                <input onChange={handleInputChange} value={formData.email} name='email' type="email" id="email" required/>
                            </li>
                            <li>
                                <label htmlFor="password">Password:</label>
                                <input onChange={handleInputChange} value={formData.password} name='password' type="password" id="password" required/>
                            </li>
                        </ul>
                        {passwordError && <span className="error">{passwordError}</span>}
                    </fieldset> 
                }
                {currentView === 'logIn' &&
                    <fieldset> 
                        <ul>
                            <li>
                                <label htmlFor="email">Email:</label>
                                <input onChange={handleInputChange} value={formData.email} name='email' type="email" id="email" required/>
                            </li>
                            <li>
                                <label htmlFor="password">Password:</label>
                                <input onChange={handleInputChange} value={formData.password} name='password' type="password" id="password" required/>
                            </li>
                        </ul>
                        {passwordError && <span className="error">{passwordError}</span>}
                    </fieldset>
                }
                <button type="submit">{currentView === 'signUp' ? 'Submit' : 'Login'}</button>
                <button type="button" onClick={() => changeView(currentView === 'signUp' ? 'logIn' : 'signUp')}>
                    {currentView === 'signUp' ? 'Have an Account?' : 'Create an Account'}
                </button>
                {apiMessage && <div style={{fontSize: '15px', textAlign:'center'}}>{apiMessage}</div>}
            </form>
        </section>
    );
};

export default UserAuthentication; 