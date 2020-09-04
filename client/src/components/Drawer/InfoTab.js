import React, { Fragment } from 'react';

const InfoTab = ({ darkMode }) => {


    return (
        <Fragment>
            <div >
                <div className={darkMode ? "tab-header tab-header-dark" : "tab-header tab-header-light"}>Information</div>
                <div>This is Cognitive Advisor Hugo.
                    If you face any problems while interacting with Hugo, please raise a ticket here.To get more information about the tool, click here.
                    If you want to request your own Knowledge Base, ask any questions or provide suggestions feel free to email Monika.Supejevaite@ibm.com.
                </div>
            </div>
        </Fragment>
    );
}

export default InfoTab;