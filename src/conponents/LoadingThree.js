import React from "react";
import Loader from 'react-loader-spinner'

 
 function LoadingThree() {
     return (
       <div style={{display: "flex", justifyContent: "center", textAlign: "center", marginTop: "40px"}}>
        <Loader
         type="Circles"
         color="#000000"
         height={200}
         width={200}
         timeout={500000}
      />
      </div>
     )
 }
 

 export default LoadingThree
 