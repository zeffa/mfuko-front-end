import React from 'react'
import { Route, Router } from 'react-router-dom'
import history from './history'
import Outlet from '../components/outlets'
import Category from '../components/categories'
import Promotion from '../components/promotions'
import '../App.css';
const Main = () => (
    <Router history={history}>
        <div className='App'>
            {/* <div style={{marginBottom: '20px'}}>
                <ul>
                <li><a href="Outlets">Outlets</a></li>
                <li><a href="Category">Category</a></li>
                <li><a href="Promotion">Promotion</a></li>
                </ul>
            </div> */}
            <Route exact path="/" component={Outlet} />
            <Route exact path="/outlets" component={Outlet} />
            <Route exact path="/categories" component={Category} />
            <Route exact path="/promotions" component={Promotion} />
        </div>
    </Router>
);

export default Main