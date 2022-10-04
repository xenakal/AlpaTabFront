import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import "./signup.scss";

const LogoutButton: React.FC = () => {
    const { logout } = useAuth0();

    return (
        <Button className="authButton" onClick={() => logout()}>
            Sign Out
        </Button>
    )
}

export default LogoutButton;