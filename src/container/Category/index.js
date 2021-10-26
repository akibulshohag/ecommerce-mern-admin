import React, { useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap';
import Layout from '../../component/Layout'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addCategory } from './../../store/action';
import Input from "./../../component/UI/Input";
import Modal from '../../component/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosRemove, IoIosAdd } from "react-icons/io";

import 'react-checkbox-tree/lib/react-checkbox-tree.css'

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
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

    const renderCategories = (categories) => {
        if (categories?.length) {
            return categories?.map((item, index) => (
                {
                    label: item?.name,
                    value: item?._id,
                    children: item?.children?.length > 0 && renderCategories(item?.children)
                }
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
                    name: item?.name,
                    parentId: item?.parentId
                })
                if (item?.children?.length) {
                    linierCategories(item?.children, option)
                }
            })
            return option
        }
    }
    const handleClose = () => {
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

    const updateCategory = () => {
        setUpdateCategoryModal(true);
        const categories = linierCategories(category.categories)
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && checkedArray.push(category)
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && expandedArray.push(category)
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);

        console.log('checked==', checked, 'expanded==', expanded, 'categories=', categories);
        console.log('===', checkedArray);
        console.log('===', expandedArray);
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArray?.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandeArray = expandedArray?.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandeArray);
        }
    }




    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <Button variant="secondary" onClick={handleShow}>
                                Add New
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* <ul>{renderCategories(category.categories)}</ul> */}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosAdd />,
                                expandOpen: <IoIosRemove />
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button>Delete</button>
                        <button onClick={updateCategory}>Edit</button>
                    </Col>
                </Row>
            </Container>
            <Modal
                show={show}
                handleClose={handleClose}
                submitData={submitData}
                modalTitle={'Create category'}
            >

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

            </Modal>
            {/* Edit Categories Modal */}

            <Modal
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                submitData={submitData}
                modalTitle={'Update category'}
                size="lg"
            >
                <Row>
                    <Col>
                        <h6>Expanded</h6>
                    </Col>
                </Row>
                {
                    expandedArray?.length > 0 &&
                    expandedArray?.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    // value={''}
                                    placeholder="Category Title"

                                    onChange={(e) => handleCategoryInput('name', e.target.value, 'expanded')}
                                />
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, 'expanded')}
                                    value={item.parentId}
                                >
                                    <option>Select Parent category</option>
                                    {
                                        linierCategories(category.categories)?.map((item, index) => <option key={index} value={item?.value}>{item?.name}</option>)
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                >
                                    <option value="">Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }
                <h6>Checked Categories</h6>
                {
                    checkedArray?.length > 0 &&
                    checkedArray?.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder="Category Title"

                                    onChange={(e) => handleCategoryInput('name', e.target.value, 'checked')}
                                />
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, 'checked')}
                                    value={item.parentId}
                                >
                                    <option>Select Parent category</option>
                                    {
                                        linierCategories(category.categories)?.map((item, index) => <option key={index} value={item?.value}>{item?.name}</option>)
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                >
                                    <option value="">Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }


                <input className="form-control mt-3" type="file" name="categoryImage" onChange={(e) => setCategoryImage(e.target.files[0])} />

            </Modal>
        </Layout>
    )

}

export default Category;