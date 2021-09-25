import React, { useState } from 'react'
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import Layout from '../../component/Layout'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory,addCategory } from '../../action';
import Input from "./../../component/UI/Input";

/**
* @author
* @function Category
**/

export const Category = (props) => {
    const category = useSelector(state => state.category)
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    const renderCategories = (categories) => {
        if (categories?.length) {
            return categories?.map((item, index) => (
                <li key={index}>
                    {item.name}
                    {item?.children?.length > 0 ? (<ul>{renderCategories(item?.children)}</ul>) : null}
                </li>
            ))
        } else {
            return <h2>Loading....</h2>
        }
    }
    const linierCategories = (categories, option = []) => {
        if (categories?.length) {
            categories?.map((item, index) => {
                option.push({
                    value: item?._id,
                    name: item?.name
                })
                if (item?.children?.length) {
                    linierCategories(item?.children, option)
                }
            })
            return option
        }
    }
    const handleClose = () =>{
        setShow(false)
        setCategoryName('');
        setParentCategoryId('');
        setCategoryImage('');
    };
    const handleShow = () => setShow(true);
    const submitData = () => {
        const form = new FormData();

        if (categoryName === "") {
            alert('Category name is required');
            setShow(false);
            return;
        }

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        setCategoryImage('');
        setShow(false);
    }




    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ul>{renderCategories(category.categories)}</ul>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Create Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={categoryName}
                        placeholder="Category Title"
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <select
                        className="form-control"
                        onChange={(e) => setParentCategoryId(e.target.value)}
                        value={parentCategoryId}
                    >
                        <option>Select Parent category</option>
                        {
                            linierCategories(category.categories)?.map((item, index) => <option key={index} value={item?.value}>{item?.name}</option>)
                        }
                    </select>
                    <input className="form-control mt-3" type="file" name="categoryImage" onChange={(e) => setCategoryImage(e.target.files[0])} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitData}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )

}

export default Category;