import http from "../axios_http";
import ITransactionModel from "../shared/interfaces/TransactionModel";
import IUserModel from "../shared/interfaces/UserModel";

const getAllUsers = () => {
    return http.get<IUserModel[]>("/users");
};

const getUser = (id: number | string) => {
    return http.get<IUserModel>(`/users/${id}`);
};

const addUser = (user: IUserModel) => {
    return http.post<IUserModel>("/users", user);
};

const modifyUser = (id: number | string, updatedUser: IUserModel) => {
    return http.put<IUserModel>(`/users/${id}`, updatedUser);
}

const deleteUser = (id: number | string) => {
    return http.delete<IUserModel>(`/users/${id}`);
}

const getAllTransactions = () => {
    return http.get<ITransactionModel[]>("/transactions");
};

const getTransaction = (id: number | string) => {
    return http.get<ITransactionModel>(`/transactions/${id}`);
}

const addTransaction = (transaction: ITransactionModel) => {
    return http.post<ITransactionModel>("/transactions", transaction);
}

const modifyTransaction = (id: number | string, updatedTransaction: ITransactionModel) => {
    return http.put<ITransactionModel>(`/transactions/${id}`, updatedTransaction);
}

const deleteTransaction = (id: number | string) => {
    return http.delete<ITransactionModel>(`/transactions/${id}`);
}

const getUserTransactions = (id: number | string) => {
    return http.get<ITransactionModel[]>(`/transactions/users/${id}`);
}

const AlpaTabDataService = {
    getAllUsers,
    getUser, 
    addUser, 
    getAllTransactions,
    getTransaction, 
    getUserTransactions, 
    addTransaction, 
    modifyTransaction,
    modifyUser,
    deleteTransaction,
    deleteUser,
};

export default AlpaTabDataService;