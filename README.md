# React-Express-MySQL

Learn React with Express and MySQL to build Backend and Database

- [React and Express Tutorial](https://www.youtube.com/watch?v=v0t42xBIYIs)
- [React + NodeJS + SQL](https://www.youtube.com/watch?v=HPIjjFGYSJ4&t=1157s)

### Connect database error

Error mag is `Client does not support authentication protocol requested by server`

use this query

`alter user 'USER'@'localhost' identified with mysql_native_password by 'PASSWORD'`

### Fetch data from database

code in /components/invoice.js
GET Method is not problem,

To do POST Method i have to read code from this [StackOverflow : ReactJS and Node — Error 400 bad request](https://stackoverflow.com/questions/49234707/reactjs-and-node-error-400-bad-request), it has throw error too.

in POST Method for the first time can't to fetch data because it connet to http://localhost:3000/api/...,
then i edit fetch function to connet to http://localhost:5000/api/... it's doesn't work because in blocked,
to solve this i must to use "CORS". (read from [StackOverflow : Access to XMLHttpRequest at '…' from origin 'localhost:3000' has been blocked by CORS policy](https://stackoverflow.com/questions/57009371/access-to-xmlhttprequest-at-from-origin-localhost3000-has-been-blocked))

`npm install cors --save`

`var cors = require('cors')`

`app.use(cors()) // Use this after the variable declaration`

### Todo Task

#### Usecase Keep Slip into Blockchain

- Connect to Blockchain and Smart Contract to save data
- Redirect after insert data to database
- Catch Error
- Test
- Combine Code with Usecase Get data from Blockchain (Create new project)
