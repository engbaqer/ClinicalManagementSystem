import React from "react";
import './home.css'
import Nav from './nav/nav'
import Body from './body/body'
import Footer from "./footer/footer";
function home() {

    return (
        <div className=" homepage mx-auto h-[100vh]">
            <Nav />
            <Body />
            <Footer />
        </div>
    )
}
export default home 