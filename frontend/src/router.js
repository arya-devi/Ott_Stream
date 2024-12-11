import { createBrowserRouter } from "react-router-dom";
// import Aboutus from "./components/Aboutus";
import LandingPage from "./components/LandingPage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import MovieListPage from "./components/MovieListPage";
import WatchlistPage from "./components/WatchlistPage";
import WatchHistoryPage from "./components/WatchHistoryPage";
import MoviePage from "./components/MoviePage";
import ResetPasswordPage from "./components/ResetPasswordPage";

const router = createBrowserRouter([
    { path: '', element: <LandingPage/> },
    { path: 'signup', element: <SignupPage/> },
    { path: 'login', element: <LoginPage/> },
    { path: 'login/:err', element: <LoginPage/> },
    { path: 'movieList', element: <MovieListPage/> },
    { path: 'WatchList', element: <WatchlistPage/> },
    { path: 'WatchHistory', element: <WatchHistoryPage/> },
    { path: 'movie/:movieId', element: <MoviePage/> },
    { path: 'resetPswd', element: <ResetPasswordPage/> },
]);

export default router;