import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ loginData, logOut ,name}) {

return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark">
    <div className="container">
        <Link className="navbar-brand fs-3 fw-bolder" style={{ cursor: 'pointer' }} to="/home">
        Notes
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
            {!loginData? (
            <>
                <li className="nav-item">
                <Link className="nav-link fs-5" to="/register" style={{ cursor: 'pointer' }}>
                    Register
                </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link fs-5" to="/login" style={{ cursor: 'pointer' }}>
                    Login
                </Link>
                </li>
            </>
            ) : (
            <>
                {name? <li className="nav-item">
                    <h4 className='name-account my-0  me-3 text-light text-capitalize'>Hi, {name}</h4>
                </li>:""}
                <li className="nav-item">
                    <a className="nav-link fs-5" onClick={logOut} style={{ cursor: 'pointer' }}>
                        Log Out
                    </a>
                </li>
            </>
            )}
        </ul>
        </div>
    </div>
    </nav>
);
}

export default Navbar;
