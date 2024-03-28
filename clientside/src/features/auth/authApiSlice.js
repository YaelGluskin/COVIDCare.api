import { apiSlice } from "../../app/api/apiSlice"; // Import API slice from the app's API module
import { logOut } from "./authSlice"; // Import logout action from the authentication slice

export const authApiSlice = apiSlice.injectEndpoints({ // Create an API slice for authentication
    endpoints: builder => ({ // Define endpoints for API operations
        login: builder.mutation({ // Define a mutation for login operation
            query: credentials => ({ // Define the query for login operation, username and pwd
                url: '/auth', // API endpoint for login
                method: 'POST', // HTTP method for login
                body: { ...credentials } // Request body containing user credentials
            })
        }),
        sendLogout: builder.mutation({ // Define a mutation for logout operation
            query: () => ({ // Define the query for logout operation
                url: '/auth/logout', // API endpoint for logout
                method: 'POST', // HTTP method for logout
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) { // Define behavior when logout query starts
                try {
                    await queryFulfilled // Wait for logout query to be fulfilled
                    dispatch(logOut()) // Dispatch logout action
                    dispatch(apiSlice.util.resetApiState()) // Reset API state
                } catch (err) { // Handle errors
                    console.log(err) // Log errors to the console
                }
                // we could do it by const
            }
        }),
        refresh: builder.mutation({ // Define a mutation for token refresh operation
            query: () => ({ // Define the query for token refresh operation
                url: '/auth/refresh', // API endpoint for token refresh
                method: 'GET', // HTTP method for token refresh
            })
        }),
    })
})

// Export hooks for using mutations in components
export const {
    useLoginMutation, // Hook for login mutation
    useSendLogoutMutation, // Hook for logout mutation
    useRefreshMutation, // Hook for token refresh mutation
} = authApiSlice
