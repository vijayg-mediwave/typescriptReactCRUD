import React, { useState, useEffect, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';

interface FormData {
  id: string;
  name: string;
  email: string;
  password: string;
}

const Edit: React.FC = () => {
  const params = useParams();

  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const id = params.id;
    const getSingleData = async () => {
      try {
        const response: AxiosResponse<FormData> = await axios.get(`http://localhost:5173/api/${id}`);
        setFormData(response.data);
      } catch (error) {
      }
    };

    getSingleData();
  }, [params.id]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const id = params.id;
      await axios.put<FormData>(`http://localhost:5173/api/${id}`, {
        ...formData,
      });
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    const { value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

 
  return (
    <main className="container">
    <form onSubmit={handleSubmit}>
      <article data-theme="light">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={formData.name} onChange={e => handleChange(e, 'name')} />

        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={formData.email} onChange={e => handleChange(e, 'email')} />

        {/* <label htmlFor="password">Password</label>
        <input id="password" type="password" value={formData.password} onChange={e => handleChange(e, 'password')} /> */}

        <button type="submit">Edit</button>
      </article>
    </form>
    </main>
  );
};

export default Edit;
