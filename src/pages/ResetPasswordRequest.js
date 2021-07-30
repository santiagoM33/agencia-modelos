import React from 'react';
import { resetPasswordRequest } from '../services/connect';
import { Redirect as RouterRedirect } from 'react-router-dom';
import toast from 'react-hot-toast';
 
function Redirect({ to }) {
  if (to) {
    return (
      <RouterRedirect to={to} />
    )
  } else {
    return null;
  }
}


export default class ResetPasswordRequest extends React.Component {
    state = {
      email: '',
      to: null
    }

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  }

  requestReset = () => {
    resetPasswordRequest(this.state.email).then(resp => {
      toast.success('Password reset request sent');
      this.setState({ to: '/reset-password' });
    }, err => {
        toast.error(this.handleError(err));
    });
  }

  handleError = err => {
    return 'There was a problem requesting the password reset'
  }

  render() {
    return (
      <>
        <Redirect to={this.state.to}></Redirect>

        <div className='container-fluid'>
          <hr className="mb-4" />

          <h3
            className='text-center mb-4 h4'
          >Reset your password</h3>

          <form action="">
            <div className="form-group">
              <label htmlFor="email-input">Email address</label>
              <input type="email" className="form-control" value={this.state.email} onChange={this.onEmailChange}
                id="email-input" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>

            <button type="button" className="btn btn-primary btn-block text-uppercase"
              onClick={this.requestReset} /* disabled={!this.state.email} */>Reset Password</button>
          </form>

        </div>
      </>
    )
  }
}