import React, { useState, memo, Fragment } from 'react';
import LogIn from '../components/Authorization/Login'
import SignUp from '../components/Authorization/SignUp'

const Auth = () => {
    const [changeForm, setChangeForm] = useState(true);

    const setForm = ()=> {
        setChangeForm(!changeForm)
    }
    return (
        <Fragment>
            {changeForm ? < LogIn setForm={setForm}/> : < SignUp setForm={setForm} />}
       </Fragment>
    )
}

export default memo(Auth);