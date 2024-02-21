import React, { useState, useEffect } from 'react';

const CandidateList = ({ candidates, updateCandidateStatus, deleteCandidate }) => {
    const [candidateData, setCandidateData] = useState([]);

    useEffect(() => {
        setCandidateData(candidates);
    }, [candidates]);

    const handleDelete = async (id) => {
        try {
            await deleteCandidate(id);
            // Update the candidate list after deletion
            setCandidateData(candidateData.filter(candidate => candidate.id !== id));
        } catch (error) {
            console.error('Error deleting candidate:', error);
        }
    };

    // Function to calculate the computed score for a candidate
    const calculateComputedScore = (candidate) => {
        // Assuming the candidate object contains properties for nodejs_experience and reactjs_experience
        const nodejsScore = calculateScore(candidate.nodejs_experience_category);
        const reactjsScore = calculateScore(candidate.reactjs_experience_category);
        console.log(nodejsScore);
        return nodejsScore + reactjsScore;
    };

    // Helper function to calculate the score based on experience years
    const calculateScore = (experienceYears) => {
        switch (experienceYears) {
            case 'Less than 1 year':
                return 1;
            case '1-2 years':
                return 2;
            case 'Over 2 years':
                return 3;
            default:
                return 0;
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateCandidateStatus(id, newStatus);
            const updatedCandidates = candidateData.map(candidate => {
                if (candidate.id === id) {
                    return { ...candidate, status: newStatus };
                }
                return candidate;
            });
            setCandidateData(updatedCandidates);
        } catch (error) {
            console.error('Error updating candidate status:', error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Candidate List</h2>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Phone</th>
                        <th className="px-4 py-2">Skills/Qualifications</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Expected Salary</th>
                        <th className="px-4 py-2">Computed Score</th>
                        <th className="px-4 py-2">Update</th>
                        <th className="px-4 py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {candidateData && candidateData.map(candidate => (
                        <tr key={candidate.id}>
                            <td className="border px-4 py-2">{candidate.name}</td>
                            <td className="border px-4 py-2">{candidate.email}</td>
                            <td className="border px-4 py-2">{candidate.phone}</td>
                            <td className="border px-4 py-2">{candidate.skills}</td>
                            <td className="border px-4 py-2">{candidate.status}</td>
                            <td className="border px-4 py-2">{candidate.expected_salary}</td>
                            <td className="border px-4 py-2">{calculateComputedScore(candidate)}</td>
                            <td className="border px-4 py-2">
                                {/* Update button */}
                                <select className="border rounded py-1 px-2 mr-2" value={candidate.status} onChange={(e) => handleStatusChange(candidate.id, e.target.value)}>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Interview Scheduled">Interview Scheduled</option>
                                    <option value="Offer Extended">Offer Extended</option>
                                    <option value="Hired">Hired</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </td>
                            <td className="border px-4 py-2">
                                {/* Delete button */}
                                <button onClick={() => handleDelete(candidate.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CandidateList;
