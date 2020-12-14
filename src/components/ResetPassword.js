import { useState, useEffect } from 'react'
import { apiBaseUrl } from '../BackendUrl'
import { useAppContext } from '../Context'
import { Form } from "react-bootstrap"
import axios from 'axios'
import { Alert, Button } from 'reactstrap'

function ResetPassword(props) {
    const appContext = useAppContext();

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [missMatch, setmissMatch] = useState(false)
    const [successReset, setSuccess] = useState(false)
    const [failedReset, setFailure] = useState(false)

    const verifyMatching = () => {
        return (newPassword === confirmPassword)
    }

    useEffect(() => {
        if (newPassword.length <= 5 || (/\s/.test(newPassword))) {
            document.querySelector('#newPassword')
                .setCustomValidity('Password must be longer than 5 characters. Without empty spaces!')
        } else {
            document.querySelector('#newPassword').setCustomValidity('')
        }
        if (confirmPassword.length <= 5 || (/\s/.test(confirmPassword))) {
            document.querySelector('#confirmPassword')
                .setCustomValidity('Password must be longer than 5 characters. Without empty spaces!')
        } else {
            document.querySelector('#confirmPassword').setCustomValidity('')
        }
    }, [newPassword, confirmPassword])

    const handleSubmit = event => {
        event.preventDefault()
        if (verifyMatching() === true) {
            setmissMatch(false)

            let header = {
                headers: {
                    'Authorization': 'Token ' + appContext.token
                }
            }
            let payload = {
                password: newPassword
            }

            axios.post(apiBaseUrl + `api/v1/users/${appContext.user_id}/reset/`, payload, header)
                .then(resp => {
                    if (resp.status === 204) {
                        setNewPassword('')
                        setConfirmPassword('')
                        setSuccess(true)
                        setFailure(false)
                    }
                })
                .catch(error => {
                    setFailure(true)
                    setSuccess(false)
                })
        } else {
            setmissMatch(true)
        }
    }

    return (
        <div className="container padding-bottom-3x mb-2 mt-5" style={{ maxWidth: '700px' }}>
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-8">
                    {!successReset ?
                        <form className="card mt-4" onSubmit={handleSubmit}>
                            <div className="card-body">
                                <h1>Reset Password</h1>
                                <div className="form-group">
                                    <label htmlFor="username" style={{ fontSize: '1.0rem' }}>New Password</label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        autoFocus={true}
                                        id='newPassword'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" style={{ fontSize: '1.0rem' }}>Confirm Password</label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        id='confirmPassword'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button className="btn btn-warning" type="submit" style={{ width: '100%', marginTop: '10px' }}>Reset Password</button>
                            </div>
                            {missMatch ?
                                <Form.Label style={{
                                    marginLeft: '100px',
                                    color: 'red',
                                    fontSize: '1.0rem',
                                    width: '500px'
                                }}>
                                    Passwords do not match!
                            </Form.Label>
                                : null
                            }
                        </form>
                        :
                        <>
                            <Alert className="alert alert-success" role="alert" style={{ marginTop: '200px', fontSize: '1.3rem' }}>
                                Password successfully updated!
                        </Alert>
                            <Button
                                className='btn btn-warning'
                                style={{ width: '100%' }}
                                onClick={appContext.logOut}
                            >
                                Log Out
                        </Button>
                        </>
                    }
                    {failedReset ?
                        <Alert className="alert alert-danger" role="alert" style={{ marginTop: '200px', fontSize: '1.3rem' }}>
                            Password update failed!
                    </Alert> : null
                    }
                </div>
            </div>
        </div>
    );
}

export default ResetPassword