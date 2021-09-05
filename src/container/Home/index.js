import React from 'react'
import { Jumbotron,Container } from 'react-bootstrap'
import Layout from '../../component/Layout'

/**
* @author
* @function Home
**/

export const Home = (props) => {
  return(
    <Layout>
        <div style={{margin:50,backgroundColor:'#fff'}} className="text-center">
            <h1 style={{fontWeight:'bold',color:'green'}}>Welcome to eHeartz Admin Panel</h1>
            <p style={{fontSize:30}}>This is a ecommerce website.</p>
        </div>
    </Layout>
   )

 }

 export default Home