import React from 'react'
import { css } from 'glamor'
import { Auth } from 'aws-amplify'
import SignIn from './SignIn_Component'
import SignUp from './SignUp_Component'
import { navigate } from 'gatsby'

// import ForgotPassword from './ForgotPassword'

class Authenticator_Component extends React.Component {
  state = {
    errorMessage: null,
    currentState: 'showSignIn'
  }
  switchState = currentState => {
    this.setState({
      currentState
    })
  }
  updateErrorMessage = errorMessage => {
    this.setState({ errorMessage })
  }


  getUserAuthenticated = () => {
    Auth.currentAuthenticatedUser()
      .then(result => {
        // this.setState({errorMessage: null, currentState: 'showQuestions'})
        console.log('User Signed In', result)
        this.updateErrorMessage('User Signed In')
        navigate("/questions_page")
      })
      .catch(error => {
        console.log('error getting current session...: ', error)
      })
  }

  // getUserAuthenticated()

  componentDidMount() {
    this.getUserAuthenticated()
  }

  render() {

    const { currentState } = this.state

    return (
      <div style={styles.container}>
        {currentState === 'showSignIn' && <SignIn {...this.props} updateErrorMessage={this.updateErrorMessage} />}
        {currentState === 'showSignUp' && <SignUp {...this.props} updateErrorMessage={this.updateErrorMessage} switchState={this.switchState} />}
        {/* { currentState === 'showForgotPassword' && <ForgotPassword switchState={this.switchState} {...this.props} updateErrorMessage={this.updateErrorMessage} /> } */}
        <div {...css(styles.buttonContainer)}>
          {
            currentState === 'showSignIn' ? (
              <div {...css(styles.linkContainer)}>
                <p
                  onClick={() => this.switchState('showSignUp')}
                  {...css(styles.toggle)}
                >Necesitas una cuenta? Crea una aquí</p>
                {/* <p
                  onClick={() => this.switchState('showForgotPassword')}
                  {...css(styles.toggle)}
                >Forgot your password?</p> */}
              </div>
            ) : (
              <div {...css(styles.linkContainer)}>
                <p
                  {...css(styles.toggle)}
                  onClick={() => this.switchState('showSignIn')}
                >Ya tienes una cuenta? Inicia sesión aquí</p>
              </div>
            )
          }
        </div>
        {
          this.state.errorMessage && (
            <div>
              <p>{this.state.errorMessage}</p>
            </div>
          )
        }
      </div>
    )
  }
}

export default Authenticator_Component

const styles = {
  linkContainer: {
    marginTop: 30
  },
  container: {
    marginTop: 50
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  toggle: {
    paddingBottom: '10px',
    cursor: 'pointer',
    marginTop: 10,
    marginBottom: 0,
    // marginBottom: 0,
    borderBottom: '2px solid transparent',
    ':hover': {
      opacity: 0.6
    }
  }
}