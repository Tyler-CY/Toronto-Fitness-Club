import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./components/account/register/register";
import Login from "./components/account/login/login";
import Studios from "./components/studio/studio-search";
import Classes from "./components/class/class-search";
import Plans from "./components/subscription/plans";
import Logout from "./components/account/logout/logout";
import Sessions from "./components/session/sessions";
import Home from "./components/home/home";
import Dashboard from "./components/account/dashboard/dashboard";
import Payment from "./components/account/payment/payment";
import Schedule from "./components/account/schedule/schedule";
import Profile from "./components/account/profile/profile";
import UpdateBilling from "./components/account/payment/update-billing";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path='/'>


                    <Route path='/login' element={<Login />}/>
                    <Route path='/logout' element={<Logout />}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    {/*<Route path='/account-details' element={<AccountDetails/>}/>*/}
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/schedule' element={<Schedule/>}/>
                    {/*<Route path='/update-account' element={<Update/>}/>*/}
                    <Route path='/payments/update-billing' element={<UpdateBilling/>}/>

                    <Route path='/studios/search' element={<Studios/>}/>
                    <Route path='/classes/search' element={<Classes/>} />
                    <Route path='/classes/sessions' element={<Sessions/>} />

                    <Route path='/payments' element={<Payment/>}/>
                    {/*<Route path='/old-payments' element={<Payments/>}/>*/}
                    <Route path='/plans' element={<Plans/>}/>
                    {/*<Route path='/update-card' element={<UpdateCard/>}/>*/}

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
