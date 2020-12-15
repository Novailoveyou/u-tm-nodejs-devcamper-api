const express = require('express')
const dotenv = require('dotenv')
// const logger = require('./middleware/logger')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Connect to database
connectDB()

// Route files
const bootcamps = require('./routes/bootcamps')

const app = express()

// app.use(logger)

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// app.get('/', (req, res) => {
//   // res.send('Hello World')
//   // res.send('<h1>Hello World</h1>') // would work, since in Headers default Content-Type is text/html
//   // res.send({ name: 'Nover' }) // Express knows that we're sending JSON even tho it's a JS object
//   // res.json({ name: 'Nover' }) // Still better to use .json in case of sending JSON, epxress would format it to make it valid

//   // Send status
//   // res.sendStatus(400) // Better way below
//   // res.status(400).json({ success: false, error: 'Artificial error' })
//   res.status(200).json({ success: true, data: { id: 1 } }) // An example of what a successful response would look like
// })

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server's running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  server.close(() => process.exit(1))
})
