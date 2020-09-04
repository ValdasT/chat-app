import React, { Fragment} from 'react';

const ProfileSettings = ({ darkMode, setdarkMode }) => {

    const changeColor = () => {
        setdarkMode(!darkMode)
    }

    return (
        <Fragment>
            <div >
                <div className={darkMode? "tab-header tab-header-dark": "tab-header tab-header-light"}>User profile settings</div>
                {/* <div>Hugo works by taking your question and performing search in multiple places so you don't have to. Currently Hugo has access to following knowledge bases:</div> */}
                <button className="btn primary-btn main-btn" onClick={changeColor}>color</button>
                <div className='row'>
                    <div className='col-2'>
                        
                        {/* <ToggleSmall component={'span'}
                            defaultToggled
                            {...true}
                            className="some-class"
                            id="toggle-1"
                            aria-label="text"
                            labelA=''
                            labelB=''
                        /> */}

                    </div>
                    <div className='col-10 element-label'>
                        {/* <span> Central Operations Group (COG)</span> */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ProfileSettings;