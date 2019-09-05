import React, { Component, Fragment } from 'react';
// import { Redirect } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute.jsx';
// import Profile from '../protected/Profile.jsx';
// import axios from 'axios';
import { connect } from 'react-redux';
import { userLogin } from '../state/actions/index.js';





class Login extends Component {
    state = {
        credentials: {
            username:'',
            password:''
        }
    }
    

    handleChanges = event => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [event.target.name]: event.target.value
            }
        });
    };

    login = event => {
        event.preventDefault();
        this.props.userLogin(this.state.credentials).then(() => {
            this.props.history.push('/magical');
        });
    }

    
    render() {
        return (
            <Fragment>
                

                    <section className="login-form">

                    
                        <form onSubmit={this.login} >
                            <input 
                                type="text"
                                name='username'
                                placeholder='Username...'
                                value={this.state.credentials.username}
                                onChange={this.handleChanges}
                            />
                            <input 
                                type="password"
                                name="password"
                                placeholder='Password...'
                                value={this.state.credentials.password}
                                onChange={this.handleChanges}
                            />
                            <button className='btn-dark'>Log in</button>
                        </form>


                    </section>

            </Fragment>
        )
    }
}


export default connect(
    null,
    { userLogin }
)(Login);

