import React, { useState } from 'react';
import useUserStore from "../store/user";

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, login, logout] = useUserStore((state) => [
    state.user,
    state.login,
    state.logout
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRes = await login({
      email: email,
      password: password
    }).catch(function (error) {
      setError(error.response.data.message);
    });;
 
    if (userRes || user) {
      props.setShowModal(false);
    }
  };

  return (
    <div className="min-w-72">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-10">
      <div className="mb-6">
        <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Password"
          required
        />
      </div>
      {error && <p className="my-2  text-sm text-red-600">{error}</p>}
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Login</button>
      </form>
    </div>
  );
};

export default Login;