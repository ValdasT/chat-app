import React, { useContext, Fragment } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import './Spinner.scss';

const Spinner = ({ show }) => {
    const { spinner } = useContext(GlobalContext);
    return (
        <Fragment>
            {spinner || show?
                <div>
                    <div className="spinner-bg"></div>
                    <div className='spinner'>
                        <div className='container'>
                            <div className='spinner-container'>
                                <div className="spinner-path">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                                <filter id="gooey">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" result="goo" />
                                    <feBlend in="SourceGraphic" in2="goo" />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                </div> : null
            }
        </Fragment>
    );
}

export default Spinner;