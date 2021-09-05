import React from 'react'
import Layout from '../../component/Layout'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Input from '../../component/UI/Input'

/**
* @author
* @function Singup
**/

export const Singup = (props) => {
    return (
        <Layout>
            <Container style={{ marginTop: 50 }}>
                <Row className="mt-20">
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        type="text"
                                        placeholder="First Name"
                                        value=""
                                        onChange={() => { }}
                                    />

                                </Col>
                                <Col>
                                    <Input
                                        label="Last Name"
                                        type="text"
                                        placeholder="Last Name"
                                        value=""
                                        onChange={() => { }}
                                    />
                                </Col>
                            </Row>
                            <Input
                                label="Email"
                                type="text"
                                placeholder="Email"
                                value=""
                                onChange={() => { }}
                            />

                            <Input
                                label="Password"
                                type="Password"
                                placeholder="Password"
                                value=""
                                onChange={() => { }}
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