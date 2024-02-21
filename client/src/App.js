import React, { useState, useEffect } from 'react';
import CandidateForm from './CandidateForm';
import CandidateList from './CandidateList';
import axios from 'axios';

const App = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/candidates');
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addCandidate = async (candidate) => {
    try {
      const response = await axios.post('http://localhost:4000/candidates', candidate);
      setCandidates([...candidates, response.data]);
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  const updateCandidateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/candidates/${id}`, { status: newStatus });
      const updatedCandidates = candidates.map(candidate => {
        if (candidate.id === id) {
          return { ...candidate, status: newStatus };
        }
        return candidate;
      });
      setCandidates(updatedCandidates);
    } catch (error) {
      console.error('Error updating candidate status:', error);
    }
  };

  const deleteCandidate = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/candidates/${id}`);
      const filteredCandidates = candidates.filter(candidate => candidate.id !== id);
      setCandidates(filteredCandidates);
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recruiter Tool</h1>
      <CandidateForm addCandidate={addCandidate} />
      <CandidateList candidates={candidates} updateCandidateStatus={updateCandidateStatus} deleteCandidate={deleteCandidate} />
    </div>
  );
};

export default App;
