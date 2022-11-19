import React, {useState} from 'react'
import "./Header.css"
import Modal from '../Modal/Modal'
import { Link} from 'react-router-dom'


function Header(props) {


  return (
    <nav className="navbar navbar-expand-lg bg-light">
     <div className="container-fluid">
     <Link className="navbar-brand d-flex justify-content-center align-items-center" to="/">
      <img src="images/logo/logo.png" alt="Logo" width="50" height="50" className="d-inline-block align-text-top" />
      <h3 className='title'>Voilà!</h3>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className='nav-link' to="/about">About</Link>
        </li>
        {props.userId !== '' ? (
          <li className="nav-item">
          <Link className='nav-link' to="/practice">Practice</Link>
        </li>
        ) : ("")}
        
      </ul>
      <Modal setId={props}/>
    </div>
    
  </div>
</nav>
  )
}

export default Header