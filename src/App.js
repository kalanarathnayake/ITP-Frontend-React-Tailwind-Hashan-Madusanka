import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar.component";
import { EmployeeList } from "./components/employee-list.component";
import { CreateEmployee } from './components/employee-add.component';
import  EditEmployee from "./components/employee-edit.component";

function App() {
  return (

    <div>
      <Navbar />
      <Router>
        <Routes>

          <Route exact path="/employee" element={<EmployeeList />} />{/* Done */}
          <Route exact path="/creatEmployee" element={<CreateEmployee />} />{/* Done */}
          <Route exact path="/editEmployee/:id" element={EditEmployee } />{/* Done */}


        </Routes>
      </Router>

    </div>
  );

}

export default App;
