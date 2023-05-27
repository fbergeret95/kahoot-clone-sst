import React from 'react'
import { css } from 'glamor'
import { Auth } from 'aws-amplify'
import UserContext from './UserContext'
import { navigate } from "gatsby";

class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
    showConfirmation: false,
    user: {},
    authCode: ''
  }
  static contextType = UserContext
  onChange = (key, value) => {
    this.props.updateErrorMessage(null)
    this.setState({
      [key]: value
    })
  }
  signIn = () => {
    const { history } = this.props
    const { updateCurrentUser } = this.context
    Auth.signIn(this.state.username, this.state.password)
      .then(user => {
        if (!user.signInUserSession) {
          this.setState({ user, showConfirmation: true })
        } else {
          navigate("/questions_page")
        }
      })
      .catch(err => {
        console.log('error signing in...: ', err)
        this.props.updateErrorMessage(err.message)
      })
  }
  confirmSignIn = () => {
    const { history } = this.props
    Auth.confirmSignIn(this.state.user, this.state.authCode, this.state.user.challengeName)
      .then(user => {
        navigate("/questions_page")
      })
      .catch(err => console.log('error confirming signing in...: ', err))
  }
  render() {
    return (
      <div {...css(styles.container)}>
        {
          !this.state.showConfirmation && (
            <div {...css(styles.formContainer)}>
              <h2 {...css(styles.signInHeader)}>Iniciar Sesión</h2>
              <input
                onChange={evt => this.onChange('username', evt.target.value)}
                {...css(styles.input)}
                placeholder='usuario'

              />
              <input
                type='password'
                onChange={evt => this.onChange('password', evt.target.value)}
                {...css(styles.input)}
                placeholder='contraseña'
              />
              <div {...css(styles.button)} onClick={this.signIn}>
                <p {...css(styles.buttonText)}>Entrar</p>
              </div>
            </div>
          )
        }
        {
          this.state.showConfirmation && (
            <div {...css(styles.formContainer)}>
              <input
                onChange={evt => this.onChange('authCode', evt.target.value)}
                {...css(styles.input)}
                placeholder='Confirmation Code'
              />
              <div {...css(styles.button)} onClick={this.confirmSignIn.bind(this)}>
                <p {...css(styles.buttonText)}>Confirmar</p>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

const styles = {
  signInHeader: {
    textAlign: 'left',
    margin: '0px 0px 20px'
  },
  button: {
    padding: '10px 60px',
    backgroundColor: '#bd3430',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: '30px',
    ':hover': {
      backgroundColor: '#c34844'
    }
  },
  buttonText: {
    margin: 0,
    color: 'white'
  },
  input: {
    height: 40,
    marginBottom: '10px',
    border: 'none',
    outline: 'none',
    borderBottom: '2px solid #bd3430',
    fontSize: '16px',
    '::placeholder': {
      color: 'rgba(0, 0, 0, .3)'
    }
  },
  container: {
    flex: 1,
    paddingTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  formContainer: {
    padding: 20,
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 20,
    borderStyle: 'solid',
    borderColor: '#4c4c4c'
  }
}

export default SignIn