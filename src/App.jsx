import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
// import MovieCard from "../components/MovieCard";
import MovieCardDetails from "./pages/MovieCardDetails";
import AddMovie from "./components/AddMovie";
// import EditMovie from "./components/EditMovie";
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-900">
        
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Home page - displays all movies */}
            <Route path="/" element={<Home />} />
            
            {/* Movies listing page (optional - if you want a separate page) */}
            <Route path="/movies" element={<Home />} />
            
            {/* Individual movie details */}
            <Route path="/movies/:id" element={<MovieCardDetails />} />
            
            {/* Add new movie */}
            <Route path="/add-movie" element={<AddMovie />} />
            
            {/* Edit existing movie */}
            {/* <Route path="/edit-movie/:id" element={<EditMovie />} /> */}
            
            {/* Legacy routes for backward compatibility (optional) */}
            <Route path="/properties/:id" element={<MovieCardDetails />} />
            <Route path="/add-property" element={<AddMovie />} />
            {/* <Route path="/edit-property/:id" element={<EditMovie />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;