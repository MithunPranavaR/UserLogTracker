import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeDetails from "./empdetailsv2";
import Employee from "./employee";
import LoginDetails from "./logindetails";

const Webpages = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/" element={<Employee />} />
          <Route path="/employee/:id/:logdate" element={<LoginDetails />}>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default Webpages;

