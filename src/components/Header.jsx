import React from 'react';

import foodAppLogo from '../assets/logo.jpg';

function Header() {
  return (
    <header id="main-header">
        <div id="title">
            <img src={foodAppLogo} alt='Food App Logo'></img>
            <h1>REACTFOOD</h1>
        </div>
        <button>Cart (0)</button>
    </header>
  )
}

export default Header