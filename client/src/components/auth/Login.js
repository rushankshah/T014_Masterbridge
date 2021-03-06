import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { loginUser } from '../../actions/userActions'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js';


const Login = ({ loginUser, isAuthenticated, error, loggedinUser }) => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    let history = useHistory()

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/")
            M.toast({ html: `Hello, ${loggedinUser.name} you have successfully been logged in!` })
        }
        if (error != null) {
            M.toast({ html: `Sorry, ${error}. Invalid Credentials!` })
        }
        // eslint-disable-next-line
    }, [isAuthenticated, error])


    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            M.toast({ html: `Please fill in all fields to login successfully!` });
        }
        else {
            loginUser({ email, password });
            console.log(email, password)
        }

    }
    return (
        <div>
            <section className="section section-login">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m8 offset-m2 l6 offset-l3">
                            <div className="card-panel login teal darken-2 white-text center">
                                <h2>User Login</h2>
                                <form>
                                    <div className="input-field">
                                        <div className="material-icons prefix">email</div>
                                        <input type="email" name='email' value={email} id="email" onChange={onChange} />
                                        <label className="white-text" for="email">Email</label>
                                    </div>
                                    <div className="input-field">
                                        <div className="material-icons prefix">lock</div>
                                        <input type="password" name="password" value={password} id="password" onChange={onChange} />
                                        <label className="white-text" for="password">Password</label>
                                    </div>
                                    <input type="submit" value="Login" onClick={onSubmit}
                                        className="btn btn-large btn-extended waves-effect waves-grey white black-text" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    error: state.user.error,
    loggedinUser: state.user.user
})


export default connect(mapStateToProps, { loginUser })(Login)
