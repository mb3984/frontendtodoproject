import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext"; // Correct import path
import Home from "./Home";
import Login from "./components/Auth/Login"; // Adjust if your path is different
import Signup from "./components/Auth/Signup"; // Adjust if your path is different
import TaskList from "./components/Tasks/TaskList";
import TaskForm from "./components/Tasks/TaskForm";
import Navbar from "./Navbar";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/tasks"
            element={
              <AuthRoute>
                <TaskList />
              </AuthRoute>
            }
          />
          <Route
            path="/newtask"
            element={
              <AuthRoute>
                <TaskForm />
              </AuthRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// Protected Route Component
const AuthRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Home from "./Home";
// import Login from "./components/Auth/Login";
// import Signup from "./components/Auth/Signup";
// import TaskList from "./components/Tasks/TaskList";
// import TaskForm from "./components/Tasks/TaskForm";
// import Navbar from "./Navbar";

// const App = () => {
//   const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists

//   const ProtectedRoute = ({ element }) => {
//     return isAuthenticated ? element : <Navigate to="/login" />;
//   };

//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route
//           path="/tasks"
//           element={<ProtectedRoute element={<TaskList />} />}
//         />
//         <Route
//           path="/newtask"
//           element={<ProtectedRoute element={<TaskForm />} />}
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
