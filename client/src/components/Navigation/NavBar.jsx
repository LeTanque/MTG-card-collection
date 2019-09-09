import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Keyrune } from "@saeris/react-keyrune"


class NavBar extends Component {
    render() {
        return (
            <>
                <section className="nav">
                    <Link to={{pathname:"/"}}>
                        <h2 className="nav-logo">Magical</h2>
                    </Link>
                    <nav>
                        <NavLink to={"/card-search"}>
                            <span>Search</span>
                        </NavLink>
                        <NavLink to={"/random-pack"}>
                            <span>Random Pack</span>
                        </NavLink>
                        <NavLink to={"/collection"}>
                            <span>Collection</span>
                        </NavLink>
                        {/* <NavLink to={"/auth/profile"}> */}
                        <NavLink to={"/magical"}>
                            <span><code>MAGICAL</code></span>
                        </NavLink>
                        <NavLink to={"/auth/login"}>
                            <span><code className="cred">LOG-IN</code></span>
                        </NavLink>
                        <Keyrune 
                            gradient fixed 
                            set="ugl" 
                            rarity="mythic" 
                            size="3x"
                        />
                    </nav>
                </section>
                {/* <div className="fa-sm nav-token">{localStorage.getItem('token')}</div> */}
            </>
        );
    }
}

export default NavBar