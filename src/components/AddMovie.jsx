import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCinemaBooking } from "../api/cinemabooking";
import { FaFilm, FaUpload, FaTrash } from "react-icons/fa";

export default function AddMovie() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [posterFiles, setPosterFiles] = useState([]);
  const [trailerFile, setTrailerFile] = useState(null);
  const [posterPreviews, setPosterPreviews] = useState([]);
  const [trailerPreview, setTrailerPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    duration: "",
    rating: "PG-13",
    releaseDate: "",
    director: "",
    producer: "",
    writer: "",
    averageRating: "",
    stateOfMovie: "NOW_SHOWING",
    ageRestriction: "PG-13",
    plotSummary: "",
    basePrice: "",
    bookingStartDate: "",
    bookingEndDate: "",
    availableAtLocations: "",
    cast: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle poster files
  const handlePosterChange = (e) => {
    const files = Array.from(e.target.files);
    setPosterFiles(prev => [...prev, ...files]);

    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove poster
  const removePoster = (index) => {
    setPosterFiles(prev => prev.filter((_, i) => i !== index));
    setPosterPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Handle trailer file
  const handleTrailerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTrailerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTrailerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove trailer
  const removeTrailer = () => {
    setTrailerFile(null);
    setTrailerPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare cinema data
      const cinemaData = {
        ...formData,
        duration: parseInt(formData.duration),
        averageRating: formData.averageRating ? parseFloat(formData.averageRating) : 0,
        basePrice: parseFloat(formData.basePrice),
        totalBookings: 0,
        availableAtLocations: formData.availableAtLocations 
          ? formData.availableAtLocations.split(',').map(loc => loc.trim())
          : [],
        cast: formData.cast 
          ? formData.cast.split(',').map(actor => actor.trim())
          : []
      };

      // Call API with form data, posters, and trailer
      await createCinemaBooking(cinemaData, posterFiles, trailerFile);
      
      alert("Movie added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Failed to add movie. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 font-poppins-med py-10 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FaFilm className="text-cyan-500 text-4xl" />
          <h1 className="text-4xl font-bold text-white">Add New Movie</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Avengers: Endgame"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Genre *
              </label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Action, Adventure, Sci-Fi"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Duration (minutes) *
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="181"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Rating *
              </label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
                <option value="NC-17">NC-17</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Age Restriction
              </label>
              <input
                type="text"
                name="ageRestriction"
                value={formData.ageRestriction}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="PG-13"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                State *
              </label>
              <select
                name="stateOfMovie"
                value={formData.stateOfMovie}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="NOW_SHOWING">Now Showing</option>
                <option value="COMING_SOON">Coming Soon</option>
                <option value="ENDED">Ended</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Release Date *
              </label>
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Average Rating (0-10)
              </label>
              <input
                type="number"
                name="averageRating"
                value={formData.averageRating}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="10"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="8.4"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="After the devastating events of Avengers: Infinity War..."
            />
          </div>

          {/* Plot Summary */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Plot Summary
            </label>
            <textarea
              name="plotSummary"
              value={formData.plotSummary}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="The Avengers assemble once more to reverse Thanos' actions..."
            />
          </div>

          {/* Crew */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Director *
              </label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Anthony Russo, Joe Russo"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Producer *
              </label>
              <input
                type="text"
                name="producer"
                value={formData.producer}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Kevin Feige"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Writer *
              </label>
              <input
                type="text"
                name="writer"
                value={formData.writer}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Christopher Markus, Stephen McFeely"
              />
            </div>
          </div>

          {/* Cast */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Cast (comma-separated)
            </label>
            <input
              type="text"
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Robert Downey Jr., Chris Evans, Mark Ruffalo"
            />
          </div>

          {/* Pricing & Booking */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Base Price ($) *
              </label>
              <input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                required
                step="0.01"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="15.99"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Booking Start Date *
              </label>
              <input
                type="date"
                name="bookingStartDate"
                value={formData.bookingStartDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Booking End Date *
              </label>
              <input
                type="date"
                name="bookingEndDate"
                value={formData.bookingEndDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Locations */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Available Locations (comma-separated)
            </label>
            <input
              type="text"
              name="availableAtLocations"
              value={formData.availableAtLocations}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Cinema 1, Cinema 2, Cinema 3"
            />
          </div>

          {/* Posters Upload */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Movie Posters
            </label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePosterChange}
                className="hidden"
                id="poster-upload"
              />
              <label htmlFor="poster-upload" className="cursor-pointer">
                <FaUpload className="text-4xl text-cyan-500 mx-auto mb-3" />
                <p className="text-gray-400">Click to upload posters</p>
                <p className="text-sm text-gray-500 mt-1">You can select multiple images</p>
              </label>
            </div>

            {/* Poster Previews */}
            {posterPreviews.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                {posterPreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Poster ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePoster(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Trailer Upload */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Movie Trailer (Video)
            </label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors">
              <input
                type="file"
                accept="video/*"
                onChange={handleTrailerChange}
                className="hidden"
                id="trailer-upload"
              />
              <label htmlFor="trailer-upload" className="cursor-pointer">
                <FaUpload className="text-4xl text-cyan-500 mx-auto mb-3" />
                <p className="text-gray-400">Click to upload trailer</p>
                <p className="text-sm text-gray-500 mt-1">MP4, MOV, AVI accepted</p>
              </label>
            </div>

            {/* Trailer Preview */}
            {trailerPreview && (
              <div className="mt-4 relative">
                <video
                  src={trailerPreview}
                  controls
                  className="w-full rounded-lg"
                  style={{ maxHeight: "300px" }}
                />
                <button
                  type="button"
                  onClick={removeTrailer}
                  className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full hover:bg-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 py-3 px-6 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Movie..." : "Add Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}