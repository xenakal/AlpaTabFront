import "./topbar.scss";
import logo from "../../res/images/logo.svg";
import LoginButton from "../authbuttons/LoginButton";
import LogoutButton from "../authbuttons/LogoutButton";
import SignupButton from "../authbuttons/SignUpButton";
import { useAuth0 } from '@auth0/auth0-react';


const componentsBasedOnAuth = (isAuthenticated: boolean) => {
  let loginControl;
  let navbarElems;
  
  if (!isAuthenticated) {
      loginControl = <><SignupButton/><LoginButton/></>;
      
      navbarElems = (
          <>
            {/* <li className="nav-item">
              <a className="nav-link" href="/">Dashboard</a>
            </li> */}
          </>
      );
  }
  else { // refactor all this at some point 
      loginControl = (
        <LogoutButton />
      );
      
      navbarElems = (
        <>
          {/* <li className="nav-item">
            <a className="nav-link" href="/">Dashboard</a>
          </li> */}
          {/* <li class="nav-item">
            <a class="nav-link" href="/mybalance">My balance</a>
          </li> */}
          <li className="nav-item">
            <a className="nav-link" href="/users">Users</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/transactions">Transactions</a>
          </li>
        </>
      );
  }
  return {loginControl, navbarElems}
}

export default function Topbar() {
  const { isAuthenticated } = useAuth0();
  let {loginControl, navbarElems} = componentsBasedOnAuth(isAuthenticated);

  return (
    <div className='topbar'>
        <nav className="navbar navbar-expand-lg py-3 justify-content-between">
          <a className="navbar-brand" href="/">
            <img src={logo} width="80" height="80" alt=""/>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav">
              {navbarElems}
            </ul>
            <div className="right-side-container">
              {/* <span class="navbar-text form-inline">Welcome!</span> */}
              <div className="loginWrapper">
              {loginControl}
              </div>
            </div>
          </div>
        </nav>
    </div>
  )
}
