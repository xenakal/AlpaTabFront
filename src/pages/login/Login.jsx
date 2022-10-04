// import ProfileEntryInput from "../../components/profileentryinput/ProfileEntryInput"
// import AuthContext from "../../context/AuthProvider";
// import Button from '@mui/material/Button';
// import "./login.scss"
// import { useEffect, useContext, useState } from 'react';
// import axios from "../../api/axios"
// import { SettingsInputSvideoRounded, SettingsPowerRounded, SettingsSuggestRounded } from "@mui/icons-material";

// const LOGIN_URL = '/auth';



// const Login = () => {
//     const { setAuth } = useContext(AuthContext);
//     const [user, setUser] = useState('');
//     const [pwd, setPwd] = useState('');
//     const [errMsg, setErrMsg] = useState('');
//     const [success, setSuccess] = useState('');

//     useEffect(() => {
//         setErrMsg('');
//     }, [user, pwd]);

//     // async function tryLogin(nav) {
//     //     const id = document.getElementById("id");
//     //     const pass = document.getElementById("pass");

//     //     const isValidUser = await tryAuth(id, pass);
//     //     if (isValidUser) { 
//     //         window.location.replace("/");
//     //     }
//     //     else {
//     //         const errorComponent = document.getElementById("error");
//     //         errorComponent.style.opacity = 1;
//     //         id.value = "";
//     //         pass.value = "";

//     //     }
//     // }

//     const tryLogin = async (e) => {
//         e.preventDefault();
//         setUser('');
//         setPwd('');
//         setSuccess(true);
//     }

//     const onUserFieldChange = (value) => {
//         setUser(value);
//         console.log("Userr!");
//     }

//     const onPwdFieldChange = (value) => {
//         setPwd(value);
//     }

//     async function tryAuth() {
//         // try {
//         //     const response = await axios.post(LOGIN_URL, JSON.stringify({user, pwd}))
//         // }
//         return true;
//     }
    
//     return (
//         <form className="profileContainer" onSubmit={tryLogin}>
//             <div className="imgWrapper"><img className="profpic" src={"https://robohash.org/100000223" + "?set=set" + Math.ceil(Math.random()*2)} alt="profilePic" ></img></div>
//             <div class="row mt-2 justify-content-center">
//                 <div class="col-md-6"><label class="labels">Nickname or Email</label><ProfileEntryInput onChange={onUserFieldChange} id={"id"} editable={true} /></div>
//             </div>
//             <div class="row mt-2 justify-content-center">
//                 <div class="col-md-6"><label class="labels">Password</label><ProfileEntryInput onChange={onPwdFieldChange} type={"password"} id={"pass"} editable={true} /></div>
//             </div>
//             <div id="error" className="error">Invalid credentials...</div>
//             <div className="buttonsWrapper">
//                 <Button variant="outlined">Log in</Button> 
//             </div>
//         </form>
//     )
// }

// export default Login;