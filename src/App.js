import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./conponents/Header";
import Footer from "./conponents/Footer";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import OrderScreen from "./screens/OrderScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen"
import OrderListScreen from "./screens/OrderListScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";
import NewsLetter from "./screens/NewsLetter";
import NewsLetterSuccess from "./screens/NewsLetterSuccess";
import PageNotFoundScreen from "./screens/PageNotFoundScreen";



function App() {
  return (
    <Router>

      <Header />
        <main className="py-3 my-3">
          <Container>
            <Switch>
              <Route path='/newletter-signup' component={NewsLetter} />
              <Route path='/sent' component={NewsLetterSuccess} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/order/:id' component={OrderScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />
              <Route path='/login' component={LoginScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/profile' component={ProfileScreen} />
              
              <Route path='/cart/:id?' component={CartScreen} />
              <Route path='/admin/userlist' component={UserListScreen} />
              <Route path='/admin/user/:id/edit' component={UserEditScreen} />
              <Route path='/admin/productlist' exact component={ProductListScreen} />
              <Route path='/admin/productlist/:pageNumber' exact component={ProductListScreen} />

              <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
              <Route path='/admin/orderlist' component={OrderListScreen} />
              <Route path='/search/:keyword' exact component={HomeScreen} />
              <Route path='/page/:pageNumber' exact component={HomeScreen} />
              <Route path='/search/:keyword/page/:pageNumber' exact component={HomeScreen} />

              <Route path='/' exact component={HomeScreen} />

              <Route path='*' component={PageNotFoundScreen} />
            </Switch>
          </Container>
        </main>

      <Footer />

    </Router>
  );
}


export default App;
