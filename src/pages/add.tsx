import React, { useState, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Add: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic input validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const response: AxiosResponse = await axios.post<FormData>('http://localhost:5173/api', formData);
      console.log(response);
      setError(null);
      resetState();
    } catch (error) {
      console.log(error);
      setError('An error occurred while adding the data.');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    const { value } = event.target;

    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const resetState = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <article data-theme="light">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={formData.name} onChange={e => handleChange(e, 'name')} />

        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={formData.email} onChange={e => handleChange(e, 'email')} />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={formData.password} onChange={e => handleChange(e, 'password')} />

        <button type="submit">Add</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </article>
    </form>
  );
};

export default Add;







