import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import ITransactionModel from '../../shared/interfaces/TransactionModel';
import AlpaTabDataService from '../../services/AlpaTabDataService';
import Snackbar from '@mui/material/Snackbar';
// import TransactionProfile from "../transactionprofile/TransactionProfile";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewTransactionForm: React.FC = () => {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    
    const [username, setUsername] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [transactionType, setTransactionType] = useState<string>("");
    const [timestamp, setTimestamp] = useState<Date>(new Date());
    const [description, setDescription] = useState<string>("");
    
    const [transactionSubmitted, setTransactionSubmitted] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
      ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    const createTransaction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setTransactionSubmitted(true);

        if (isAuthenticated) {
            const newTransaction: ITransactionModel = {
                id: 0,
                nickName: username,
                amount: amount,
                transactionType: transactionType,
                timestamp: timestamp,
                description: description,
            };
            AlpaTabDataService.addTransaction(newTransaction)
                .then((res: any) => { 
                    console.log(res);
                    setTransactionSubmitted(true);
                    setSuccess(true);
                    navigate("/transactions");

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
        setTransactionSubmitted(false);
    };


    // return transactionAdded ? <Redirect to="/transactions" push/> : 
    return (
        <>
            <h1>New Transaction</h1>
            <form onSubmit={createTransaction} id="transactionForm" className="transactionProfile"> 
                {/* <TransactionProfile></TransactionProfile> */}
                <div className="row-mt-2">
                    <div className="col-md-6">
                        <label className="labels" htmlFor="userInput">User</label>
                        <input onChange={(e) => setUsername(e.target.value)} id="userInput" type="text" className="form-control" placeholder={"Choose the user..."}></input>
                        {/* <ProfileEntryInput defaultval="Choose the user..."/> */}
                    </div>
                </div>
                <div className="row-mt-2">
                    <div className="col-md-6">
                        <label className="labels" htmlFor="amountInput">Amount</label>
                        <input onChange={(e) => setAmount(parseFloat(e.target.value))} id="amountInupt" type="number" className="col-md-6 form-control" placeholder={"Set the amount..."}></input>
                    </div>
                    <div className="col-md-6">
                        <label className="labels" htmlFor="transactionTypeInput">Transaction Type</label>
                        <input onChange={(e) => setTransactionType(e.target.value)} id="transactionTypeInupt" type="text" className="col-md-6 form-control" placeholder={"Transaction type"}></input>
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="labels" htmlFor="timestampInput">Timestamp</label>
                    <input id="timestampInupt" type="date" onChange={(e) => setTimestamp(new Date(e.target.value))} className="col-md-6 form-control" placeholder={"Timestamp"}></input>
                </div>
                <div className="col-md-6">
                    <label className="labels" htmlFor="descriptionInput">Description</label>
                    <input onChange={(e) => setDescription(e.target.value)} id="descriptionInput" type="text" className="col-md-6 form-control" placeholder={"Description"}></input>
                </div>
                <Button type="submit" form="transactionForm" variant="outlined" style={{marginTop:"3em", color:"var(--main-color-4)", borderColor:"var(--main-color-4)"}}>Create New</Button>
            </form>
            <Snackbar open={!success && transactionSubmitted} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Failed to add transaction...
                </Alert>
            </Snackbar>
            <Snackbar open={success && transactionSubmitted} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Successfully added transaction!
                </Alert>
            </Snackbar>

        </>
      )
};

export default NewTransactionForm;