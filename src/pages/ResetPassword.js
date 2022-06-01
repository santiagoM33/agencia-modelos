import React from 'react';
import { resetPassword } from '../services/connect';
import toast, { Toaster } from 'react-hot-toast';
import { Redirect as RouterRedirect } from 'react-router-dom';
 
function Redirect({ to }) {
  if (to) {
    return (
      <RouterRedirect to={to} />
    )
  } else {
    return null;
  }
}
 
export default class ResetPassword extends React.Component {
    state = {
      email: '',
      to: null,
      code: Number(this.props.location.search.slice(6).split('&')[0])
    }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  reset = () => {
    resetPassword(this.state.email, this.state.password, this.state.code).then(resp => {
      toast.success('The password has been changed');
      this.setState({ to: '/login' });
    }, err => {
      toast.error(this.handleError(err));
    });
  }

  handleError = err => {
    return 'There was a problem resetting the password';
  }

  render() {
    return (
      <div className='container'>
        <Redirect to={this.state.to}></Redirect>

        <div className='offset-md-2 col-md-8 my-3 mt-sm-5 p-2'>
          <form action="" className=' mt-4'>
            <div className="form-group">
              <input type="email" className="form-control" id="reset-email" onChange={this.onInputChange}
                aria-describedby="emailHelp" placeholder="Email" name="email" value={this.state.email} />
            </div>

            <div className="form-group">
              <input type="password" className="form-control" id="reset-password" onChange={this.onInputChange}
                placeholder="New Password" name="password" />
            </div>

            <div className="form-group">
              <input type="number" className="form-control" id="reset-code" onChange={this.onInputChange}
                placeholder="Reset Code" name="code" value={this.state.code}/>
            </div>

            <button type="button" className="btn btn-primary btn-block"
              onClick={this.reset}>Reset Password</button>
              <Toaster />
          </form>
          <div className='mt-3'>
              <p className='my-0'>New to AT-Pro? <a href='/register' className='font-weight-italic text-primary text-decoration-none'>signup</a></p>
              <p className='my-0'>Remember your password? <a href='/login' className='font-weight-italic text-primary text-decoration-none'>signin</a></p>
          </div>
        </div>
      </div>
    )
  }
}
