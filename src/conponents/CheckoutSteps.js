import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link className="shipping-light-red-color">Sign In</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className="shipping-light-red-color" disabled>Sign In</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link className="signin-light-blue-color">Shipping</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className="signin-light-blue-color" disabled>Shipping</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link className="payment-light-pink-color">Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className="payment-light-pink-color" disabled>Payment</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link className="placeorder-light-green-color">Place Order</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className="placeorder-light-green-color" disabled>Place Order</Nav.Link>
                )}
            </Nav.Item>

        </Nav>
    )
}


export default CheckoutSteps;

