import React from 'react'
import { css } from 'glamor'
import { navigate } from 'gatsby'

import { Auth } from 'aws-amplify'

class SignUp_Component extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    // phone_number: '',
    authCode: '',
    showConfirmation: false
  }
  onChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }
  signUp = () => {
    const { username, password, email } = this.state

    Auth.signUp({
      username,
      password,
      attributes: {
        email
      }
    })
      .then(() => this.setState({ showConfirmation: true }))
      .catch(err => {
        console.log('error signing up: ', err)
        this.props.updateErrorMessage(err.message)
      })
  }
  confirmSignUp = () => {
    Auth.confirmSignUp(this.state.username, this.state.authCode)
      .then(() => navigate("/questions_page"))
      .catch(err => console.log('error confirming signing up: ', err))
  }
  render() {
    const { showConfirmation } = this.state
    return (
      <div {...css(styles.container)}>
        {
          !showConfirmation && (
            <div {...css(styles.formContainer)}>
              <h2 {...css(styles.signUpHeader)}>Crea tu cuenta</h2>
              <input
                {...css(styles.input)}
                placeholder='Usuario'
                onChange={evt => this.onChange('username', evt.target.value)}
              />
              <input
                {...css(styles.input)}
                placeholder='Contraseña'
                type='password'
                onChange={evt => this.onChange('password', evt.target.value)}
              />
              <input
                {...css(styles.input)}
                placeholder='Email'
                onChange={evt => this.onChange('email', evt.target.value)}
              />
              <div {...css(styles.button)} onClick={this.signUp}>
                <p {...css(styles.buttonText)}>Crear Cuenta</p>
              </div>
            </div>
          )
        }
        {
          showConfirmation && (
            <div {...css(styles.formContainer)}>
              <input
                onChange={evt => this.onChange('authCode', evt.target.value)}
                {...css(styles.input)}
                placeholder='Código de Confirmación'
              />
              <div {...css(styles.button)} onClick={this.confirmSignUp}>
                <p {...css(styles.buttonText)}>Confirmar Código</p>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

const styles = {
  signUpHeader: {
    textAlign: 'left',
    margin: '0px 0px 20px'
  },
  button: {
    padding: '10px 60px',
    backgroundColor: '#bd3430',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 10,
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
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: '15px',
  },
  formContainer: {
    padding: 20,
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: "0px 0px 2px rgba(0, 0, 0, .2)",
    borderRadius: 20
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
}

export default SignUp_Component