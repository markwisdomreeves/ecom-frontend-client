import React from 'react';
import { Button } from "react-bootstrap";


function NewsLetterSuccess() {
    return (
        <>
            <div className="container">
                <h4 id="newletters-success-heading">Success!!!</h4>
                <section className="row ml-1">
                    <p id="newletters-success-text">
                        Thanks for submiting email.
                    </p>
                </section>

                <Button href="/" className="mt-5" variant="dark">
                    Go Back
                </Button>
            </div>

        </>
    )
}

export default NewsLetterSuccess
