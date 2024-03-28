import { useGetClientsQuery } from "./clientsApiSlice"
import Client from "./Client"; // Import the Client component

const ClientsList = () => {
    const {
        data: clients, // Rename 'data' to 'clients' for clarity
        isLoading,
        isSuccess,
        isError,
        error  
    } = useGetClientsQuery(
        undefined, {
            pollingInterval: 60000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        });

    let content // Define content variable to render based on loading and success states
    if(isLoading) content = <p>Louding clients...</p>// Display loading message while fetching data
    // Display error message if fetching data results in an error
    if(isError) content = <p className="errmsg">{error?.data?.message}</p>
    if (isSuccess) { // If data fetching is successful, render the clients list table
        const { ids } = clients // Generate table rows for each client
        const tableContent = ids?.length // It has to have a key
            ? ids.map(clientId => <Client key={clientId} clientId={clientId} />)
            : null

            content = ( // Render the clients list table
            <table className="tableC table--clients">
            <thead className="table__thead">
                <tr>
                    <th scope="col" className="table__th client__Name">Name</th>
                    <th scope="col" className="table__th client__ID">ID</th>
                    <th scope="col" className="table__th client__City">City</th>
                    <th scope="col" className="table__th client__City">Age</th>
                    <th scope="col" className="table__th client__Phone">Phone Number</th>
                    <th scope="col" className="table__th client__Vaccines">Number Of Vaccines</th>
                    <th scope="col" className="table__th client__edit">INFO</th>
                </tr>
            </thead>
            <tbody>
                {tableContent}
            </tbody>
        </table>
        
        );
    }

    return content // Render the content based on the current state
};
export default ClientsList