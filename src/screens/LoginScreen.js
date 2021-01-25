import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../conponents/Message'
import Loading from '../conponents/Loading'
import FormContainer from '../conponents/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter This Email for Testing: john@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            className="input-color"
            placeholder='Enter This Password for Testing: john12345'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button 
            type='submit' 
            variant='primary'
            disabled={email === '' || password === ''}
        >
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
            <h5 className="login-user-inputs-1">Are you a New Customer? {' '}</h5>
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                <h6 className="login-user-inputs-2">Register</h6>
            </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}


export default LoginScreen
