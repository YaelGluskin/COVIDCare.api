import { useGetUsersQuery } from "./usersApiSlice"
import User from "./User"; // Import the User component

const UsersList = () => { // Component for displaying a list of users
    const {
       data: users, // Rename 'data' to 'users' for clarity
       isLoading,
       isSuccess,
       isError,
       error  
    } = useGetUsersQuery(
        undefined, {
            pollingInterval: 60000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
    });
    

    let content // Define content variable to render based on loading and success states
    if(isLoading) content = <p>Louding users...</p>// Display loading message while fetching data
    // Display error message if fetching data results in an error
    if(isError) content = <p className="errmsg">{error?.data?.message}</p>
    if (isSuccess) { // If data fetching is successful, render the users list table
        const { ids } = users // Generate table rows for each user
        const tableContent = ids?.length // It has to have a key
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = ( // Render the users list table
            <table className="table table--users">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th user__username">Username</th>
                        <th scope="col" className="table__th user__roles">Roles</th>
                        <th scope="col" className="table__th user__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content // Render the content based on the current state
}
export default UsersList


