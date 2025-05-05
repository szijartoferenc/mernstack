import { useState, useContext } from 'react';
import { Box, Button, TextField, styled, Typography, InputAdornment, IconButton } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #fb661b;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 14px;
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: ''
};

const Login = ({ isAuthenticated }) => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');
    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // Állapot a jelszó láthatóságának kezelésére

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };

    const onInputChange = (e) => {
        setSignup((prevSignup) => {
            const updatedValue = e.target.value || "";
            return { ...prevSignup, [e.target.name]: updatedValue };
        });
    };

    const signupUser = async () => {
        if (!signup.username || !signup.name || !signup.password) {
            setError("All fields are required!");
            return;
        }

        try {
            let response = await API.userSignup(signup);
            if (response.isSuccess) {
                setError('');
                setSignup(signupInitialValues);
                toggleAccount('login');
            } else {
                setError(response.msg || 'Something went wrong! Please try again later');
            }
        } catch (error) {
            setError(error.message || 'Something went wrong!');
        }
    };

    const onValueChange = (e) => {
        setLogin((prevLogin) => ({ ...prevLogin, [e.target.name]: e.target.value || "" }));
    };

    const loginUser = async () => {
        if (!login.username || !login.password) {
            setError("Username and password are required!");
            return;
        }

        try {
            let response = await API.userLogin(login);
            if (response.isSuccess) {
                setError('');
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setAccount({ username: response.data.username, name: response.data.name });
                isAuthenticated(true);
                navigate('/');
            } else {
                setError(response.msg || 'Something went wrong! Please try again later');
            }
        } catch (error) {
            setError(error.message || 'Something went wrong!');
        }
    };

    return (
        <Component>
        <Box>
            <Image src={imageURL} alt="login" />
            {account === 'login' ? (
                <Wrapper>
                    <TextField
                        variant="standard"
                        value={login.username}
                        onChange={onValueChange}
                        name="username"
                        label="Enter username"
                    />
                    <TextField
                        variant="standard"
                        value={login.password}
                        onChange={onValueChange}
                        name="password"
                        label="Enter password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        aria-label="toggle password visibility"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
    
                    {error && <Error>{error}</Error>}
                    <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <SignupButton onClick={() => toggleSignup()}>Create an account</SignupButton>
                </Wrapper>
            ) : (
                <Wrapper>
                    <TextField
                        variant="standard"
                        value={signup.name}
                        onChange={onInputChange}
                        name="name"
                        label="Enter Name"
                    />
                    <TextField
                        variant="standard"
                        value={signup.username}
                        onChange={onInputChange}
                        name="username"
                        label="Enter Username"
                    />
                    <TextField
                        variant="standard"
                        value={signup.password}
                        onChange={onInputChange}
                        name="password"
                        label="Enter Password"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {error && <Error>{error}</Error>}
                    <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                </Wrapper>
            )}
        </Box>
    </Component>
    
    );
};

export default Login;
