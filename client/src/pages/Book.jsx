/* eslint-disable no-unused-vars */
import React from "react";

import NavBar from "../components/dashboard/Navbar";
import SideBar from "../components/dashboard/SideBar";
import Modal from "../components/dashboard/Modal";
import BookForm from "../components/book/BookForm";
import BookTable from "../components/book/BookTable";

// component of Books 

const Book  = () => {
    return (
    <div >
        <NavBar></NavBar>
        <SideBar></SideBar>
        <Modal></Modal>
        <BookTable></BookTable>

      
      </div>
    );
}
export default Book ;