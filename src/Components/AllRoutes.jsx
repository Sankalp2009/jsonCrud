import {Routes,Route} from 'react-router-dom'
import Home from './../Pages/Home';
import Create from './../Pages/Create';
import Update from './../Pages/Update';

function AllRoutes() {
  return (
    <Routes>
     <Route path={'/'} element={< Home />} />
     <Route path={'/add'} element={<Create/>} />
     <Route path={'/edit/:id'} element={<Update/>} />
    </Routes>
  )
}

export default AllRoutes