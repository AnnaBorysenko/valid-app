import React, {Component} from 'react';
import '../Form/Form.css';

export const Input = ({err, btn, isLogin, ...rest}) => {
    const cls = [`form-control`, err ? ' ' : '', isLogin ? ' success ' : ''].join('');

    return (
            <div>
                <div style={{display: 'flex'}}>
                    <input
                        className={cls}
                        {...rest}
                    />
                    {btn ?? null}
                </div>
                {<div className='error-text'> {err}</div>}
            </div>
        );
}

