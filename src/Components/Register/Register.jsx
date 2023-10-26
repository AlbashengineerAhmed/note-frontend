import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

function Register() {
const Navigate = useNavigate();
const [isLoading, setIsLoading] = useState(false);

const initialValues = {
    userName: '',
    email: '',
    password: '',
    cPassword: '', 
};

const validationSchema = Yup.object({
    userName: Yup.string().required().min(3).max(20),
    email: Yup.string().required().email(),
    password: Yup.string().required().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password must contain at least 1 lowercase letter, 1 uppercase letter, and be at least 8 characters long.'),
    cPassword: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const onSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
    const { data } = await axios.post(`https://note-92mk.onrender.com/auth/signup`, values);
    console.log(data);
    if (data.message === 'Done') {
        toast.success('Registration successful');
        goToLogin();
    } else if (data.message === 'Email exist') {
        toast.error('Email already exists. Please use a different email.');
    }else if (data.message === 'validation error') {
        toast.error('Validation error. Please check your input.');
    }
    } catch (error) {
        toast.error('An error occurred. Please try again.');
        console.error(error);
    } finally {
        setIsLoading(false);
        setSubmitting(false);
    }
}

function goToLogin() {
    let path = '/login';
    Navigate(path);
}

return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
    <div className="col-md-8 col-11 m-auto text-center">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
            <div className="form-group">
            <Field type="text" name="userName" placeholder="Enter your name" className="form-control p-3" />
            <ErrorMessage name="userName" component="div" className="correct-div text-danger" />
            </div>
            <div className="form-group my-3">
            <Field type="email" name="email" placeholder="Enter email" className="form-control p-3" />
            <ErrorMessage name="email" component="div" className="correct-div text-danger" />
            </div>
            <div className="form-group my-3">
            <Field type="password" name="password" placeholder="Enter your password" className="form-control p-3" />
            <ErrorMessage name="password" component="div" className="correct-password text-danger" />
            </div>
            <div className="form-group my-3">
            <Field type="password" name="cPassword" placeholder="Confirm your password" className="form-control p-3" />
            <ErrorMessage name="cPassword" component="div" className="correct-div text-danger" />
            </div>
            <button type="submit" className="btn btn-warning w-100 p-3" disabled={isLoading}>
                {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'SignUp'}
            </button>
            <div className="d-flex justify-content-center mt-2">
            <p className="fs-5 me-5 text-warning">You already have an account?</p>
            <Link className="mt-1 text-white" to="/login">
                Login here.
            </Link>
            </div>
        </Form>
        </Formik>
    </div>
    </div>
);
}

export default Register;
