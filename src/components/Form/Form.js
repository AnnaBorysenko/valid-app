import React, {Component} from 'react';
import './Form.css';
import {Input} from "../Input/Input";

const testLogin = {
    validEmail: (value) => value === 'johndoe@gmail.com',
    validPassword: (value) => value === 'qwerty123'
}

const patternsValue = {
    email: (value) => value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? null : {email: 'Invalid Username'},
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

        if (errEmail) {
            return this.setState({formErrors: {...errEmail}});
        }

        if (testLogin.validEmail(email) && testLogin.validPassword(password)) {
            console.log('Login success!')
            this.setState({isLogin: true})
        } else {
            this.setState({formErrors: {email: 'Invalid Username'}, isLogin: false, password: ''})
        }
    }

    render() {
        const {password, email, formErrors, isLogin} = this.state;

        const emailCls = [`form-group`, formErrors?.email ? ' error' : ''].join();
        const passCls = [`form-group`, formErrors?.password ? ' error' : ''].join();

        return (
            <form className="demoForm" onSubmit={this.handleSubmit}>
                <div className='icon-email'/>
                <Input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={this.state.email}
                    onChange={this.handleChange}
                    err={formErrors?.email}
                    btn={<button
                        className={[`start`, formErrors?.email ? ', cross' : '', isLogin ? ', ok ' : ''].join('')}
                        type={'btn'}
                        onClick={(e) => {
                            e.preventDefault();
                            this.setState({email: '', password: '', formErrors: null})
                        }}/>}
                    isLogin={isLogin}
                />
                <div className='icon-password'/>
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    err={formErrors?.password}
                    btn={<button
                        className={[`start`, isLogin ? ', ok ' : ''].join('')}
                        type={'btn'}
                        onClick={(e) => {
                            e.preventDefault();
                            this.setState({email: '', password: '', formErrors: null})
                        }}/>}
                    isLogin={isLogin}
                />

                <button onClick={this.handleSubmit} disabled={!password || !email}>Login</button>
                <div className='link-forgot'>Forgot your password?<a> Reset it here.</a></div>
            </form>
        )
    }
}

export default Form;