import React, { useEffect, useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../conponents/Message";
import Loading from "../conponents/Loading";
import FormContainer from "../conponents/FormContainer"
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import axios from "axios";


const ProductEditScreen = ({ match,  history }) => {
    // Getting the Id or product id from the url
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { product, loading, error } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate, } = productUpdate
            

    // To ignore useEffect errors, add // eslint-disable-next-line to the line before.
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        } 
    }, [dispatch, productId, product, history, successUpdate])


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            })
        )
    }


    return (
        <>
            <Link to='/admin/productlist' className='btn btn-dark my-3'>
                Go Back
            </Link>
            
            <FormContainer>
                <h2>Edit Product </h2>
                {loadingUpdate && <Loading /> }
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }

                {loading ? (
                    <Loading />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Enter name"   
                            />
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='text'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)} 
                                placeholder="Enter price"   
                            />
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                value={image}
                                onChange={(e) => setImage(e.target.value)} 
                                placeholder="Enter image url / upload image below"   
                            />

                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            >
                                { uploading && <Loading /> }
                            </Form.File>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)} 
                                placeholder="Enter brand"   
                            />
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)} 
                                placeholder="Enter count in stock"   
                            />
                        </Form.Group>

                        <Form.Group controlId='catagory'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)} 
                                placeholder="Enter category"   
                            />
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} 
                                placeholder="Enter description"   
                            />
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>

                    </Form>
                )}

            </FormContainer>
        </>
    )

}


export default ProductEditScreen
