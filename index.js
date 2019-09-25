const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// INIT MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ROUTES
app.use('/admision', require('./routes/admision'));

// LISTEN FOR CONNECTIONS
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));