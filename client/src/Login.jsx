import React from 'react'
import request from './utils/auth.js'
import {server} from './config.json'

const {url : URL} = server

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: null,
            password: null,
            token: null,
            message: null
        }
    }
    handleChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    handleChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    // success: username, token
    // error: code, message
    handleLoginSubmit(e) {
        e.preventDefault()
        request({
            method: 'POST',
            url: URL + '/user/login',
            body: {
                username: this.state.username,
                password: this.state.password
            },
            success: (err, res) => {
                const {token, username, message} = res.body
                localStorage.setItem('username', username)
                localStorage.setItem('token', token)
                this.setState({
                    token: token,
                    message: message
                })
            }
        })
    }
    handleLoginOut() {
        this.setState({
            token: null,
            username: null,
            password: null
        })
        localStorage.setItem('token', null)
        localStorage.setItem('username', null)
    }
    // success: username, token
    // error: code, message
    handleRegisterSubmit(e) {
        e.preventDefault()
        request({
            method: 'POST',
            url: URL + '/user/register',
            body: {
                username: this.state.username,
                password: this.state.password,
            },
            success: (err, res) => {
                if(err) {
                    throw err
                } else {
                    const {token, username, message} = res.body
                    localStorage.setItem('username', username)
                    localStorage.setItem('token', token)
                    this.setState({
                        token: token,
                        message: message
                    })
                }
            }
        })
    }
    // success: content
    // error: code, message
    handleAction1() {
        request({
            method: 'POST',
            url: URL + '/user/action1',
            auth: `Bearer ${localStorage.getItem('token')}`,
            success: (err, res) => {
                console.log(res)
                const {message} = res.body
                this.setState({
                    message: message
                })
            }
        })
    }
    // success: content
    // error: code, message
    handleAction2() {
        request({
            method: 'POST',
            url: URL + '/user/action2',
            auth: `Bearer ${localStorage.getItem('token')}`,
            success: (err, res) => {
                console.log(res.body)
                const {message} = res.body
                this.setState({
                    message: message
                })
            }
        })
    }
    render() {
        return (
            <div className="login1">
                <p>Login</p>
            <form onSubmit={::this.handleLoginSubmit}>
                <input type="text" onChange={::this.handleChangeUsername} placeholder="Username" />
                <input type="password" onChange={::this.handleChangePassword} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
                <button onClick={::this.handleLoginOut}>Logout</button>
                <p>Register</p>
                <form onSubmit={(e) => { this.handleRegisterSubmit(e)}}>
                    <input type="text" onChange={::this.handleChangeUsername} placeholder="Username" />
                    <input type="password" onChange={::this.handleChangePassword} placeholder="Password" />
                    <button type="submit">Register</button>
                </form>
                <p>token: {this.state.token}</p>
                <p>message: {this.state.message}</p>
                <button onClick={::this.handleAction1}>user action1</button>
                <button onClick={::this.handleAction2}>admin action2</button>
            </div>
        )
    }
}