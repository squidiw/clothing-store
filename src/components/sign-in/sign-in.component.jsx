import React from "react";
import "./sign-in.styles.scss";

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  submitHandler = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try{
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch(error) {
      console.log(error)
    }
  };

  changeHandler = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2> I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.submitHandler}>
          <FormInput
            type="text"
            name="email"
            label='email'
            handleChange={this.changeHandler}
            value={this.state.email}
            required
          />
          

          <FormInput
            type="password"
            name="password"
            label='password'
            value={this.state.password}
            handleChange={this.changeHandler}
            required
          />
          
          <div className='buttons'>
          <CustomButton type="submit" value=" Submit Form "> Sign In  </CustomButton> 
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              { ''}
               Sign In With Google  </CustomButton> 
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;