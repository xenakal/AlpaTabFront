import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import IUserModel from '../../shared/interfaces/UserModel';
import AlpaTabDataService from '../../services/AlpaTabDataService';
import Snackbar from '@mui/material/Snackbar';
// import TransactionProfile from "../transactionprofile/TransactionProfile";
import '../../common_styles.scss';
import { InsertPhotoOutlined } from '@mui/icons-material';
import { setDefaultResultOrder } from 'dns';
import { useNavigate } from 'react-router-dom';

const ModifUserForm: React.FC = () => {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    
    const [originalUser, setOriginalUser] = useState<IUserModel>();
    // map that to a transaciton object ? possibly directly to originalTransaction ? 
    const [userId, setUserId] = useState<number>(-1);
    const [nickName, setNickName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [userType, setUserType] = useState<string>("");
    const [balance, setBalance] = useState<number>(0);
    
    const [isModifying, setIsModifying] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [transactionSubmitted, setUserSubmitted] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const params = useParams();

    // TODO: move that elsewhere 
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert( props, ref,) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    useEffect(() => {
        fetchAndSetUser();
    }, []);

    const fetchAndSetUser = async () => {

        const id = params.id === 'udefined' ? 0 : parseInt(params.id!);
        setUserId(id!);
        if (isAuthenticated) {
            AlpaTabDataService.getUser(id!)
                              .then((response: any) => {
                                    const t = response.data;
                                    setOriginalUser(t);
                                    setNickName(t?.nickName ?? "");
                                    setEmail(t?.email ?? "");
                                    setFirstName(t?.firstName ?? "");
                                    setLastName(t?.lastName ?? "");
                                    setUserType(t?.userType ?? "");
                                    setBalance(t?.balance ?? 0);

                               })
                               .catch((e: Error) => {console.log(e); })
        }
    }
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isDeleting) {
            deleteUser(userId);
            navigate("/users");
        }
        else if (!isModifying) {
            startModifyUser();
        }
        else {
            modifyUser();
        }
    }

    const startModifyUser = () => {
        makeInputsReadonly();
        setIsModifying(true);
    }

    const makeInputsReadonly = () => {
        let inputs = document.querySelectorAll("input");
        inputs.forEach(_ => _.removeAttribute("readOnly"));
    }

    const modifyUser = () => {
        setUserSubmitted(true);

        if (isAuthenticated) {
            const newUser: IUserModel = {
                id: userId,
                nickName: nickName,
                email: email,
                firstName: firstName, 
                lastName: lastName, 
                userType: userType, 
                balance: balance,
            };
            AlpaTabDataService.modifyUser(userId, newUser)
                .then((res: any) => { 
                    setUserSubmitted(true);
                    setSuccess(true);
                    navigate("/users");

                })
                .catch((e: Error) => {
                    setSuccess(false);
                })
        }
        setIsModifying(false);
    }

    const deleteUser = (id: number) => {
        AlpaTabDataService.deleteUser(id)
        .then((res: any) => {
            setSuccess(true);
            console.log("test");
            navigate("/users");
        })
        .catch((e: Error) => {
            setSuccess(false);
        })
        navigate("/users");
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        setUserSubmitted(false);
    };

    let buttons;
    if (!isModifying) {
        buttons = (
                <>
                    <Button type="submit" form="transactionForm" variant="outlined" style={{marginTop:"3em", color:"var(--main-color-4)", borderColor:"var(--main-color-4)"}}>Modify</Button>
                    <Button type="submit"onClick={() => setIsDeleting(true)} form="transactionForm" variant="outlined" style={{marginTop:"3em", color:"var(--main-color-4)", borderColor:"var(--main-color-4)", marginLeft: "2em"}}>Delete</Button>
                </>
        )
    }
    else {
        buttons = (
                <>
                    <Button type="submit" form="transactionForm" variant="outlined" style={{marginTop:"3em", color:"var(--main-color-4)", borderColor:"var(--main-color-4)", marginLeft: "2em"}}>Validate modification!</Button>
                </>
        )
    }

    // return transactionAdded ? <Redirect to="/transactions" push/> : 
    return (
        <div className="contentPage">
            <h1>User: {originalUser?.nickName}</h1>
            <form onSubmit={onSubmit} id="transactionForm" method="post" className="transactionProfile"> 
                {/* <TransactionProfile></TransactionProfile> */}
                    <div className="userInputWrapper">
                        <label className="labels" htmlFor="nicknameInput">NickName</label>
                        <input readOnly onChange={(e) => setNickName(e.target.value)} id="nicknameInput" type="text" className="form-control" value={nickName}></input>
                        {/* <ProfileEntryInput defaultval="Choose the user..."/> */}
                    </div>
                    <div className="userInputWrapper">
                        <label className="labels" htmlFor="emailInput">Email</label>
                        <input readOnly onChange={(e) => setEmail(e.target.value)} id="emailInupt" type="text" className="col-md-6 form-control" value={email}></input>
                    </div>
                    <div className="userInputWrapper">
                        <label className="labels" htmlFor="firstNameInput">First Name</label>
                        <input readOnly onChange={(e) => setFirstName(e.target.value)} id="firstNameInupt" type="text" className="col-md-6 form-control" value={firstName}></input>
                    </div>
                <div className="userInputWrapper">
                    <label className="labels" htmlFor="lastNameInput">Last Name</label>
                    <input readOnly onChange={(e) => setLastName(e.target.value)} id="lastNameInupt" type="text" className="col-md-6 form-control" value={lastName}></input>
                </div>
                <div className="userInputWrapper">
                    <label className="labels" htmlFor="userTypeInput">User type</label>
                    <input readOnly onChange={(e) => setUserType(e.target.value)} id="userTypeInupt" type="text" className="col-md-6 form-control" value={userType}></input>
                </div>
                <div className="userInputWrapper">
                    <label className="labels" htmlFor="descriptionInput">Balance</label>
                    <input readOnly id="descriptionInput" type="number" className="col-md-6 form-control" value={balance}></input>
                </div>
                {buttons}
            </form>
            <Snackbar open={!success && transactionSubmitted} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Failed to modified transaction...
                </Alert>
            </Snackbar>
            <Snackbar open={success && transactionSubmitted} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Successfully modified transaction!
                </Alert>
            </Snackbar>

        </div>
      )
};

export default ModifUserForm;