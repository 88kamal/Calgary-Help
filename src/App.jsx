import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/noPage/NoPage";
import MyState from "./context/myState";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import Dashboard from "./pages/user/Dashboard";
import { Toaster } from 'react-hot-toast';
import CreateRoom from "./pages/user/CreateRoom";
import RoomInfo from "./pages/roomInfo/RoomInfo";
import { ProtectedRouteForUser } from "./portectedRoute/ProtectedRouteForUser";
import ScrollTop from "./components/scrollTop/ScrollTop";
import AllRoom from "./pages/allRoom/AllRoom";

function App() {
  return (
    <MyState>
      <Router>
        <ScrollTop/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/allroom" element={<AllRoom />} />
          <Route path="/dashboard" element={
            <ProtectedRouteForUser>
              <Dashboard />
            </ProtectedRouteForUser>
          } />
          <Route path="/create-room" element={
            <ProtectedRouteForUser>
              <CreateRoom />
            </ProtectedRouteForUser>
          } />
          <Route path="/roominfo/:id/:userId" element={<RoomInfo />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
      <Toaster />
    </MyState>
  )
}

export default App