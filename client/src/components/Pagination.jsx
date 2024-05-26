const Pagination = ({ propertiesPerPage, totalProperties, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProperties / propertiesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center mt-4 space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
