# COVIDCare

A platform efficiently manages COVID-related information such as vaccine records and disease status alongside personal client details, ensuring comprehensive data management.

### Authors

- [@Yael Gluskin](https://github.com/YaelGluskin)

## Features

- **Manage users with different security approaches:** Implement varying levels of access and permissions for different user roles to ensure secure data management.
- **Manageclients whose details can be edited:** Allow authorized users to edit and updateclient information as needed, ensuring data accuracy and relevance.
- **Add vaccinations or diseases toclients:** Provide functionality to record and track vaccination history, disease diagnoses, and related health information for eachclient.
- **Manage four databases:** Efficiently organize and maintain four separate databases to store different types of information, ensuring streamlined access and management of diverse data sets.



Here's an organized overview of the system implementation using Node.js, React, and MongoDB, focusing on CRUD operations and database structure:

### Backend (Node.js with Express)

1. **Server Setup**: 
   - Implemented using Node.js with Express framework.
   - Set up routes to handle CRUD operations for users, clients, diseases, and vaccinations.

2. **Database Management**:
   - Utilized MongoDB as the primary database.
   - Created four collections:
     - **Users**: Stores information about system users, such as login credentials and roles.
     - **Clients**: Contains details of individual clients, including personal information and health data.
     - **Diseases**: Stores information about various diseases.
     - **Vaccinations**: Contains data related to vaccinations, including vaccine types and administration details.

3. **CRUD Operations**:
   - Implemented CRUD functionalities for each collection:
     - **Users**: 
       - Create, Read, Update, Delete (CRUD) operations for managing user accounts and roles.
     - **Clients**: 
       - CRUD operations for managing client information.
     - **Diseases**: 
       - CRUD operations for managing disease data.
     - **Vaccinations**: 
       - CRUD operations for managing vaccination records.

4. **API Endpoints**:
   - Documented API endpoints using Postman or other API documentation tools to describe request and response formats.
   - Tested API endpoints using Postman to ensure functionality and data integrity.
-

### Frontend (React)

1. **User Interface**:
   - Developed a user-friendly interface using React components.
   - Organized components for user management, client management, disease management, and vaccination management.

2. **Routing**:
   - Utilized React Router for client-side routing to navigate between different views/components.

3. **Forms and Input Handling**:
   - Implemented forms and input fields to capture user input for creating and updating data.
   - Validated user input to ensure data integrity and prevent errors.

4. **API Integration**:
   - Integrated with the backend API endpoints using asynchronous HTTP requests (e.g., Axios).
   - Made API calls to perform CRUD operations on users, clients, diseases, and vaccinations.

5. **State Management**:
   - Managed application state using React's built-in state and props mechanism or state management libraries like Redux, depending on the complexity of the application.

By following this structured approach, the system effectively manages user data, client information, disease records, and vaccination details while providing a seamless user experience through the React frontend.


**Server side simulation by screenshots**
![Welco,](https://github.com/YaelGluskin/COVIDCare/blob/main/clientside/public/Public.png)

![NAvigate](https://github.com/YaelGluskin/COVIDCare/blob/main/clientside/public/Routing.png)

![Client List](https://github.com/YaelGluskin/COVIDCare/blob/main/clientside/public/clients.png)

![detail](https://github.com/YaelGluskin/COVIDCare/blob/main/clientside/public/client.png)

![new Disease](https://github.com/YaelGluskin/COVIDCare/blob/main/clientside/public/newDis.png)

![Cliant detail](https://github.com/YaelGluskin/COVIDCare/blob/main/clientside/public/createDis.png)




