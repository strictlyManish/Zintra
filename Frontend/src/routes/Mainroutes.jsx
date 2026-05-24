import {Route, Routes} from "react-router"
import Login from "../components/Login"
import Home from "../pages/Home"

function Mainroutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
    </Routes>
  )
}

export default Mainroutes