To start this application first do "npm i" then do "npm start" and here we go, your applicaton is started.

This application fetches data from the aws server and show us the data according to button selected. Suppose if i select admin then list of admin should be visible and same with managers.

To create this application i have used ChakraUi(ui library), typescript and apollo client.

I have created a file named apolloClient.ts which link my application to the aws server which helps in fetching data.

GetListZellerCustomers.ts is a funcition which fetches the list of customers from server.

userInterface.ts file container interface of the data.

Main logic of application lies in App.tsx file.