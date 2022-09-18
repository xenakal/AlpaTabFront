import "./topbar.scss"
import logo from "../../res/images/logo.png"

export default function Topbar() {
  return (
    <div className='topbar'>
        <nav class="navbar navbar-expand-lg navbar-light bg-light py-3 justify-content-between">
          <a class="navbar-brand" href="/">
            <img src={logo} width="50" height="50" alt=""/>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/">Dashboard</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/myprofile">My profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/mybalance">My balance</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/users">Users</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/transactions">Transactions</a>
              </li>
            </ul>
            <div class="right-side-container">
              <span class="navbar-text form-inline">Welcome!</span>
            </div>
          </div>
        </nav>
    </div>
  )
}
