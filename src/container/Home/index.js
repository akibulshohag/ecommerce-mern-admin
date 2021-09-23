import React from 'react'
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'
import Layout from '../../component/Layout'
import  './style.css'
import { NavLink } from 'react-router-dom'

/**
* @author
* @function Home
**/

export const Home = (props) => {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">
            <ul>
              <li><NavLink to={'/'}>Home</NavLink></li>
              <li><NavLink to={'/products'}>Products</NavLink></li>
              <li><NavLink to={'/orders'}>Orders</NavLink></li>
            </ul>
          </Col>
          <Col md={10} style={{marginLeft:'auto'}}> container</Col>
        </Row>
      </Container>
      {/* <div style={{margin:50,backgroundColor:'#fff'}} className="text-center">
            <h1 style={{fontWeight:'bold',color:'green'}}>Welcome to eHeartz Admin Panel</h1>
            <p style={{fontSize:30}}>This is a ecommerce website.</p>
        </div> */}
    </Layout>
  )

}

export default Home