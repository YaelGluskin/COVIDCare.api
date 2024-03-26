import {createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import {apiSlice } from "../../app/api/apiSlice";

// Create an entity adapter for managing vaccine entities
const vaccineEntityManager = createEntityAdapter({});

// Define the initial state using the entity adapter, if it exict
const initialVaccineState = vaccineEntityManager.getInitialState();
// Inject endpoints into the apiSlice from the external apiSlice module
export const vaccinesApiSlice = apiSlice.injectEndpoints({

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
