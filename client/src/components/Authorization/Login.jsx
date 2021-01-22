import React, { useState, memo } from 'react';
import { useForm } from "react-hook-form";
import CustomButton from '../CustomButtons/Button/CustomButton';
import RoundButton from '../CustomButtons/RoundButton/Roundbutton'
import { AiOutlineGoogle } from 'react-icons/ai'
import { GrFacebookOption } from 'react-icons/gr'
import './Authorization.scss';
const LogIn = ({setForm}) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [formInputs, setFormInputs] = useState({ email: '', password: '' })

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
            <div className="header-text">Sign in</div>
            <div className="login-options">
                <RoundButton icon={<AiOutlineGoogle />} />
                <RoundButton icon={<GrFacebookOption />} />
            </div>
            <div>or use your account</div>

            <form onSubmit={handleSubmit(onSubmit)}>
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