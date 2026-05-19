import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./components/signup";
import { Login } from "./components/signin";
import { UserHomePage } from "./components/userhome";
import { Alllead } from "./components/adminhome";
import { CreateLead } from "./components/create";
import { UpdateLead } from "./components/update";
import { LeadDetailsPage } from "./components/onelead";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/home" element={<UserHomePage></UserHomePage>} />
        <Route path="/admin/allleads" element={<Alllead></Alllead>} />
        <Route path="/admin/create" element={<CreateLead></CreateLead>} />
        <Route path="/admin/create" element={<CreateLead></CreateLead>} />
        <Route
          path="/admin/:id"
          element={<LeadDetailsPage></LeadDetailsPage>}
        />
        <Route path="/" element={<Signup></Signup>} />

        <Route path="/admin/update/:id" element={<UpdateLead></UpdateLead>} />
      </Routes>
    </Router>
  );
}
