import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${__URI__}/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col justify-center items-center">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{property.place}</h2>
        <p>Area: {property.area} sq. ft.</p>
        <p>Bedrooms: {property.bedrooms}</p>
        <p>Bathrooms: {property.bathrooms}</p>
        <p>Nearby Hospitals: {property.nearbyHospitals}</p>
        <p>Nearby Colleges: {property.nearbyColleges}</p>
      </div>
    </div>
  );
};

export default PropertyDetail;
