import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Input from '../../component/UI/Input'
import { login } from './../../store/action'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

/**
* @author Akib
* @function Signin
**/

export const Signin = (props) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');
    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (!auth.authenticate) {
    //         dispatch(isUserLoggedIn());
    //     }

    // },
    //     [])

    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email, password
        }
        dispatch(login(user));
    }

    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }

    return (
        <Layout>
            <Container style={{ marginTop: 50 }}>
                <Row className="mt-20">
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                            <Input
                                label="Email"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )

}

export default Signin