import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Form, Button, Panel, IconButton, Stack, Divider } from 'rsuite';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FacebookIcon from '@rsuite/icons/legacy/Facebook';
import GoogleIcon from '@rsuite/icons/legacy/Google';
import Brand from '@/components/Brand';
import { AuthContext } from '@/context/AuthProvider';

interface SignIn {
  email: '';
  password: '';
}

const SignUp = () => {
  const [formValue, setFormValue] = useState<SignIn | any>({
    username: '',
    password: ''
  });
  const { saveAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const onSubmit = async () => {
    console.log('submitted!');
    try {
      const response = await axios.post('/users/login', formValue);
      if (response.status === 200) {
        saveAuth(response.data);
        navigate(from, { replace: true });
      } 
    } catch (e) {
      alert("Не правильно ИД иил пароль");
      console.log('Login error!');
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{
        height: '100vh'
      }}
    >
      <Brand style={{ marginBottom: 10 }} />

      <Panel bordered style={{ background: '#fff', width: 400 }} header={<h3>Войти</h3>}>
        <p style={{ marginBottom: 10 }}>
          <span className="text-muted">Новенький тут? </span>{' '}
          <Link to="/sign-up"> Завести аккаунт</Link>
        </p>
        <Form fluid formValue={formValue} onChange={setFormValue}>
          <Form.Group>
            <Form.ControlLabel>Имя пользователя или адрес электронной почты</Form.ControlLabel>
            <Form.Control name="username" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>
              <span>Password</span>
              <a style={{ float: 'right' }}>Забыл пароль?</a>
            </Form.ControlLabel>
            <Form.Control name="password" type="password" />
          </Form.Group>

          <Form.Group>
            <Stack spacing={6} divider={<Divider vertical />}>
              <Button appearance="primary" onClick={onSubmit}>
                Войти
              </Button>
              <Stack spacing={6}>
                <IconButton icon={<FacebookIcon />} appearance="subtle" />
                <IconButton icon={<GoogleIcon />} appearance="subtle" />
              </Stack>
            </Stack>
          </Form.Group>
        </Form>
      </Panel>
    </Stack>
  );
};

export default SignUp;
