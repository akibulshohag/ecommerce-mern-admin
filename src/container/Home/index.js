import React from 'react'
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'
import Layout from '../../component/Layout'
import  './style.css'

/**
* @author
* @function Home
**/

export const Home = (props) => {
  return (
    <Layout>
      {/* <Container> */}
        <Row>
          <Col md={2} className="sidebar">Side bar</Col>
          <Col md={10} style={{marginLeft:'auto'}}> container</Col>
        </Row>
      {/* </Container> */}
      {/* <div style={{margin:50,backgroundColor:'#fff'}} className="text-center">
            <h1 style={{fontWeight:'bold',color:'green'}}>Welcome to eHeartz Admin Panel</h1>
            <p style={{fontSize:30}}>This is a ecommerce website.</p>
        </div> */}
    </Layout>
  )

}

export default Home