import React, { useState } from 'react'
import Layout from '../../component/Layout'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Input from '../../component/UI/Input'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../action'

/**
* @author
* @function Singup
**/

export const Singup = (props) => {

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');
    const dispatch = useDispatch();


    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)

    const userSignup = (e) => {
        e.preventDefault();
        const user = {
            firstName, lastName, email, password
        }
        dispatch(signUp(user))
    }



    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }

    if(user.loading){
        return <p>Loading....!</p>
    }

    return (
        <Layout>
            <Container style={{ marginTop: 50 }}>
                {user.message}
                <Row className="mt-20">
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        type="text"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={(e) => setfirstName(e.target.value)}
                                    />

                                </Col>
                                <Col>
                                    <Input
                                        label="Last Name"
                                        type="text"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={(e) => setlastName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Input
                                label="Email"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />

                            <Input
                                label="Password"
                                type="Password"
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

export default Singup