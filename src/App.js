import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import FindUs from './components/FindUs.js';
import Order from './components/Order.js';
import MenuPage from './components/MenuPage.js';
import NotFound from './components/NotFound.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route exact path = "/Find-Us" element = {<FindUs></FindUs>}></Route>
        <Route exact path = "/Order" element = {<Order></Order>}></Route>
        <Route exact path = "/Menu" element = {<MenuPage></MenuPage>}></Route> 
        <Route path ="*" element = {<NotFound></NotFound>}></Route>
      </Routes>
    </Router>
  );
}

export default App
