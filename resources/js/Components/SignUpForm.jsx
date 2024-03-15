import React, { useState } from 'react';
import useUserStore from "../store/user";

function SignUpForm(props) {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    address: '',
  });
  const [user, register] = useUserStore((state) => [
    state.user,
    state.register
  ]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRes = await register(formData).catch(function (error) {
      setError(error.response.data.message);
    });;

    if (userRes || user) {
      props.setShowModal(false);
    }
  };

  return (
    <div className="min-w-72">
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      {error && <p className="my-2  text-sm text-red-600">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">Sign Up</button>
    </form>
    </div>
  );
}

export default SignUpForm;