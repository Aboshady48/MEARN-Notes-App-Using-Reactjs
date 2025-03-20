import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Navbar } from "./Components/Navbar";
import { Notes } from "./pages/GetNotes/Index";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import { useAuth } from "./Context/Auth";
import "./Style/homeAndNav.css";
import "./Style/Register.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreateNote } from "./pages/CreateNote/Index";
import "./Style/CreateNote.css";
import './Style/notes.css'
const App = () => {
  const { user } = useAuth();
  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />
      <Navbar />

      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/create" element={<CreateNote />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </div>
  );
};

export default App;
