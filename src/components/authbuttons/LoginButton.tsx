import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import "./signup.scss";

const LoginButton: React.FC = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button className="authButton" onClick={() => loginWithRedirect()}>
            Log In
        </Button>
    );
}

export default LoginButton;