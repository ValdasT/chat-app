import React, { Fragment, useState, useContext } from 'react';
import { searchUsers } from '../../../services/ApiCalls'
import FormInputSmall from '../../FormInput/FormInputSmall'
import SpinnerSmall from '../../Spinner/SpinnerSmall'
import { GlobalContext } from '../../../context/GlobalState';
import { BiSearchAlt } from 'react-icons/bi'
import { VscClose } from 'react-icons/vsc'
import { useLocation, useHistory } from 'react-router-dom';

import './SearchInput.scss';

const SearchInput = () => {
    const history = useHistory()
    const { showModal } = useContext(GlobalContext);
    const [search, setSearch] = useState('')
    const [showSpinnerSmall, setShowSpinnerSmall] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [showResults, setShowResults] = useState(false);
    const location = useLocation();


    const handleChange = event => {
        const { value } = event.target;
        setSearch(value);
    };

    const onSearch = async () => {
        if (!search.length) {
            return
        } else {
            try {
                setShowSpinnerSmall(true)
                setShowResults(true)
                let results = await searchUsers(search);
                if (results.userProfiles) {
                    setSearchResults(results.userProfiles)
                }
                setShowSpinnerSmall(false)
            } catch (error) {
                setShowSpinnerSmall(false)
                showModal({ type: 'error', body: error.message, name: error.response.name })
            }
        }
    }

    const onselect = (element) => {
        setSearch('')
        if (location.pathname.includes(`/users/`)) {
            if (location.pathname.substr(location.pathname.length - 1) === '/') {
                location.pathname = location.pathname.slice(0, -1)
            }
            location.pathname = location.pathname.slice(0, location.pathname.lastIndexOf('/'))
            history.push(`${location.pathname}/${element._id}`)
        } else {
            history.push(`/users/${element._id}`)
        }
    }

    const clearField = () => {
        setSearch('')
    }

    const hideMatch = () => {
        setTimeout(() => {
            setShowResults(false);
            setSearchResults([])
        }, 100)
    }

    return (
        <Fragment>
            <div onBlur={() => hideMatch()} className='search-element' style={{ zIndex: '112' }}>
                <FormInputSmall
                    style={{ paddingRight: '30px' }}
                    type='text'
                    name='messageInput'
                    value={search}
                    onChange={handleChange}
                    label='Search users'
                    onKeyPress={(e) => (e.charCode === 13 ? onSearch() : null)}
                    button={
                        <div onClick={clearField} className='search-button'>
                            {search.length ? <VscClose /> : <BiSearchAlt />}
                        </div>
                    }
                />
            </div>
            {showResults ?
                <div className="results" >
                    {showSpinnerSmall ? <SpinnerSmall /> :
                        <div>
                            {searchResults.length ?
                                <div>
                                    {searchResults.map(option =>
                                        <div className='results-element' onClick={() => onselect(option)} key={option._id} >
                                            <div>
                                                <div>  {option.name}</div>
                                                <div>  {option.surname}</div>
                                                <div>  {option.email}</div>
                                            </div>
                                        </div>)}
                                </div> : <div style={{ padding: '10px' }}>We didn't find any results</div>}
                        </div>}
                </div> : null}
        </Fragment>
    )
};

export default SearchInput;
