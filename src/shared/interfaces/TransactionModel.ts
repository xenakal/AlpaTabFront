export default interface ITransactionModel {
    id: number,
    nickName: string, 
    amount: number, 
    timestamp: Date, 
    transactionType: string, 
    description?: string,
}