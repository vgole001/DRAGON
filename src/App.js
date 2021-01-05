import React from 'react'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Routes from './Routes'
import { AppContext } from './Context'
import vermantia_logo from './assets/imgs/vermantia_white.png';
import { apiBaseUrl } from './BackendUrl'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import Settings from './components/DropDown'
import ShowTime from './components/Time'
import './styles/App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      isAuthenticated: false,
      isAuthenticating: false,
      token: localStorage.getItem('token') || '',
      intervalId: localStorage.getItem('intervalId') || '',
      user_id: localStorage.getItem('user_id') || ''
    }
  }

  // setRefreshedToken = (token) => {
  //   this.setState({
  //     token: token
  //   })
  //   localStorage.setItem('token', token)
  // }

  refreshToken = () => {
    let payload = {
      token: this.state.token
    }

    axios.post(apiBaseUrl + 'api/token/refresh/', payload)
      .then(resp => {
        if (resp.status === 200) {
          console.log('App.js | Refresh Token Succeed!')
          // Refresh old token
          this.setState({
            token: resp.data.token
          })
          localStorage.setItem('token', this.state.token)
        }
      })
      .catch(error => {
        console.log('App.js | Refresh Token Failed!', error)
      })
  }

  setTokenInterval = () => {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId)
    }
    // Set interval takes as input a function and a timer and calls
    // that function each time the timer elapses and returns a
    // timeout for use with clearInterval
    const intervalId = setInterval(this.refreshToken, process.env.REACT_APP_JWT_EXPIRE_TIME)
    this.setState({
      intervalId: intervalId
    })
    localStorage.setItem('intervalId', intervalId)
  }

  reloadLocation = () => {
    window.location.reload()
  }

  userHasAuthenticated = (isAuthenticated, token, username, user_id) => {
    this.setState({
      isAuthenticated: isAuthenticated,
      token: token,
      username: username,
      user_id: user_id
    })
    if (isAuthenticated) {
      this.setTokenInterval();
    }
    else {
      clearInterval(this.state.intervalId)
      this.setState({
        intervalId: ''
      });
    }
  }

  setIsAuthenticating = (cond) => {
    this.setState(state => ({
      isAuthenticating: cond
    }))
  }

  handleLogout = () => {
    this.userHasAuthenticated(false, '', '', '')
    localStorage.clear()
    this.props.history.push('./login')
  }

  resetPassword = () => {
    this.props.history.push('./reset-password')
  }

  componentDidMount() {
    const payload = { token: this.state.token }
    axios.post(apiBaseUrl + 'api/token/verify/', payload)
      .then(resp => {
        if (resp.status === 200) {
          console.log('App.js | Token Verified Successfully!')
          //const {data} = resp
          //this.setRefreshedToken(data.token)
          this.setTokenInterval()
        }
      })
      .catch(error => {
        console.log('App.js | Token Verification Failed', error)
      })
    this.setIsAuthenticating(false)
    if(localStorage.getItem('username')){
     this.setState({isAuthenticated: true})
    }    
  }


  resetFocus = () => {
    let element =  document.querySelector('#username');
    if(element){
      element.focus()
    }
  }
  render() {
    {console.log('I am in love with the coco.')}
    const appContext = {
      isAuth: this.state.isAuthenticated,
      token: this.state.token,
      user_id: this.state.user_id,
      auth: this.userHasAuthenticated,
      logOut: this.handleLogout
    }
    return (
      // First time we load our app it will start by checking the current auth state
      !this.state.isAuthenticating && (
        <div >
          <Navbar bg="warning" style={{height:'60px',width:'100%'}}>
            <Navbar.Brand>
              <Link to={!this.state.isAuthenticated ? '/login' : '/home'}>
                <img className='companyLogo'
                  src={vermantia_logo}
                  alt="Vermantia"
                  onClick={this.resetFocus}
                  style={{width:'80%'}}
                />
              </Link>
            </Navbar.Brand>
          
            <Navbar.Collapse className="justify-content-end" style={{marginTop:'-9px', marginRight:'10px'}}>
              <Nav activeKey={window.location.pathname}>
                {this.state.isAuthenticated
                  ?
                  (
                    <>
                      <Navbar.Brand style={{marginRight:'80px', paddingTop:'20px'}}>
                        <div className='schedule'>
                          <h3 style={{fontSize:'1.0rem', marginLeft:'10px'}}><strong>Schedule</strong></h3>
                          <ShowTime/>
                          <p style={{fontSize:'0.8rem'}}>{this.state.date.toDateString()}</p>
                        </div>
                      </Navbar.Brand>  
                      <Settings
                        resetPassword={this.resetPassword}
                        handleLogout={this.handleLogout}
                      />
                    </>

                  ) : (
                    <>
                      {/* Uncomment the section below to get an extra log in button up in header */}
                      {/* <LinkContainer to="/login">
                          <Nav.Link  className='button'>
                            <button type="button" className="btn btn-primary">Login</button>
                          </Nav.Link>
                      </LinkContainer> */}
                    </>
                  )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <AppContext.Provider value={appContext}>
            <Routes />
          </AppContext.Provider>
        </div>
      )
    )
  }
}

export default withRouter(App);
