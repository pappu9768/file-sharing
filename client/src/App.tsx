import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { ToastContainer } from "react-toastify"
import Download from "./pages/Download"

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/download" element={<Download/>}/>

      </Routes>
        <ToastContainer position="top-right"/>

    </>
  )
}

export default App