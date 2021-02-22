import React, { useState, memo, useRef, useContext } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom"
import CustomButton from '../CustomButtons/Button/CustomButton';
import RoundButton from '../CustomButtons/RoundButton/Roundbutton'
import { useAuth } from "../../context/AuthContext"
import { GlobalContext } from '../../context/GlobalState';
import { AiOutlineGoogle } from 'react-icons/ai'
import { GrFacebookOption } from 'react-icons/gr'
import './Authorization.scss';

const SignUp = ({ setForm }) => {
    const { signUp, signInWithGoogle, signInWithFacebook } = useAuth()
    const { showModal, showSpinner } = useContext(GlobalContext);
    const { register, handleSubmit, watch, errors, reset } = useForm();
    const [formInputs, setFormInputs] = useState({ email: '', password: '' })
    const history = useHistory()

    const password = useRef({});
    password.current = watch("password", "");

    const signInWithGoogleProvider = async () => {
        try {
            showSpinner(true);
            await signInWithGoogle();
            showSpinner(false);
            history.push("/")
        } catch (error) {
            showSpinner(false);
            showModal({ type: 'error', body: error.message, name: error.response.name })
        }
    };

    const signInWithFacebookProvider = async () => {
        try {
            showSpinner(true);
            await signInWithFacebook();
            showSpinner(false);
            history.push("/")
        } catch (error) {
            showSpinner(false);
            showModal({ type: 'error', body: error.message, name: error.response.name })
        }
    };

    const onSubmit = async (data) => {
        try {
            showSpinner(true);
            const { email, password, displayName } = data;
            const user = await signUp(
                email,
                password,
                displayName
            );
            console.log(user);
            showSpinner(false);
            history.push("/")
            reset()
        } catch (error) {
            showSpinner(false);
            showModal({ type: 'error', body: error.message, name: error.response.name })
        }
    };

    return (
        <div className='sign-in'>
            <div className="header-text">Create Account</div>
            <div className="login-options">
                <RoundButton onClick={signInWithGoogleProvider} icon={<AiOutlineGoogle />} />
                <RoundButton onClick={signInWithFacebookProvider} icon={<GrFacebookOption />} />
            </div>
            <div>or use your email for registration</div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group" >
                    <input style={{ borderColor: errors.displayName ? '#b40000' : null }}
                        className="form-field" defaultValue={formInputs.displayName}
                        ref={register({ required: true })}
                        type="input" spellCheck="false" placeholder="Name" name="displayName"
                        id='displayName' autoFocus autoComplete="username" />
                    <label style={{ color: errors.name ? '#b40000' : null }}
                        htmlFor="displayName" className="form-label">Name</label>
                    {errors.name && <span className='danger-text'>Name is required</span>}
                </div>
                <div className="form-group" >
                    <input style={{ borderColor: errors.email ? '#b40000' : null }}
                        className="form-field" defaultValue={formInputs.email}
                        ref={register({
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        type="input" spellCheck="false" placeholder="Email"
                        name="email" id='email' autoComplete="email" />
                    <label style={{ color: errors.email ? '#b40000' : null }}
                        htmlFor="email" className="form-label">Email</label>
                    {errors.email && <span className='danger-text'>{errors.email.message ? errors.email.message :
                        'Email is required'}</span>}
                </div>
                <div className="form-group">
                    <input style={{ borderColor: errors.password ? '#b40000' : null }}
                        className="form-field" defaultValue={formInputs.password} autoComplete="new-password"
                        ref={register({
                            required: true,
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            }
                        })}
                        type="password" placeholder="Password" name="password" id='password' />
                    <label style={{ color: errors.password ? '#b40000' : null }}
                        htmlFor="password" className="form-label">Password</label>
                    {errors.password && <span className='danger-text'>{errors.password.message ?
                        errors.password.message : 'Password is required'}</span>}
                </div>
                <div className="form-group">
                    <input style={{ borderColor: errors.password2 ? '#b40000' : null }}
                        className="form-field" defaultValue={formInputs.password2} autoComplete="new-password2"
                        ref={register({
                            required: true,
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            },
                            validate: value =>
                                value === password.current || "The passwords do not match"
                        })}
                        type="password" placeholder="Password" name="password2" id='password2' />
                    <label style={{ color: errors.password2 ? '#b40000' : null }}
                        htmlFor="password2" className="form-label">Repeat password</label>
                    {errors.password2 && <span className='danger-text'>{errors.password2.message ?
                        errors.password2.message : 'Password is required'}</span>}
                </div>

                <div className='buttons'>
                    <CustomButton type='submit'> Sign up </CustomButton>
                </div>
            </form>

            <div onClick={setForm}>Have an account? Sign in </div>
        </div>
    )
}

export default memo(SignUp);