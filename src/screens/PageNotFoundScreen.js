import React from 'react';
import PageNotFoundImg from "../PageNotFoundImg.png";
import { Button } from "react-bootstrap";


const PageNotFoundScreen = () => {
    return (
        <>
            <div className="page-not-found">
                <img src={PageNotFoundImg} alt="Page404" />
            </div>

            <div>
              <Button href="/" variant="dark" size="md" block>
                  Take me back
              </Button>
            </div>
        </>
    )
}

export default PageNotFoundScreen
