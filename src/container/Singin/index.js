import React from 'react'
import Layout from '../../component/Layout'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Input from '../../component/UI/Input'

/**
* @author
* @function Signin
**/

export const Signin = (props) => {
    return (
        <Layout>
            <Container style={{ marginTop: 50 }}>
                <Row className="mt-20">
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
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

export default Signin