import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${__URI__}/properties`);
        setProperties(res.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLike = async (id) => {
    try {
      await axios.put(
        `${__URI__}/properties/like/${id}`,
        {},
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      const updatedProperties = properties.map((property) =>
        property._id === id
          ? { ...property, likes: property.likes + 1 }
          : property
      );
      setProperties(updatedProperties);
    } catch (error) {
      console.error("Error liking property:", error);
    }
  };

  return (
    <div className=" bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Properties</h2>
        <div className="flex justify-end m-4">
          <button
            onClick={() => navigate("/post-property")}
            className="bg-white text-black px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Post Property
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {currentProperties.map((property) => (
            <div
              key={property._id}
              className={`p-4 border rounded ${
                property.role === "seller" ? "bg-white" : "bg-slate-100"
              } hover:shadow-lg transition duration-300`}
            >
              <h3 className="text-xl font-bold text-blue-600">
                {property.place}
              </h3>
              <p className="text-gray-700">Area: {property.area} sq. ft.</p>
              <p className="text-gray-700">Bedrooms: {property.bedrooms}</p>
              <p className="text-gray-700">Bathrooms: {property.bathrooms}</p>
              <p className="text-gray-700">
                Nearby Hospitals: {property.nearbyHospitals}
              </p>
              <p className="text-gray-700">
                Nearby Colleges: {property.nearbyColleges}
              </p>
              <div className="flex mt-4">
                <button
                  onClick={() => handleLike(property._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition duration-300"
                >
                  Like ({property.likes})
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition duration-300">
                  I’m Interested
                </button>
                <Link
                  to={`/properties/${property._id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          propertiesPerPage={propertiesPerPage}
          totalProperties={properties.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Properties;
