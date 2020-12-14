import { useState } from 'react'
import axios from 'axios'
import { Alert } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function ForgotPassword(props) {
    const [email, setEmail] = useState('')
    const [emailSent, setEmailSent] = useState(false)
    const [emailFailed, setEmailFailed] = useState(false)
    var history = useHistory()

    const goBack = () => {
        history.goBack()
    }
    const handleSubmit = () => {
        setEmailSent(true)
        console.log('Email is', email)

        axios.post('linkHere')
            .then(resp => {

            })
            .catch(error => {
                //setEmailFailed(true)
            })

    }

    return (
        <div className="container padding-bottom-3x mb-2 mt-5" style={{ maxWidth: '700px' }}>
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-6">
                    {!emailSent ?
                        <form className="card mt-4" onSubmit={handleSubmit}
                        >
                            <div className="card-body">
                                <h2>Forgot Password</h2>
                                <div className="form-group">
                                    <small className="form-text text-muted" style={{ fontSize: '1.0rem' }}>
                                        Forgot your account’s password?
                                        Enter your email address and we’ll send you a recovery link.
                                    </small>
                                    <label htmlFor="email-for-pass" style={{ fontSize: '1.5rem' }}>Email</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        id="email-for-pass"
                                        required
                                        autoFocus
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button
                                        disabled
                                        className="btn btn-warning"
                                        type="submit"
                                        style={{ width: '100%', marginTop: '30px' }}
                                    >
                                        Send recovery email
                                    </button>
                                </div>
                            </div>
                        </form>
                        :
                        <>
                            <Alert className="alert alert-success" role="alert" style={{ marginTop: '200px', fontSize: '1.3rem' }}>
                                Email sent successfully.
                        </Alert>
                            <Button className='btn btn-warning' onClick={goBack}>Go Back</Button>
                        </>
                    }
                    {emailFailed ?
                        <Alert className="alert alert-danger" role="alert" style={{ marginTop: '200px', fontSize: '1.3rem' }}>
                            Email not delivered!
                        </Alert> : null
                    }
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword