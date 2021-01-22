import React, { useEffect, useContext, memo } from 'react';
import { getUser, getRegions, getKbs, exampleQuestionsList } from '../../context/ApiCalls';
import { useUserSession } from '../../context/AuthContext';
import { GlobalContext } from '../../context/GlobalState';
import { MessageContext } from '../../context/MessageContext';
import { Loading } from 'carbon-components-react';

const Auth = memo(() => {
    const { logIn, setUser } = useUserSession();
    const { showAlert, setRegions, setDarkMode, setKbs } = useContext(GlobalContext)
    const { setExampleQuestions } = useContext(MessageContext);

    useEffect(() => {
        (async () => {
            try {
                let data = await getUser();
                let regions = await getRegions();
                let kbs = await getKbs();
                let questionsList = await exampleQuestionsList();
                setRegions(regions);
                setKbs(kbs);
                if (data.user) {
                    setUser(data.user);
                    setDarkMode(data.user.darkMode ? data.user.darkMode : false)
                    setExampleQuestions(questionsList)
                    logIn(data.token, data.user);
                }
            } catch (err) {
                showAlert('danger', err.name, err.message);
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Loading active={true} />
    )
}
)

export default Auth;
