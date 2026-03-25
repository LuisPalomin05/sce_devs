import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
