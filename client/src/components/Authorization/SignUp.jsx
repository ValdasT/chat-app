import React, { useState, memo, useRef } from 'react';
import { useForm } from "react-hook-form";
import CustomButton from '../CustomButtons/Button/CustomButton';
import RoundButton from '../CustomButtons/RoundButton/Roundbutton'
import { AiOutlineGoogle } from 'react-icons/ai'
import { GrFacebookOption } from 'react-icons/gr'
import './Authorization.scss';
const SignUp = ({ setForm }) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [formInputs, setFormInputs] = useState({ email: '', password: '' })

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = data => {
        console.log(data)
    };


    // const handleSubmit = async event => {
    //     event.preventDefault();
    //     const { email, password } = formInputs;

    //     console.log(email);
    //     console.log(password);

    //     // try {
    //     //   await auth.signInWithEmailAndPassword(email, password);
    //     //   this.setState({ email: '', password: '' });
    //     // } catch (error) {
    //     //   console.log(error);
    //     // }
    // };

    // const handleChange = event => {
    //     console.log(event.target);
    //     const { value, name } = event.target;
    //     setFormInputs({ [name]: value });
    //   };

    return (
        <div className='sign-in'>
            <div className="header-text">Create Account</div>
            <div className="login-options">
                <RoundButton icon={<AiOutlineGoogle />} />
                <RoundButton icon={<GrFacebookOption />} />
            </div>
            <div>or use your email for registration</div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group" >
                    <input style={{ borderColor: errors.name ? '#b40000' : null }}
                        className="form-field" defaultValue={formInputs.name}
                        ref={register({ required: true })}
                        type="input" spellCheck="false" placeholder="Name" name="name" id='name' />
                    <label style={{ color: errors.name ? '#b40000' : null }}
                        htmlFor="name" className="form-label">Name</label>
                    {errors.name && <span className='danger-text'>Name is required</span>}
                </div>
                <div className="form-group" >
                    <input style={{ borderColor: errors.email ? '#b40000' : null }}
                        className="form-field" defaultValue={formInputs.email}
                        ref={register({ required: true })}
                        type="input" spellCheck="false" placeholder="Email" name="email" id='email' />
                    <label style={{ color: errors.email ? '#b40000' : null }}
                        htmlFor="email" className="form-label">Email</label>
                    {errors.email && <span className='danger-text'>Email is required</span>}
                </div>
                <div className="form-group">
                    <input style={{ borderColor: errors.password ? '#b40000' : null }}
                        className="form-field" defaultValue={formInputs.password}
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
                    {errors.password && <span className='danger-text'>{errors.password.message ? errors.password.message : 'Password is required'}</span>}
                </div>
                <div className="form-group">
                    <input style={{ borderColor: errors.password2 ? '#b40000' : null }}
                        className="form-field" defaultValue={formInputs.password2}
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
                    {errors.password2 && <span className='danger-text'>{errors.password2.message ? errors.password2.message : 'Password is required'}</span>}
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