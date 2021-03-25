import React, {Component} from 'react';
import './Form.css';
import {Input} from "../Input/Input";


const patternsValue = {
    email: (value) => value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? null : {email: 'Invalid Username'},
    password: (value) => value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/) ? null : {password: 'Must contain 8 characters, one uppercase, one lowercase, one number and one special character'},
}


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: {email: null, password: null},
            isLogin: false,
        }
    }

    handleChange = ({target: {name, value}}) => {
        this.setState({[name]: value, formErrors: null})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {email, password} = this.state;

        const errEmail = patternsValue.email(email);
        const errPass = patternsValue.password(password);

        if (errEmail || errPass) {
            return this.setState({formErrors: {...errEmail, ...errPass}});
        }

        if (!errEmail && !errPass) {
            this.setState({isLogin: true})
        }
    }

    render() {
        const {password, email, formErrors, isLogin} = this.state;

        const emailCls = [`form-group`, formErrors?.email ? ' error' : ''].join();
        const passCls = [`form-group`, formErrors?.password ? ' error' : ''].join();
        const createBtnCls = (err) => [`start`, err ? ' cross' : '', isLogin ? ' ok ' : ''].join('');

        return (
            <form className="demoForm" onSubmit={this.handleSubmit} novalidate="">
                <div className='icon-email'/>
                <Input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={this.handleChange}
                    err={formErrors?.email}
                    btn={<button
                        className={createBtnCls(formErrors?.email)}
                        type={'btn'}
                        onClick={(e) => {
                            this.setState({email: '', formErrors: null})
                        }}/>}
                    isLogin={isLogin}
                />
                <div className='icon-password'/>
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleChange}
                    err={formErrors?.password}
                    btn={<button
                        className={createBtnCls(formErrors?.password)}
                        type={'btn'}
                        onClick={(e) => {
                            this.setState({password: '', formErrors: null})
                        }}/>}
                    isLogin={isLogin}
                />

                <button disabled={!password || !email}>Login</button>
                <div className='link-forgot'>Forgot your password?<a> Reset it here.</a></div>
            </form>
        )
    }
}

export default Form;