import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Keyrune } from "@saeris/react-keyrune"

// 


class NavBar extends Component {
    render() {
        return (
            <>
                <nav>
                    <Link to={{pathname:"/"}}>
                        <h2 className="nav-logo">Magical</h2>
                    </Link>

                    <Keyrune 
                        gradient fixed 
                        set="ugl" 
                        rarity="mythic" 
                        size="3x"
                    />
                </nav>
            </>
        );
    }
}

export default NavBar