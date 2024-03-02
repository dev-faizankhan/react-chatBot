import React, { useState, useContext } from 'react'
import { Container, Form, Card, Button, Spinner } from 'react-bootstrap'
import { useFormik } from 'formik'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom'

import { AuthContext } from "../../context/auth";
import { handleAuthErrors } from '../../helper/authErrors'
import { signupSchema } from './../../schemas'
import { colors } from '../../constants/colors'
import { images } from './../../constants/images'

const Signup = () => {
    const auth = getAuth();

    const [show, setShow] = useState(false);
    const [load, setLoad] = useState(false);

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: signupSchema,
        onSubmit: values => handleSignup()
    })

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik

    const handleSignup = async () => {
        try {
            setLoad(true)


            // signup, add user to firestore, signout, redirect to login
            await createUserWithEmailAndPassword(auth, values.email, values.password)

            const db = getFirestore();
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                name: values.name,
                email: values.email,
                createdAt: new Date()
            });

            // await auth.signOut()

            setLoad(false)
        } catch (error) {
            console.log(error);
            setLoad(false)
            handleAuthErrors(error)
        }
    }

    return (
        <Container
            className="main-auth d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <Card className="mt-5 shadow-lg p-3 mb-5 bg-white rounded" style={{ width: '30rem', margin: 'auto' }}>
                {/* <Card.Img
                    variant="top" src={images.logoNew}
                    style={{ width: '20rem', margin: 'auto' }}
                /> */}
                <Card.Body>
                    <Card.Title className="mb-4 text-center fw-bold">Sign Up</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={touched.name && errors.name ? "border-danger" : null}
                            />
                            {touched.name && errors.name ? (
                                <Form.Text className="text-danger">
                                    {errors.name}
                                </Form.Text>) : null}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={touched.email && errors.email ? "border-danger" : null}
                            />
                            {touched.email && errors.email ? (
                                <Form.Text className="text-danger">
                                    {errors.email}
                                </Form.Text>) : null}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type={show ? "text" : "password"}
                                    placeholder="Password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.password && errors.password ? "border-danger" : null}
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => setShow(prev => !prev)}
                                >
                                    {show ? (
                                        <MdVisibilityOff style={{ color: colors.primary }} />
                                    ) : (
                                        <MdVisibility style={{ color: colors.primary }} />
                                    )}
                                </button>
                            </div>
                            {touched.password && errors.password ? (
                                <Form.Text className="text-danger">
                                    {errors.password}
                                </Form.Text>) : null}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type={show ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.confirmPassword && errors.confirmPassword ? "border-danger" : null}
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => setShow(prev => !prev)}
                                >
                                    {show ? (
                                        <MdVisibilityOff style={{ color: colors.primary }} />
                                    ) : (
                                        <MdVisibility style={{ color: colors.primary }} />
                                    )}
                                </button>
                            </div>
                            {touched.confirmPassword && errors.confirmPassword ? (
                                <Form.Text className="text-danger">
                                    {errors.confirmPassword}
                                </Form.Text>) : null}
                        </Form.Group>

                        <div className="d-grid gap-2 col-6 mx-auto">
                            <Button variant="primary" type="submit" disabled={load}>
                                {load ? <Spinner animation="border" role="status" size="sm" /> : "Signup"}
                            </Button>
                        </div>
                    </Form>

                    <div className="text-center mt-3">
                        {/* already have an account */}
                        <p>Aready have an account? <Link to="/login">Login</Link></p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Signup