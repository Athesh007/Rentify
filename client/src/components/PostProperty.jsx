import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostProperty = () => {
  const [formData, setFormData] = useState({
    place: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    nearbyHospitals: "",
    nearbyColleges: "",
  });
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${__URI__}/properties`, formData, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      navigateTo("/properties");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen p-7 bg-gradient-to-br from-blue-400 to-purple-500">
      <h2 className="text-2xl font-bold mb-4 text-center">Post Property</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block mb-1">Place</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Area</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Bathrooms</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Nearby Hospitals</label>
          <input
            type="text"
            name="nearbyHospitals"
            value={formData.nearbyHospitals}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Nearby Colleges</label>
          <input
            type="text"
            name="nearbyColleges"
            value={formData.nearbyColleges}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Post Property
        </button>
      </form>
    </div>
  );
};

export default PostProperty;
