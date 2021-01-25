import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Row, Col, ListGroup, Image, Form, Button, Card} from "react-bootstrap";
import Message from "../conponents/Message";



// GETTING DATA FROM THE URL WITH URL STRINGS / WORKING WITH THE URL STRINGS
const CartScreen = ({ match, location, history }) => {
    // Getting the Id or cart id from the url
    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split('=')[1]) : 1  // split - [?qty] [1]
    // console.log(qty); // ?qty=1

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    // console.log(cartItems)


    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])


    const removeItemFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        history.push('/login?redirect=shipping')
    }


    return (
        <Row>
            <Col md={8}>
                <h4>Shopping Cart</h4>
                {cartItems.length === 0 ? (
                    <div>
                        <Message>
                            Your cart is empty
                        </Message>
                        <Button href="/" variant="dark" size="md" >Go Back</Button>
                    </div>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={3}>
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            onChange={(e) => {
                                                dispatch(
                                                    addToCart(item.product, Number(e.target.value))
                                                )
                                            }}
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>

                                    <Col md={2}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeItemFromCartHandler(item.product)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                items
                            </h4>
                            $
                            {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkOutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>                  
                    </ListGroup>
                </Card>                                
            </Col>                                        

        </Row>
    )
}


export default CartScreen
