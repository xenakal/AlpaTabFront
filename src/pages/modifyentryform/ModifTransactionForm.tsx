import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import ITransactionModel from '../../shared/interfaces/TransactionModel';
import AlpaTabDataService from '../../services/AlpaTabDataService';
import Snackbar from '@mui/material/Snackbar';
// import TransactionProfile from "../transactionprofile/TransactionProfile";
import '../../common_styles.scss';
import { InsertPhotoOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ModifTransactionForm: React.FC = () => {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    
    const [originalTransaction, setOriginalTransaction] = useState<ITransactionModel>();
    // map that to a transaciton object ? possibly directly to originalTransaction ? 
    const [transactionId, setTransactionId] = useState<number>(-1);
    const [username, setUsername] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [transactionType, setTransactionType] = useState<string>("");
    const [timestamp, setTimestamp] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    
    const [isModifying, setIsModifying] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [transactionSubmitted, setTransactionSubmitted] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const params = useParams();

    // TODO: move that elsewhere 
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert( props, ref,) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    useEffect(() => {
        fetchAndSetTransaction();
    }, []);

    const fetchAndSetTransaction = async () => {

        const id = params.id === 'udefined' ? 0 : parseInt(params.id!);

        setTransactionId(id!);
        if (isAuthenticated) {
            AlpaTabDataService.getTransaction(id!)
                              .then((response: any) => {
                                    const t = response.data;
                                    console.log(t);
                                    setOriginalTransaction(t);
                                    setUsername(t?.nickName ?? "");
                                    setAmount(t?.amount ?? 0);
                                    setTransactionType(t?.transactionType ?? "");
                                    setTimestamp(t?.timestamp.toString().slice(0, 10) ?? "");
                                    setDescription(t?.description ?? "");
                               })
                               .catch((e: Error) => {console.log(e); })
        }
    }
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isDeleting) {
            deleteTransaction(transactionId!);
            navigate("/users");
        }
        else if (!isModifying) {
            startModifyTransaction();
        }
        else {
            modifyTransaction();
        }
    }

    const startModifyTransaction = () => {
        makeInputsReadonly();
        setIsModifying(true);
    }

    const makeInputsReadonly = () => {
        let inputs = document.querySelectorAll("input");
        inputs.forEach(_ => _.removeAttribute("readOnly"));
    }

    const modifyTransaction = () => {
        setTransactionSubmitted(true);

        if (isAuthenticated) {
            const newTransaction: ITransactionModel = {
                id: transactionId,
                nickName: username,
                amount: amount,
                transactionType: transactionType,
                timestamp: new Date(timestamp),
                description: description,
            };
            AlpaTabDataService.modifyTransaction(transactionId, newTransaction)
                .then((res: any) => { 
                    setTransactionSubmitted(true);
                    setSuccess(true);
                    navigate("/transactions");

                })
                .catch((e: Error) => {
                    setSuccess(false);
                })
        }
        setIsModifying(false);
    }

    const deleteTransaction = (id: number) => {
        AlpaTabDataService.deleteTransaction(id)
        .then((res: any) => {
            setSuccess(true);
            navigate("/transactions");
        })
        .catch((e: Error) => {
            setSuccess(false);
        })
        navigate("/transactions");
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        setTransactionSubmitted(false);
    };

    let buttons;
    if (!isModifying) {
        buttons = (
                <>
                    <Button type="submit" form="transactionForm" variant="outlined">Modify</Button>
                    <Button type="submit" onClick={() => setIsDeleting(true)} form="transactionForm" variant="outlined">Delete</Button>
                    <Button type="submit" onClick={() => setIsDeleting(true)} form="transactionForm" variant="outlined">Repeat</Button>
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
            <h1>Transaction ID: {transactionId}</h1>
            <form onSubmit={onSubmit} id="transactionForm" method="post" className="transactionProfile"> 
                {/* <TransactionProfile></TransactionProfile> */}
                    <div className="userInputWrapper">
                        <label className="labels" htmlFor="userInput">User</label>
                        <input readOnly onChange={(e) => setUsername(e.target.value)} id="userInput" type="text" className="form-control" value={username}></input>
                        {/* <ProfileEntryInput defaultval="Choose the user..."/> */}
                    </div>
                    <div className="userInputWrapper">
                        <label className="labels" htmlFor="amountInput">Amount</label>
                        <input readOnly onChange={(e) => setAmount(parseFloat(e.target.value))} id="amountInupt" type="number" className="col-md-6 form-control" value={amount}></input>
                    </div>
                    <div className="userInputWrapper">
                        <label className="labels" htmlFor="transactionTypeInput">Transaction Type</label>
                        <input readOnly onChange={(e) => setTransactionType(e.target.value)} id="transactionTypeInupt" type="text" className="col-md-6 form-control" value={transactionType}></input>
                    </div>
                <div className="userInputWrapper">
                    <label className="labels" htmlFor="timestampInput">Transaction Type</label>
                    <input readOnly id="timestampInupt" type="date" onChange={(e) => setTimestamp(e.target.value)} className="col-md-6 form-control" value={timestamp}></input>
                </div>
                <div className="userInputWrapper">
                    <label className="labels" htmlFor="descriptionInput">Description</label>
                    <input readOnly onChange={(e) => setDescription(e.target.value)} id="descriptionInput" type="text" className="col-md-6 form-control" value={description}></input>
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

export default ModifTransactionForm;



            // <h1>Transaction ID: {transactionId}</h1>
            // <form onSubmit={onSubmit} id="transactionForm" method="post" className="transactionProfile"> 
            //     {/* <TransactionProfile></TransactionProfile> */}
            //     <div className="row-mt-2">
            //         <div className="col-md-6">
            //             <label className="labels" htmlFor="userInput">User</label>
            //             <input readOnly onChange={(e) => setUsername(e.target.value)} id="userInput" type="text" className="form-control" value={username}></input>
            //             {/* <ProfileEntryInput defaultval="Choose the user..."/> */}
            //         </div>
            //     </div>
            //     <div className="row-mt-2">
            //         <div className="col-md-6">
            //             <label className="labels" htmlFor="amountInput">Amount</label>
            //             <input readOnly onChange={(e) => setAmount(parseFloat(e.target.value))} id="amountInupt" type="number" className="col-md-6 form-control" value={amount}></input>
            //         </div>
            //         <div className="col-md-6">
            //             <label className="labels" htmlFor="transactionTypeInput">Transaction Type</label>
            //             <input readOnly onChange={(e) => setTransactionType(e.target.value)} id="transactionTypeInupt" type="text" className="col-md-6 form-control" value={transactionType}></input>
            //         </div>
            //     </div>
            //     <div className="col-md-6">
            //         <label className="labels" htmlFor="timestampInput">Transaction Type</label>
            //         <input readOnly id="timestampInupt" type="date" onChange={(e) => setTimestamp(e.target.value)} className="col-md-6 form-control" value={timestamp}></input>
            //     </div>
            //     <div className="col-md-6">
            //         <label className="labels" htmlFor="descriptionInput">Description</label>
            //         <input readOnly onChange={(e) => setDescription(e.target.value)} id="descriptionInput" type="text" className="col-md-6 form-control" value={description}></input>
            //     </div>
            //     {buttons}
            // </form>
            // <Snackbar open={!success && transactionSubmitted} autoHideDuration={6000} onClose={handleClose}>
            //     <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            //         Failed to modified transaction...
            //     </Alert>
            // </Snackbar>
            // <Snackbar open={success && transactionSubmitted} autoHideDuration={6000} onClose={handleClose}>
            //     <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            //         Successfully modified transaction!
            //     </Alert>
            // </Snackbar>
