import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";



function NewsLetter() {
    const [err, setError] = useState('');
    const [submited, setSubmitted] = useState(false);


    return <Formik
        initialValues={{
            email: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                setSubmitting(false);
            }, 500);
        }}

        validationSchema={Yup.object().shape({
            email: Yup.string()
                .email()
                .required("Email field is required")
        })}
    >

        {props => {
            let {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
            } = props;


           handleSubmit = async e => {
                e.preventDefault()
                setSubmitted(true)      
            }

            if (submited) {
                return <Redirect push to={{
                    pathname: '/sent'
                }} />
            }
        
            return (
                <div className="container login-page">
                    <section className="row mt-5 test-center">
                        <div className="col-md-6 m-auto">

                            <h3 style={{textAlign: "center", color: "red", fontSize: "0.8rem", 
                            fontFamily: "sans-serif", marginBottom: "40px"}}>
                            {err}
                            </h3>

                            <h1><i className="fas fa-newspaper" id="news-letter-icons"></i></h1>
                            <h1 id="newsletter-heading">Newsletter Signup</h1>
                            <p className="lead" id="news-letter-text">
                            Get our awesome monthly newsletter
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur} 
                                        id="input-field" 
                                        className={errors.email && touched.email && "error"}
                                        placeholder="Enter Email" 
                                        required
                                    />
                                    {errors.email && touched.email && (
                                        <div className="input-feedback">{errors.email}</div>
                                    )}
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-block"
                                    disabled={isSubmitting}
                                >
                                    Sign Up
                                </button>
                            </form>
                        </div>
                    </section>
                </div>

            )
            
        }}
    </Formik>
}


export default NewsLetter
