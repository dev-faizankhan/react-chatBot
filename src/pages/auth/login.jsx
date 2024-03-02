import React, { useState, useContext } from 'react'
import { Container, Form, Card, Button, Spinner } from 'react-bootstrap'
import { useFormik } from 'formik'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { Link } from 'react-router-dom'

import { AuthContext } from "../../context/auth";
import { handleAuthErrors } from '../../helper/authErrors'
import { loginSchema } from './../../schemas'
import { colors } from '../../constants/colors'
import { images } from './../../constants/images'

const Login = () => {
    const auth = getAuth();

    const { setCurrentUser } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const [load, setLoad] = useState(false);
    const [remember, setRemember] = useState(false);

    const initialValues = {
        email: "",
        password: ""
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: values => handleLogin()
    })

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik

    const handleLogin = async () => {
        try {
            setLoad(true)
            await signInWithEmailAndPassword(auth, values.email, values.password)

            const db = getFirestore();
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setCurrentUser(docSnap.data())

                if (remember) {
                    localStorage.setItem("user", JSON.stringify(docSnap.data()))
                } else {
                    sessionStorage.setItem("user", JSON.stringify(docSnap.data()))
                }
            } else {
                console.log("No such document!");
            }
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
                    <Card.Title className="mb-4 text-center fw-bold">Log In</Card.Title>
                    <Form onSubmit={handleSubmit}>
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

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="Remember me"
                                checked={remember}
                                onChange={() => setRemember(prev => !prev)}
                            />
                        </Form.Group>

                        <div className="d-grid gap-2 col-6 mx-auto">
                            <Button variant="primary" type="submit" disabled={load}>
                                {load ? <Spinner animation="border" role="status" size="sm" /> : "Login"}
                            </Button>
                        </div>
                    </Form>

                    <div className="text-center mt-3">
                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login