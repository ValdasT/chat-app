import React, { useState, memo, useContext } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom"
import CustomButton from '../CustomButtons/Button/CustomButton';
import RoundButton from '../CustomButtons/RoundButton/Roundbutton'
import { useAuth } from "../../context/AuthContext"
import { GlobalContext } from '../../context/GlobalState';
import { AiOutlineGoogle } from 'react-icons/ai'
import { GrFacebookOption } from 'react-icons/gr'

import './Authorization.scss';

const LogIn = ({ setForm }) => {
    const { logIn, signInWithGoogle, signInWithFacebook, addToArray } = useAuth()
    const { showModal } = useContext(GlobalContext);
    const { register, handleSubmit, errors, reset } = useForm();
    const [formInputs, setFormInputs] = useState({ email: '', password: '' })
    const history = useHistory()

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            await logIn(email, password);
            history.push("/")
            reset();
        } catch (error) {
            showModal({ type: 'error', body: error.message, name: 'Oh snap!' })
            console.log(error);
        }
    };

    const signInWithGoogleProvider = async () => {
        try {
            await signInWithGoogle();
            history.push("/")
        } catch (error) {
            console.log(error);
        }
    };

    const signInWithFacebookProvider = async () => {
        try {
            await signInWithFacebook();
            history.push("/")
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='sign-in'>
            <div className="header-text">Sign in</div>
            <div className="login-options">
                <RoundButton onClick={signInWithGoogleProvider} icon={<AiOutlineGoogle />} />
                <RoundButton onClick={signInWithFacebookProvider} icon={<GrFacebookOption />} />
            </div>
            <div>or use your account</div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group" >
                    <input style={{ borderColor: errors.email ? '#b40000' : null }}
                        className="form-field" defaultValue={formInputs.email}
                        ref={register({ required: true })}
                        type="input" spellCheck="false" placeholder="Email" name="email" id='email' autoFocus />
                    <label style={{ color: errors.email ? '#b40000' : null }}
                        htmlFor="email" className="form-label">Email</label>
                    {errors.email && <span className='danger-text'>Email is required</span>}
                </div>
                <div className="form-group">
                    <input style={{ borderColor: errors.password ? '#b40000' : null }}
                        className="form-field" defaultValue={formInputs.password} ref={register({ required: true })}
                        type="password" placeholder="Password" name="password" id='password' />
                    <label style={{ color: errors.password ? '#b40000' : null }}
                        htmlFor="password" className="form-label">Password</label>
                    {errors.password && <span className='danger-text'>Password is required</span>}
                </div>

                <div className='buttons'>
                    <CustomButton type='submit'> Sign in </CustomButton>
                </div>
            </form>
            <div onClick={setForm}>Don't have an account? Sign up now</div>
        </div>
    )
}

export default memo(LogIn);