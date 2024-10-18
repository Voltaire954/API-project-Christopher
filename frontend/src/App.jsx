import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";
import SpotList from "./components/SpotList/SpotList";
import Header from "./components/Header/Header";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import CreateSpotForm from "./components/CreateSpot/CreateSpot";
import ManageSpots from "./components/ManageSpots/ManageSpots";
import UpdateSpotForm from "./components/UpdateSpot/UpdateSpotForm";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Header isAuthenticated={isLoaded} />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <SpotList /> },
      { path: "/spots/:spotId", element: <SpotDetails /> },
      { path: "/spots/new", element: <CreateSpotForm /> }, // New Route for Create Spot Form
      { path: "/spots/manage", element: <ManageSpots /> }, //new path for manage Spots
      { path: "/spots/edit/:spotId", element: <UpdateSpotForm /> }, // Route for updating spots
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
