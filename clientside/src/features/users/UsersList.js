import { useGetUsersQuery } from "./usersApiSlice"
const UsersList = () => {
    const {
       data: useres,
       isLoading,
       isSuccess,
       isError,
       error  
    } = useGetUsersQuery();
    return (
        <h1>UsersList</h1>
    )
}
export default UsersList