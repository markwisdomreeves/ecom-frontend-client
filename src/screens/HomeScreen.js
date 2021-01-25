import React, { useEffect } from 'react';
import { Row, Col, Button } from "react-bootstrap";
import Message from "../conponents/Message";
// import Loading from "../conponents/Loading";
import LoadingTwo from "../conponents/LoadingTwo";
import Paginate from "../conponents/Paginate";
import ProductCarousel from "../conponents/ProductCarousel";
import Meta from "../conponents/Meta";

import Product from "../conponents/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";



const HomeScreen = ({ match }) => {

    // Getting the keywprd from the url
    // for search form
    const keyword = match.params.keyword

    // for page pagination
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch();

    // GETTING THE PRODUCT FROM THE REDUX STATE
    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;


    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <Meta />

            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Button href='/' variant='dark'>Go Back</Button>
            )}

            <h1 className="home-screen-h1">Latest Products</h1>
            {loading ? (
                <LoadingTwo />
            ) : error ? (
                <>
                    <Message variant='danger'>{error}</Message>
                </>
            ) : (
             <>
                <Row>
                    {products.map((product) => (
                        <Col className="custom-card-style-1" sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row> 

                <Paginate 
                    pages={pages}
                    page={page}
                    keyword={keyword ? keyword : ''}
                />
             </>
            )}

        </>
    )
}


export default HomeScreen
