import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Employee from "./pages/Book";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./context/AuthContext";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import Book from "./pages/Book";

function App() {
  return (
    <Router>
      <RecoilRoot>
        <Toaster />
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book" element={<Book />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </RecoilRoot>
    </Router>
  );
}

export default App;
