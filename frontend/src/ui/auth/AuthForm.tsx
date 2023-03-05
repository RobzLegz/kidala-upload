import React, { useState } from 'react';
import Button from '../Button';
import { Input } from '../Input';
import { useRouter } from 'next/router';
import { loginUser, registerUser } from '../../requests/userRequests';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { invalidUsername, validateEmail } from '../../utils/valid';

export interface AuthFormProps {
    register?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ register = false }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const userInfo: UserInfo = useSelector(selectUser);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async (e: React.MouseEvent) => {
        e.preventDefault();

        let usernameErr = '',
            emailErr = '',
            passwordErr = '';

        if (register) {
            if (!email) {
                emailErr = 'Enter your email';
            } else {
                if (!validateEmail(email)) {
                    emailErr = 'Invalid email format';
                }
            }
        }

        usernameErr = invalidUsername(username);

        if (!password) {
            passwordErr = 'Enter your password';
        } else if (password.length < 6) {
            passwordErr = 'Password should be at least 6 characters long';
        }

        setUsernameError(usernameErr);
        setEmailError(emailErr);
        setPasswordError(passwordErr);

        if (usernameErr || emailErr || passwordErr) {
            return;
        }

        if (!register) {
            await loginUser(username, password, dispatch, router);
        } else {
            await registerUser(
                username,
                password,
                email,
                dispatch,
                userInfo.token,
                router
            );
        }
    };

    const handleReRoute = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!register) {
            router.push('/register');
        } else {
            router.push('/login');
        }
    };

    return (
        <form className="max-w-[550px] w-11/12 bg-primary-800 border border-primary-700 rounded-lg flex flex-col items-center justify-start p-4">
            <h2 className="text-primary-100 mb-4">
                {!register ? 'Login' : 'Register'}
            </h2>

            {register && (
                <div className="flex flex-col w-full">
                    <label htmlFor="email" className="text-primary-100 mb-1">
                        Email
                    </label>

                    <Input
                        type="email"
                        placeholder="Email"
                        name="email"
                        id="email"
                        required
                        error={emailError}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            )}

            <div className="flex flex-col w-full mt-2">
                <label htmlFor="username" className="text-primary-100 mb-1">
                    Username
                </label>

                <Input
                    placeholder="Username"
                    name="username"
                    id="username"
                    required
                    error={usernameError}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="flex flex-col w-full mt-2">
                <label htmlFor="password" className="text-primary-100 mb-1">
                    Password
                </label>

                <Input
                    placeholder="Password"
                    name="password"
                    id="password"
                    type="password"
                    error={passwordError}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="w-full mt-4 flex items-center justify-between">
                <div className="flex items-center">
                    <p className="text-accent mr-2">
                        {!register
                            ? "Don't have an account?"
                            : 'Already have an account?'}{' '}
                        <span
                            className="text-primary-100 cursor-pointer"
                            onClick={handleReRoute}
                        >
                            {!register ? 'Register' : 'Login'}
                        </span>
                    </p>
                </div>

                <Button onClick={handleLogin} type="submit">
                    {!register ? 'Login' : 'Register'}
                </Button>
            </div>
        </form>
    );
};

export default AuthForm;
