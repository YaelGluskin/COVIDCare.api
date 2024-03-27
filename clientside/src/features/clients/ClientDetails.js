import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectClientById } from './clientsApiSlice';
import { selectAllVaccines } from '../vaccine/vaccinesApiSlice';
import { selectAllDiseases } from '../disease/diseasesApiSlice';

const ClientDetails = ({ clientId }) => {
    const client = useSelector(state => selectClientById(state, clientId));
    const navigate = useNavigate();
    const allVaccines = useSelector(selectAllVaccines);
    const [vaccines, setVaccines] = useState([]);

    const allDiseases = useSelector(selectAllDiseases);
    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
        if (client && allVaccines) {
            const clientVaccines = allVaccines.filter(vaccine => vaccine.client === clientId);
            setVaccines(clientVaccines);
        }
    }, [clientId, client, allVaccines]);

    useEffect(() => {
        if (client && allDiseases) {
            const clientDisease = allDiseases.filter(disease => disease.client === clientId);
            setDiseases(clientDisease);
        }
    }, [clientId, client, allDiseases]);


    if (!client) return null;

    const handleEdit = () => navigate(`/dash/clients/${clientId}/edit`);






    return (
        <div className="client-details-container">
          <h2>Client Details</h2>
          <div className="client-details">
            <div className="detail">
              <span className="label">Client Name:</span>
              <span className="value">{client.clientName}</span>
            </div>
            <div className="detail">
              <span className="label">Client ID:</span>
              <span className="value">{client.clientID}</span>
            </div>
            <div className="detail">
              <span className="label">Email:</span>
              <span className="value">{client.email}</span>
            </div>
            <div className="detail">
              <span className="label">Cell Phone Number:</span>
              <span className="value">{client.cellPhoneNumber}</span>
            </div>
            <div className="detail">
              <span className="label">Telephone Number:</span>
              <span className="value">{client.telephoneNumber}</span>
            </div>
            <div className="detail">
              <span className="label">Address:</span>
              <span className="value">{client.address.street}, {client.address.city}, {client.address.house_number}</span>
            </div>
            <div className="detail">
              <span className="label">Birth Date:</span>
              <span className="value">{new Date(client.birthDate).toLocaleDateString()}</span>
            </div>
            <div className="detail">
              <span className="label">Number of Vaccines:</span>
              <span className="value">{client.nunOfVaccine}</span>
            </div>
          </div>

          {(client.nunOfVaccine !== 0) &&(
            <ul>
                {vaccines.map(vaccine => (
                    <li key={vaccine._id}>
                        Date:{new Date(vaccine.date).toLocaleDateString()}, Name: {vaccine.name}
                    </li>
                ))}
            </ul>
            )}
            

            
            {diseases.length > 0 ? (
                <div>
                    <h3>Details of the client's covid disease</h3>
                    <ul>
                        {diseases.map(disease => (
                            <li key={disease.id}>
                                Date Positive: {new Date(disease.datePositive).toLocaleDateString()},
                                Date Recovery: {disease.dateRecovery ? new Date(disease.dateRecovery).toLocaleDateString() : 'Not recovered yet'}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <h3>The client did not had covid</h3>
            )}

          <button className="edit-button" onClick={handleEdit}>
            Edit
          </button>
        </div>
      );
      
}

export default ClientDetails;
