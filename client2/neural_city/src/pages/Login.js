// src/components/LoginForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { toast } from 'react-toastify';
import api from '../lib/axiosClient';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        console.log(values);
        const response = await api.post('/login', values);
        console.log(response);
        const data = response.data;
        if (response) {
          if (response.status === 200) {
            if (signIn({
              auth: {
                token: data.access_token,
                type: 'Bearer',
              },
              userState: { email: values.email },
            })) {
              toast.success('Login successful!');
              navigate('/'); // Redirect to protected route
            } else {
              toast.error('There is Something Wrong While Loging in!');
            }
          } else {
            setErrors({ submit: data.message || 'An error occurred' });
            toast.error(data.message || 'An error occurred');
          }
        }
      } catch (error) {
        setErrors({ submit: 'An error occurred' });
        toast.error('An error occurred');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className='min-h-[90vh] w-full flex items-center justify-center'>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-6 w-[40%] mx-auto bg-white rounded-md shadow-md">
        <div className='w-full flex flex-col space-y-2 items-center justify-center'>
          <div>
            <img src="/logo.png" className='w-[50px] h-[50px]' />
          </div>
          <div className='text-light text-lg'>
            Login to use our services
          </div>
        </div>
        <div>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            variant="outlined"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        {formik.errors.submit && (
          <div className="text-red-500 text-sm">{formik.errors.submit}</div>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
