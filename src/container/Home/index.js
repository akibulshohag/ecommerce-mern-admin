import React from 'react'
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'
import Layout from '../../component/Layout'
import './style.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

/**
* @author
* @function Home
**/

export const Home = (props) => {
  const auth = useSelector(state => state.auth)
  return (
    <Layout sidebar>
      <div style={{ margin: 50, backgroundColor: '#fff' }} className="text-center">
        <h1 style={{ fontWeight: 'bold', color: 'green' }}>
          Welcome, Mr. <span style={{color:'skyblue',fontStyle:'italic'}}>{auth?.user?.fullName}</span> to eHeartz Admin Panel
        </h1>
        <p style={{ fontSize: 30 }}>
            This panel is operating by you.`
        </p>
      </div>
    </Layout>
  )

}

export default Home