import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Data {
  id: string;
  name: string;
  email: string;
  password: string;
}

function App() {
  const [data, setData] = useState<Data[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.length === 0) {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get<Data[]>('http://localhost:5173/api');
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    await axios.delete(`http://localhost:5173/api/${id}`);
    window.location.reload();
  };

  return (
    <>
      <div>
        <button onClick={() => navigate('/add')}>Click here to register</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>
                <button onClick={() => handleEdit(d.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(d.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
