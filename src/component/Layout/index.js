import React from 'react'
import Header from '../Header/index'
import { Container, Col, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './style.css'
/**
* @author
* @function Layout
**/

export const Layout = (props) => {
    // console.log(props.sidebar);
    return (
        <>
            <Header />
            {
                props.sidebar ?
                    <Container fluid>
                        <Row>
                            <Col md={2} className="sidebar">
                                <ul>
                                    <li><NavLink exact to={'/'}><i style={{ marginRight: 5 }} className="fas fa-home"></i>Home</NavLink></li>
                                    <li><NavLink to={'/category'}><i style={{ marginRight: 5 }} className="fas fa-list-alt"></i>Category</NavLink></li>
                                    <li><NavLink to={'/products'}><i style={{ marginRight: 5}} className="fas fa-toolbox"></i>Products</NavLink></li>
                                    <li><NavLink to={'/orders'}><i style={{ marginRight: 5  }} className="fas fa-cart-plus"></i>Orders</NavLink></li>
                                </ul>
                            </Col>
                            <Col md={10} style={{ marginLeft: 'auto',paddingTop: '60px' }}>
                                {props.children}
                            </Col>

                        </Row>
                    </Container>
                    :
                    props.children
            }



        </>
    )

}

export default Layout