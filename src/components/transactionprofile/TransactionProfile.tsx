import { ProfileEntryInput } from "../profileentryinput/ProfileEntryInput";
import "./transactionProfile.scss"

type TransactionProfileProps = {
    onChange: EventListener,
}
// add transaction param  
const TransactionProfile: React.FC = () => {

    return (
        <>
            <div id="transactionForm" className="transactionProfile"> {/* see how to handle ids in case of multiple Profiles per page */}
                <div className="row-mt-2">
                    <div className="col-md-6">
                        <label className="labels" htmlFor="userInput">User</label>
                        <input id="userInput" type="text" className="form-control" placeholder={"Choose the user..."}></input>
                        {/* <ProfileEntryInput defaultval="Choose the user..."/> */}
                    </div>
                </div>
                <div className="row-mt-2">
                    <div className="col-md-6">
                        <label className="labels" htmlFor="amountInput">Amount</label>
                        <input id="amountInupt" type="text" className="col-md-6 form-control" placeholder={"Set the amount..."}></input>
                    </div>
                    <div className="col-md-6">
                        <label className="labels" htmlFor="amountInput">Transaction Type</label>
                        <input id="amountInupt" type="text" className="col-md-6 form-control" placeholder={"Transaction type"}></input>
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="labels" htmlFor="descriptionInput">Transaction Type</label>
                    <input id="descriptionInput" type="text" className="col-md-6 form-control" placeholder={"Description"}></input>
                </div>
            </div>
        </>
    );

}

export default TransactionProfile;