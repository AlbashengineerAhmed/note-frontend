import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

function Login({getUserData,userProfile}) {
let navigate = useNavigate();
const [isLoading, setIsLoading] = useState(false);

const initialValues = {
    email: '',
    password: '',
};

const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'In-valid password'),
});

const onSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
        // console.log(values);
    const { data } = await axios.post(`https://note-92mk.onrender.com/auth/login`, values);
    console.log(data);
    if (data.message === 'Done') {
        toast.success('Login successful');
        localStorage.setItem('token', data.token)
        getUserData();
        userProfile();
        goToHome();
    } else if (data.message === 'validation error') {
        toast.error('Validation error. Please check your input.');
    }else if (data.message === 'In-valid Password') {
        toast.error('In-valid Password. Please enter your correct password.');
    }else if (data.message === 'In-valid Email') {
        toast.error('In-valid Email. Please use a different email already exists.');
    }
    } catch (error) {
        toast.error('An error occurred. Please try again.');
        console.error(error);
    } finally {
        setIsLoading(false);
        setSubmitting(false);
    }
}

function goToHome() {
    let path = '/home';
    navigate(path);
}

return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
    <div className="col-md-8 col-11 m-auto text-center">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
            <div className="form-group">
            <Field type="email" name="email" placeholder="Enter email" className="form-control p-3" />
            <ErrorMessage name="email" component="div" className="correct-div text-danger" />
            </div>
            <div className="form-group my-3">
            <Field type="password" name="password" placeholder="Enter your password" className="form-control p-3" />
            <ErrorMessage name="password" component="div" className="correct-div text-danger" />
            </div>
            <button type="submit" className="btn btn-warning w-100 p-3" disabled={isLoading}>
                {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Login'}
            </button>
        </Form>
        </Formik>
    </div>
    </div>
);
}

export default Login;
