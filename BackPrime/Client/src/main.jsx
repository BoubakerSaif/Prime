import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import DashBoard from "./Pages/DashBoard.jsx";
import Application from "./Pages/Application.jsx";
import Shop from "./Pages/Shop.jsx";
import ServerInfos from "./Pages/ServerInfos.jsx";
import ServerRules from "./Pages/ServerRules.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Profile from "./Pages/Profile.jsx";
import store from "./Redux/store.js";
import { Provider } from "react-redux";
import Welcome from "./Pages/Welcome.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/application/ems" element={<Application />} />
        <Route path="/application/warden" element={<Application />} />
        <Route path="/application/whitelist" element={<Application />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/infos" element={<ServerInfos />} />
        <Route path="/rules" element={<ServerRules />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
      <Route path="/welcome" element={<Welcome />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
