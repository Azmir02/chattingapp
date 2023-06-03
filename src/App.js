import Registration from "./pages/Register/Registration";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Notloggedinuser from "./Privaterouter/Notloggedin";
import Loggedinuser from "./Privaterouter/Loggedin";
import Forget from "./pages/Frogotpassword";
import Rootlayout from "./Layout";
import Message from "./pages/message";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Loggedinuser />}>
          <Route element={<Rootlayout />}>
            <Route index path="/home" element={<Home />}></Route>
            <Route path="/message" element={<Message />}></Route>
          </Route>
        </Route>
        <Route element={<Notloggedinuser />}>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgetpassword" element={<Forget />}></Route>
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
