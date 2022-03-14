import React from 'react';
//import PropTypes from 'prop-types';
import {useForm} from "react-hook-form";
import classes from './LoginForm.module.css';
import {loginI18n} from "./LoginFormI18n";
import {Box, TextField} from "@mui/material";
import Button from "@mui/material/Button";

/**
 * Компонент с использованием PropTypes & DefaultProps (внизу пример).
 * @param isError bool - Надо ли отображать сообщение об ошибке.
 * @param errorMessage string - расшифровка возможной ошибки при логине
 * @param disabled bool - Сделать кнопку submit неактивной
 * @param onLogin func - callback with { identifier, password } object parameter
 * @param i18n object - Все надписи и сообщения (см. "./LoginFormI18n").
 * @param noForgotPassword bool - Не показывать ссылку "Забыли пароль?"
 * @param onForgotPassword func - callback with {identifier} object parameter
 * @returns {JSX.Element}
 * @constructor
 */

interface RegisterFormProps {
    isError?: boolean,
    errorMessage?: string,
    disabled?: boolean,
    onRegister: (f: any) => void,
    i18n?: any,
    noForgotPassword?: boolean,
    onForgotPassword?: (f: any) => void
}

const RegisterFormTS = ({
                         isError = false,
                         errorMessage,
                         disabled = false,
                         onRegister = f => console.log('onLogin: ', f),
                         i18n = {},
                         noForgotPassword = false,
                         onForgotPassword = f => console.log('onForgotPassword: ', f),
                     }: RegisterFormProps) => {
    // Слияние i18n
    i18n = {...loginI18n, ...i18n};
    // Хук react-hook-form
    const {register, handleSubmit, watch, formState: {errors, isValid}} = useForm({
        mode: "onChange"
    });
    const onSubmit = (data: any) => {
        console.log('Result: ', data);
        onRegister(data);
    }
    //console.log('Identifier watch: ', watch('identifier')); // watch input value by passing the name of it

    return (
        <div>

            {/*"handleSubmit" will validate your inputs before invoking "onSubmit"*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*Заголовок, описание и ошибки*/}
                {/*<h1>{i18n.title}</h1>*/}
                {/*<div>{i18n.description}</div>*/}
                <div>
                    {isError && (errorMessage ?? i18n.errorMessage)}
                </div>
                <Box>
                    {/* include validation with required or other standard HTML validation rules */}
                    <TextField label={i18n.identifier.title} variant="outlined" {...register('username', {
                        required: i18n.identifier.required,
                        minLength: {
                            value: 2,
                            message: i18n.identifier.validation
                        },
                        // validate: true
                    })} />
                    {/* errors will return when field validation fails  */}
                    {errors.identifier && <p>{errors.identifier.message}</p>}

                    <TextField label="email" variant="outlined" {...register('email')} />

                    {/* include validation with required or other standard HTML validation rules */}
                    <TextField label={i18n.password.title} type="password" variant="outlined" {...register('password', {
                        required: i18n.password.required,
                        minLength: {
                            value: 8,
                            message: i18n.password.validation
                        },
                        // validate: true
                    })} />
                    {/* errors will return when field validation fails  */}
                    {errors.password && <p>{errors.password.message}</p>}

                    {!noForgotPassword &&
                        <a onClick={() => onForgotPassword({identifier: watch('identifier')})}>
                            {i18n.forgotPassword}
                        </a>}

                    <input disabled={disabled || !isValid} type="submit" value="Register"/>
                </Box>
            </form>
        </div>
    );
};

// LoginFormTS.propTypes = {
//     isError: PropTypes.bool,
//     errorMessage: PropTypes.string,
//     disabled: PropTypes.bool,
//     onLogin: PropTypes.func,
//     i18n: PropTypes.object,
//     noForgotPassword: PropTypes.bool,
//     onForgotPassword: PropTypes.func
// };

/*LoginFormTS.defaultProps = {
    isError: false,
    onLogin: f => console.log('onLogin: ', f),
    onForgotPassword: f => console.log('onForgotPassword: ', f),
};*/

export default RegisterFormTS;