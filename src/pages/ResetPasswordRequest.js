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
    console.log('Redirect: ', this.state.to)
    return (
      <>
        <Redirect to={this.state.to}></Redirect>

        <div className='container-fluid'>
          <form action="" className='mt-4'>
            <div className="form-group">
              <input type="email" className="form-control" value={this.state.email} onChange={this.onEmailChange}
                id="email-input" aria-describedby="emailHelp" placeholder="Email" />
            </div>

            <button type="button" className="btn btn-primary btn-block"
              onClick={this.requestReset} /* disabled={!this.state.email} */>Recover Password</button>
          </form>
          <div className='mt-3'>
              <p className='my-0'>New to AT-Pro? <a href='/register' className='font-weight-italic offset-sm-6 offset-lg-8 text-primary text-decoration-none'>signup</a></p>
              <p className='my-0'>Remember your password? <a href='/login' className='font-weight-italic offset-sm-6 offset-lg-8 text-primary text-decoration-none'>signin</a></p>
          </div>
        </div>
      </>
    )
  }
}