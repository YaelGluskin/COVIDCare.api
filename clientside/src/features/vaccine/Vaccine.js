import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectVaccineById } from './vaccinesApiSlice'
// import { selectClientById } from '../clients/clientsApiSlice'

// React component representing a vaccine row in a table
const Vaccine = ({ vaccineId }) => {
    const vaccine = useSelector(state => selectVaccineById(state, vaccineId)) // Select vaccine from Redux store by vaccineId
    console.log(vaccine)
    const navigate = useNavigate() // Hook to navigate to different routes
    // Assuming selectClientById is your Redux selector to fetch a client by ID
    /*
    const clientId = vaccine ? vaccine.client : null;
    const client = useSelector(state => selectClientById(state, clientId))
    console.log(clientId) 
    console.log(client) 
    */
    if (vaccine) { // If vaccine exists, render vaccine details
        // Function to handle edit button click, navigates to vaccine edit page
        const handleEdit = () => navigate(`/dash/vaccines/${vaccineId}`)
        
        // Convert vaccine roles array to string for display
        // const vaccineRolesDisplay = vaccine.roles.toString().replaceAll(',', ', ') // For looking good
        // const cellStatus = vaccine.active ? '' : 'table__cell--inactive'  // Determine cell status based on vaccine's active status
        const vaccineDate = new Date(vaccine.date).toLocaleString('en-IL', { day: 'numeric', month: 'long', year: 'numeric' })
        // const clientId = new String(vaccine.client)
        return ( // Render vaccine row
            <tr className="table__row vaccine">
                <td className="table__cell accineDate">{vaccineDate}</td>
                <td className={`table__cell `}>{vaccine.name}</td>
                <td className={`table__cell `}>{vaccine.clientName} , id: {vaccine.clientID}</td>
                <td className={`table__cell `}>
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

    } else return null  // If vaccine does not exist, return null (no rendering)
};

export default Vaccine;