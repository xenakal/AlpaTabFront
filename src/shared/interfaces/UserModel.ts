import UserType from './UserType';

export default interface IUserModel {
    id: number,
    nickName: string, 
    email: string, 
    firstName?: string, 
    lastName?: string, 
    userType: string,  // TODO: USERTYPE
    balance: number,
}