import React, { useState } from 'react';

const CandidateForm = ({ addCandidate }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [skills, setSkills] = useState('');
    const [status, setStatus] = useState('');
    const [expectedSalary, setExpectedSalary] = useState('');
    const [nodeExperience, setNodeExperience] = useState('');
    const [reactExperience, setReactExperience] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const expectedSalaryValue = parseFloat(expectedSalary);
            if (isNaN(expectedSalaryValue) || expectedSalaryValue <= 0 || expectedSalaryValue > 10000000) {
                console.error('Invalid expected salary value');
                return;
            }

            const candidate = {
                name,
                email,
                phone,
                skills,
                status,
                expected_salary: expectedSalary,
                nodejs_experience_category: nodeExperience,
                reactjs_experience_category: reactExperience
            };

            addCandidate(candidate);

            // Reset form fields
            setName('');
            setEmail('');
            setPhone('');
            setSkills('');
            setStatus('');
            setExpectedSalary('');
            setNodeExperience('');
            setReactExperience('');
        } catch (error) {
            console.error('Error adding candidate:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h2 className="text-xl font-bold mb-2">Add New Candidate</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-2" htmlFor="name">Name</label>
                    <input className="w-full border rounded py-2 px-3" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label className="block mb-2" htmlFor="email">Email</label>
                    <input className="w-full border rounded py-2 px-3" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label className="block mb-2" htmlFor="phone">Phone</label>
                    <input className="w-full border rounded py-2 px-3" type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div>
                    <label className="block mb-2" htmlFor="skills">Skills/Qualifications</label>
                    <input className="w-full border rounded py-2 px-3" type="text" id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} required />
                </div>
                <div>
                    <label className="block mb-2" htmlFor="status">Status</label>
                    <select className="w-full border rounded py-2 px-3" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="">Select Status</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Offer Extended">Offer Extended</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2" htmlFor="expectedSalary">Expected Salary</label>
                    <input className="w-full border rounded py-2 px-3" type="number" id="expectedSalary" value={expectedSalary} onChange={(e) => setExpectedSalary(e.target.value)} required />
                </div>
                <div>
                    <label className="block mb-2" htmlFor="nodeExperience">Node.js Experience</label>
                    <select className="w-full border rounded py-2 px-3" id="nodeExperience" value={nodeExperience} onChange={(e) => setNodeExperience(e.target.value)} required>
                        <option value="">Select Node.js Experience</option>
                        <option value="Less than 1 year">Less than 1 year</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="Over 2 years">Over 2 years</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2" htmlFor="reactExperience">React.js Experience</label>
                    <select className="w-full border rounded py-2 px-3" id="reactExperience" value={reactExperience} onChange={(e) => setReactExperience(e.target.value)} required>
                        <option value="">Select React.js Experience</option>
                        <option value="Less than 1 year">Less than 1 year</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="Over 2 years">Over 2 years</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Add Candidate</button>
                </div>
            </div>
        </form>
    );
};

export default CandidateForm;
