import React, { useState } from 'react'
import { Col, Container, Row, Button, Table } from 'react-bootstrap';
import Layout from '../../component/Layout'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addProduct } from './../../store/action';
import Input from "./../../component/UI/Input";
import Modal from "./../../component/UI/Modal";
import './style.css'
import { generatePublicUrl } from '../../urlConfig';

/**
* @author
* @function Products
**/

export const Products = (props) => {

  const category = useSelector(state => state.category)
  const products = useSelector(state => state.product)
  console.log('products===', products);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productImage, setProductImage] = useState([]);

  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setproductDetails] = useState(null);




  const handleClose = () => {


    setShow(false)
    // setCategoryName('');
    // setParentCategoryId('');
    // setCategoryImage('');
  };
  const handleShow = () => setShow(true);
  const submitData = () => {
    const form = new FormData();

    if (title === "") {
      alert('Product name is required');
      setShow(false);
      return;
    }

    form.append('title', title);
    form.append('regularPrice', regularPrice);
    form.append('quantity', quantity);
    form.append('description', description);
    form.append('category', categoryId);
    for (let pic of productImage) {
      form.append('images', pic)
    }
    dispatch(addProduct(form));
    //     setCategoryName('');
    //     setParentCategoryId('');
    //     setCategoryImage('');
    setShow(false);
  }

  const linierProducts = (categories, option = []) => {
    if (categories?.length) {
      categories?.map((item, index) => {
        option.push({
          value: item?._id,
          name: item?.name
        })
        if (item?.children?.length) {
          linierProducts(item?.children, option)
        }
      })
      return option
    }
  }

  const handleProductImage = (e) => {
    setProductImage([
      ...productImage,
      e.target.files[0]
    ])
  }

  const renderProductsTable = () => {
    return (
      <Table style={{ fontSize: 15 }} responsive="sm" striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            {/* <th>Description</th> */}
            <th>Category</th>
            {/* <th>Table heading</th> */}
          </tr>
        </thead>

        {
          products?.products?.length && products?.products?.map((item, index) => (
            <tbody>
              <tr onClick={() => showProductDetailsModal(item)}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.regularPrice}</td>
                <td>{item.quantity}</td>
                {/* <td>{item.description}</td> */}
                <td>{item.category.name}</td>
              </tr>
            </tbody>
          ))
        }

      </Table>
    )
  }

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        submitData={submitData}
        modalTitile={'Add new Product'}
      >
        <Input
          label="Title"
          value={title}
          placeholder="Product Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Price"
          value={regularPrice}
          placeholder="RegularPrice"
          onChange={(e) => setRegularPrice(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          placeholder="Product Quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder="Product Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          onChange={(e) => setCategoryId(e.target.value)}
          value={categoryId}
        >
          <option>Select category</option>
          {
            linierProducts(category.categories)?.map((item, index) => <option key={index} value={item?.value}>{item?.name}</option>)
          }
        </select>
        {
          productImage.length > 0 ?
            productImage.map((pic, index) => <div key={index}>{JSON.stringify(pic.name)}</div>) : null
        }
        <input className="form-control mt-3" type="file" name="productImage" onChange={handleProductImage} />
      </Modal>
    );
  }

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  }

  const showProductDetailsModal = (products) => {
    setproductDetails(products);
    setProductDetailModal(true);

  }

  const renderShowProductDetailsModal = () => {

    if (!productDetails) {
      return null;
    }

    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={'Product Details'}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.title}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.regularPrice}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: 'flex',justifyContent:'stretch' }}>
              {productDetails.images.map(item =>
                <div className="productImgContainer">
                  <img src={generatePublicUrl(item.img)} />
                </div>
              )}
            </div>

          </Col>
        </Row>
      </Modal>
    );
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products</h3>
              <Button variant="secondary" onClick={handleShow}>
                Add New
              </Button>
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: 10 }} >
          <Col >
            {renderProductsTable()}
          </Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderShowProductDetailsModal()}
    </Layout>
  )

}

export default Products