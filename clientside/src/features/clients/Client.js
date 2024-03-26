import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectClientById } from './clientsApiSlice'

// React component representing a client row in a table
const Client = ({ clientId }) => {
    const client = useSelector(state => selectClientById(state, clientId)) // Select client from Redux store by clientId
    const navigate = useNavigate() // Hook to navigate to different routes
    console.log(client)
    if (!client) return null; // If client does not exist, return null (no rendering)

    // Function to handle edit button click, navigates to client edit page
    const handleEdit = () => navigate(`/dash/clients/${clientId}`);

    // Determine cell status based on client's active status
    const cellStatus = client.active ? '' : 'table__cell--inactive';

    return ( // Render client row
        <tr className={`table__row client ${cellStatus}`}>
            <td className="table__cell">{client.clientName}</td>
            <td className="table__cell">{client.clientID}</td>
            <td className="table__cell">{client.address.city}</td>
            <td className="table__cell">{client.nunOfVaccine}</td>
            <td className="table__cell">
                {/* Edit button */}
                <button
                    className="icon-button table__button"
                    onClick={handleEdit}
                >
                    {/* Edit icon */}
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </td>
        </tr>
    );
};

export default Client;