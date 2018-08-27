# Realtor
Create a basic realtor web site that will allow a secured user to Add, Edit and Delete a house

## Local Development

### Run Locally
In order to run program: 

1. npm install
2. Start mongodb locally
3. Set Private Key: 
(In order to test key, I understand this is not standard practice)
export realtor_jwtPrivateKey=mySecretKey
4. Run npm start
5. App running on localhost:5000/
6. Must manually set user permission 'isAdmin' to true in database if you want to manipulate data, defaults to false


### Register a User
    
- POST 'users/'

Param         |  Type   |  In     |  Required? |  Description
---           |  ---    |  ---    |  ---       |  ---  
Name          | String  | Body    | True       | User Name
Email         | String  | Body    | True       | User Email
Password      | String  | Body    | True       | User Password


### Obtain User Information
    
- Get 'users/me'

Param         |  Type   |  In       |  Required? |  Description
---           |  ---    |  ---      |  ---       |  ---  
Token         | String  | Header    | True       | Authentication 
_id           | String  | user._id  | True       | User unique id


### Create a new home listing
    
- Get 'users/me'

Param         |  Type   |  In       |  Required? |  Description
---           |  ---    |  ---      |  ---       |  ---  
Token         | String  | Header    | True       | Authentication 
street1       | String  | Body      | True       | 1st street address
street2       | String  | Body      | False      | 2nd street address
city          | String  | Body      | True       | City 
State         | String  | Body      | True       | State
Zipcode       | String  | Body      | True       | Zipcode
Neighborhood  | String  | Body      | False      | Neighborhood
SalesPrice    | Number  | Body      | True       | Sales price of the house
Bedrooms      | Number  | Body      | True       | Number of bedrooms
Photos        | Array   | Body      | False      | Photos of the house
Bathrooms     | Number  | Body      | True       | Number of bathrooms
Garage Size   | Number  | Body      | False      | Size of the garage in feet
Square Feet   | Number  | Body      | True       | Size of property in feet
Lot Size      | Number  | Body      | False      | Size of lot in feet
Description   | String  | Body      | False      | Description of the house being sold
