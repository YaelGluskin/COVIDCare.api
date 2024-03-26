import {createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import {apiSlice } from "../../app/api/apiSlice";

// Create an entity adapter for managing vaccine entities
const vaccineEntityManager = createEntityAdapter({});

// Define the initial state using the entity adapter, if it exict
const initialVaccineState = vaccineEntityManager.getInitialState();
// Inject endpoints into the apiSlice from the external apiSlice module
export const vaccinesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Define the 'getVaccines' endpoint for fetching vaccines
        getVaccines: builder.query({
            query: () => '/vaccines', // Endpoint URL
            validateStatus: (response, result) => {
                // Custom status validation function some error return 200 status, so we need to check them both.
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5, // Keep unused data for caching in defaule about 15 sec.
            transformResponse: responseData => {
                // Transform response data before storing it in the Redux store
                const loadedVaccines = responseData.map(vaccine => {
                    vaccine.id = vaccine._id; // Assign 'id' property to vaccine object
                    return vaccine;
                });
                return vaccineEntityManager.setAll(initialVaccineState, loadedVaccines); // Update state with transformed data
            },
            providesTags: (result, error, arg) => {
                // Provide tags for caching purposes
                if (result?.ids) {
                    return [
                        { type: 'Vaccine', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Vaccine', id }))
                    ];
                } else return [{ type: 'Vaccine', id: 'LIST' }];
            }
        }),
    }),
});

// Export query hooks generated by the apiSlice
export const {
    useGetVaccinesQuery,
} = vaccinesApiSlice;

// Select the query result object from the getVaccines endpoints
export const selectVaccinesResult = vaccinesApiSlice.endpoints.getVaccines.select();

// Create a memoized selector to extract vaccines data from the query result
const selectVaccinesData = createSelector(
    selectVaccinesResult,
    vaccinesResult => vaccinesResult.data // normalized state object with ids & entities
);

// Extract selectors using the entity adapter's getSelectors function
// Pass in a selector that returns the vaccines slice of state
export const {
    selectAll: selectAllVaccines,
    selectById: selectVaccineById,
    selectIds: selectVaccineIds
} = vaccineEntityManager.getSelectors(state => selectVaccinesData(state) ?? initialVaccineState);