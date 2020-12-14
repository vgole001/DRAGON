import {useState, useEffect, useRef} from 'react'
import {apiBaseUrl} from '../BackendUrl'
import {useAppContext} from '../Context'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import LoaderButton from './LoaderButton'
import '../styles/Login.css';

function Login(props){

  // we call useAppContext because it's a hook and hooks cannot be called outside classes
  const appContext = useAppContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef()
  const history = useHistory()

  // Load usernmae in case user did not logout 
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username !== null){
      setUsername(username)
    }
  },[])

  const handleSubmit = event => {
    event.preventDefault()
    setIsLoading(true)
      //if(username && password){
        let payload = {
          username: username,
          password: password
        }
      
      console.log('API URL is',apiBaseUrl)
      axios.post(apiBaseUrl + 'api/token/', payload)
        .then(resp => {
          if(resp.status === 200){
            // call auth function from context provider
            appContext.auth(true, resp.data.token, username, resp.data.pk)

            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('username', payload.username);
            localStorage.setItem('user_id', resp.data.pk)                        
            setWarning(false)
            //setIsLoading(false)
            history.push('/home')
          }
        })
        .catch(error => {
          setWarning(true)
          setIsLoading(false)
          console.log('Login.js | axios request error status!',error)
        })
    }

  useEffect(() => {
    return () => {
      setIsLoading(false);
    }
  }, [])
    
  useEffect(()=>{      
    if (appContext.isAuth === true){
      console.log('User has auth')
      if (window.location.reload) {
            console.info( "This page is reloaded" );
          } else {
            console.info( "This page is not reloaded");
          }
    }
  })
  
  useEffect(() => {
    if (password.length === 0){
      document.querySelector('#password')
        .setCustomValidity('Please fill out this field.')
    }
    // Check if password length is less than 6 characters or it has empty spaces.
    else if(password.length <= 5 || (/\s/.test(password))){
      document.querySelector('#password')
        .setCustomValidity('Password must be longer than 6 characters. Without empty spaces!')
    }else{
      document.querySelector('#password').setCustomValidity('')
    }
  }, [password])

  return (
    <> 
      <div className='Login'>
      <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              ref = {inputRef}
              type = 'text' 
              className="form-control" 
              id="username" 
              aria-describedby="usernameHelp"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password" 
              className="form-control" 
              id="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* <Link to='/reset-password' className='resetPass'>
            reset password?
          </Link> */}
          <Link to='/forgot-password' className='forgotPass'>
            forgot your password?
          </Link>
          <LoaderButton
            block
            size="lg"
            type="submit" 
            isLoading={isLoading}
            className="btn btn-warning"
           >
            Login
          </LoaderButton>
          <h5 
            className = {warning ? 'dangerZone' : 'safeZone'}
            style = {{fontSize: '1.0rem', width:'500px'}}
          >
            Username or Password is incorrect!
          </h5>
      </form>
    </div>
    </>
  );
}

export default Login