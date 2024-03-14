import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Booking, BookingForm } from "./components";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/" element={<Booking />} />
      <Route path="/booking-form" element={<BookingForm />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={route} />;
};

export default App;
