import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Home from './Home'
import IDModel from "./IDModel";

const App = () => {
  return (<>
    <BrowserRouter>
    <div className=" flex justify-center ">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/ID" element={<IDModel/>} />
      </Routes >
      </div>
    </BrowserRouter>
    
  </>);
}
 
export default App ;