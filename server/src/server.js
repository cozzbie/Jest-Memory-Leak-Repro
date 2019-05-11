/*
 * File: Server
 *
 * Description: This file imports the Express Application and binds it to a port. I do it this way because the supertest
 * library for Unit Testing expects an Express Application, not a server, upon which to perform testing.
 * 
 * Created by Jamie Corkhill on 04/24/2019
 */

require('./db/mongoose')();

const app = require('./app');

// Set the port dynamically;
const PORT = process.env.PORT;

// Bind the server to the development port or whatever was available in production.
app.listen(PORT, () => console.log(`Server is up on port ${PORT}.`));