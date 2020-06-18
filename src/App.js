import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRespositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response =>
      setRespositories(response.data)
    );
  }, [])

  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      title: `Ecoleta ${Date.now()}`
    });
    setRespositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    let updatedRepositories = [...repositories];
    const repoToDeleteIndex = updatedRepositories.findIndex(repository => repository.id === id);
    updatedRepositories.splice(repoToDeleteIndex, 1);
    await api.delete(`repositories/${id}`);
    setRespositories(updatedRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
