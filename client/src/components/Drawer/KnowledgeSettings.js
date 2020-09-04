import React, { Fragment } from 'react';
import { ToggleSmall } from 'carbon-components-react';

const KnowledgeSettings = ({ darkMode }) => {

    return (
        <Fragment>
            <div >
                <div className={darkMode ? "tab-header tab-header-dark" : "tab-header tab-header-light"}>Knowledge base settings</div>
                <div>Hugo works by taking your question and performing search in multiple places so you don't have to. Currently Hugo has access to following knowledge bases:</div>
                <div className='row'>
                    <div className='col-2'>
                        <ToggleSmall component={'span'}
                            defaultToggled
                            {...true}
                            className="some-class"
                            id="toggle-1"
                            aria-label="text"
                            labelA=''
                            labelB=''
                        />

                    </div>
                    <div className='col-10 element-label'>
                        <span> Central Operations Group (COG)</span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-2'>
                        <ToggleSmall component={'span'}
                            defaultToggled
                            {...true}
                            className="some-class"
                            id="toggle-2"
                            aria-label="text"
                            labelA=''
                            labelB=''
                        />

                    </div>
                    <div className='col-10 element-label'>
                        <span> Contract Query</span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-2'>
                        <ToggleSmall component={'span'}
                            defaultToggled
                            {...true}
                            className="some-class"
                            id="toggle-3"
                            aria-label="text"
                            labelA=''
                            labelB=''
                        />

                    </div>
                    <div className='col-10 element-label'>
                        <span> Deal Compliance and Approvals (DCA)</span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-2'>
                        <ToggleSmall component={'span'}
                            defaultToggled
                            {...true}
                            className="some-class"
                            id="toggle-4"
                            aria-label="text"
                            labelA=''
                            labelB=''
                        />

                    </div>
                    <div className='col-10 element-label'>
                        <span> Empower Me</span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-2'>
                        <ToggleSmall component={'span'}
                            defaultToggled
                            {...true}
                            className="some-class"
                            id="toggle-5"
                            aria-label="text"
                            labelA=''
                            labelB=''
                        />

                    </div>
                    <div className='col-10 element-label'>
                        <span> IBM Way</span>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default KnowledgeSettings;