import{createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    // The fetchBaseQuery function is imported from '@reduxjs/toolkit/query/react'.
    // It is used to configure how API requests are made, including specifying the base URL.
    // In this case, it sets the base URL to 'http://localhost:3500'.
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),

    // The tagTypes array is provided to categorize different types of entities returned by the API.
    tagTypes: ['User', 'Client', 'Vaccine', 'Disease'],

    // The endpoints object is provided to define various API endpoints.
    // Endpoints are defined using the builder argument passed to the function.
    endpoints: builder => ({})
});
