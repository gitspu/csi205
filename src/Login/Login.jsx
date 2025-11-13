import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { verifyUser } from '../data/users';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ setToken }) {
    const userRef = useRef();
    const passRef = useRef();
    const navigate = useNavigate();

    const handleLogin = () => {
        const user = userRef.current.value.trim();
        const pass = passRef.current.value.trim();
        const userInfo = verifyUser(user, pass);

        userRef.current.value = '';
        passRef.current.value = '';

        if (!userInfo) {
            alert('Wrong username or password');
            userRef.current.focus();
        } else {
            setToken(userInfo.token);
            navigate('/home');
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)' }}
        >
            <div
                className="p-5 bg-white rounded-4 shadow-lg"
                style={{ minWidth: '350px', maxWidth: '400px' }}
            >
                <h2 className="text-center mb-4" style={{ color: '#2575fc' }}>Welcome Back</h2>

                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="user"
                        ref={userRef}
                        style={{ textAlign: "center" }}
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="pass"
                        ref={passRef}
                        style={{ textAlign: "center" }}
                    />
                </Form.Group>

                <button
                    className="btn btn-primary w-100"
                    style={{ backgroundColor: '#2575fc', border: 'none', fontWeight: '500' }}
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
