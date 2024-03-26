import { useGetDiseasesQuery } from "./diseasesApiSlice"
import Disease from "./Disease"; // Import the Disease component
const DiseasesList = () => {
    const {
        data: diseases, // Rename 'data' to 'diseases' for clarity
        isLoading,
        isSuccess,
        isError,
        error  
     } = useGetDiseasesQuery();
    return (
        <h1>DiseasesList</h1>
    )
}
export default DiseasesList