import React, { useEffect, useState } from 'react';

import Modal from "../Components/Modal";
import Login from '../Components/Login';
import Loader from '../Components/Loader';


const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/images/coming.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
]

export default  function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let products =  await axios.get(`https://localhost/api/products?page=${currentPage}`);
      setProducts(products.data.data);
      setLastPage(products.data.last_page);
      setLoading(false);
    }
    fetchData();
  },[currentPage]);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-white">
      <Modal showModal={isModalOpen} setShowModal={setIsModalOpen} >
        <Login />
      </Modal>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Producrs</h2>
        {loading && <Loader/> }
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {!loading && products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src="/images/coming.jpg"
                  alt="def"
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        { products.length && 
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-4 py-2 text-sm ${currentPage === number ? 'text-white bg-blue-500' : 'text-gray-700 bg-gray-200'} rounded-md hover:bg-blue-500 hover:text-white`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => (prev < lastPage ? prev + 1 : prev))}
              disabled={currentPage === lastPage}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
        </div>
      }
      </div>
    </div>
  )
}