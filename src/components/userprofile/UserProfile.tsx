import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import "./userProfile.scss";
import { ProfileEntryInput } from "../profileentryinput/ProfileEntryInput";
import AlpaTabDataService from "../../services/AlpaTabDataService";


type UserProfileProps = {
    userId: number,
    editable: boolean,
}
const UserProfile: React.FC<UserProfileProps> = ({ userId=-1, editable=false }: UserProfileProps) => {
    
    const { isAuthenticated } = useAuth0();
    const defaultUser = { id:-1, firstName: '', lastName:'', nickName:'', userType:'', email:'' };
    const [user, setUser] = useState(defaultUser);

    useEffect(() => {
      fetchUser();
    }, []);

    const fetchUser = async () => {
        if (isAuthenticated && userId !== -1) {
            AlpaTabDataService.getUser(userId)
                .then((res: any) => {
                    setUser(res.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    }; 
            
    return (
        <div className="profileContainer">
            <div className="imgWrapper"><img className="profpic" src={"https://robohash.org/" + user.id + "?set=set" + Math.ceil(Math.random()*2)} alt="profilePic" ></img></div>
            <div className="row mt-2">
                <div className="col-md-6"><label className="labels">First Name</label><ProfileEntryInput  editable={editable} defaultval={user.firstName}/></div>
                <div className="col-md-6"><label className="labels">Last Name</label><ProfileEntryInput editable={editable} defaultval={user.lastName}/></div>
            </div>
            <div className="row mt-2">
                <div className="col-md-6"><label className="labels">NickName</label><ProfileEntryInput editable={editable} defaultval={user.nickName}/></div>
                <div className="col-md-6"><label className="labels">User Type</label><ProfileEntryInput editable={editable} defaultval={user.userType}/></div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12"><label className="labels">Email</label><ProfileEntryInput editable={editable} defaultval={user.email}/></div>
            </div>
        </div>
    );
}

export default UserProfile;