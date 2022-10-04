import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import IUserModel from '../../shared/interfaces/UserModel';
import AlpaTabDataService from '../../services/AlpaTabDataService';
import Snackbar from '@mui/material/Snackbar';
// import TransactionProfile from "../transactionprofile/TransactionProfile";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserType from '../../shared/interfaces/UserType';

const NewUserForm: React.FC = () => {

    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    
    const [nickName, setNickName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [userType, setUserType] = useState<string>("");
    const [balance, setBalance] = useState<number>(0);
    
    const [userSubmitted, setUserSubmitted] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
      ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    const createTransaction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setUserSubmitted(true);

        if (isAuthenticated) {
            const newUser: IUserModel = {
                id: 0,
                nickName: nickName,
                email: email,
                firstName: firstName,
                lastName: lastName,
                userType: userType,
                balance: balance,
            };
            AlpaTabDataService.addUser(newUser)
                .then((res: any) => { 
                    setUserSubmitted(true);
                    setSuccess(true);
                    navigate("/users");
                })
                .catch((e: Error) => {
                    console.log(e); 
                    setSuccess(false);
                })
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        setUserSubmitted(false);
    };


    // return transactionAdded ? <Redirect to="/transactions" push/> : 
    return (
        <>
            <h1>New User</h1>
            <form onSubmit={createTransaction} id="userForm" className="userProfile"> 
                {/* <TransactionProfile></TransactionProfile> */}
                <div className="row-mt-2">
                    <div className="col-md-6">
                        <label className="labels" htmlFor="nicknameInput">NickName</label>
                        <input onChange={(e) => setNickName(e.target.value)} id="nicknameInput" type="text" className="form-control" value={nickName}></input>
                        {/* <ProfileEntryInput defaultval="Choose the user..."/> */}
                    </div>
                </div>
                <div className="row-mt-2">
                    <div className="col-md-6">
                        <label className="labels" htmlFor="emailInput">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} id="emailInupt" type="text" className="col-md-6 form-control" value={email}></input>
                    </div>
                    <div className="col-md-6">
                        <label className="labels" htmlFor="firstNameInput">First Name</label>
                        <input onChange={(e) => setFirstName(e.target.value)} id="firstNameInupt" type="text" className="col-md-6 form-control" value={firstName}></input>
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="labels" htmlFor="lastNameInput">Last Name</label>
                    <input onChange={(e) => setLastName(e.target.value)} id="lastNameInupt" type="text" className="col-md-6 form-control" value={lastName}></input>
                </div>
                <div className="col-md-6">
                    <label className="labels" htmlFor="userTypeInput">User type</label>
                    <input onChange={(e) => setUserType(e.target.value)} id="userTypeInupt" type="text" className="col-md-6 form-control" value={userType}></input>
                </div>
                <div className="col-md-6">
                    <label className="labels" htmlFor="descriptionInput">Balance</label>
                    <input onChange={(e) => setBalance(parseFloat(e.target.value === "NaN" ? "0" : e.target.value))} id="descriptionInput" type="number" className="col-md-6 form-control" value={balance}></input>
                </div>
                <Button type="submit" form="userForm" variant="outlined" style={{marginTop:"3em", color:"var(--main-color-4)", borderColor:"var(--main-color-4)"}}>Create New</Button>
            </form>
            <Snackbar open={!success && userSubmitted} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Failed to add user...
                </Alert>
            </Snackbar>
            <Snackbar open={success && userSubmitted} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Successfully added user!
                </Alert>
            </Snackbar>

        </>
      )
};

export default NewUserForm;