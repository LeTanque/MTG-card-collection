import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// 


class NavBar extends Component {
    render() {
        return (
            <>
                <nav>
                    <Link to={{pathname:"/"}}>
                        <h2 className="nav-logo">Magical</h2>
                    </Link>

                </nav>
            </>
        );
    }
}

export default NavBar