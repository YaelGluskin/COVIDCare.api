import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectClientById } from './clientsApiSlice'

// React component representing a client row in a table
const Client = ({ clientId }) => {
    const client = useSelector(state => selectClientById(state, clientId)) // Select client from Redux store by clientId
   const navigate = useNavigate() // Hook to navigate to different routes

    if (client) { // If client exists, render client details
        // Function to handle edit button click, navigates to client edit page
        const handleEdit = () => navigate(`/dash/clients/${clientId}`)
        // Convert client roles array to string for display
        const clientRolesDisplay = client.roles.toString().replaceAll(',', ', ') // For looking good
        const cellStatus = client.active ? '' : 'table__cell--inactive'  // Determine cell status based on client's active status

        return ( // Render client row
            <tr className="table__row client">
                <td className={`table__cell ${cellStatus}`}>{client.clientname}</td>
                <td className={`table__cell ${cellStatus}`}>{clientRolesDisplay}</td>
                <td className={`table__cell ${cellStatus}`}>
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
        )

    } else return null  // If client does not exist, return null (no rendering)
};

export default Client;