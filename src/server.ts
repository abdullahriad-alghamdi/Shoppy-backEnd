/*======= External Dependencies and Modules =======*/
import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'

/*======= Internal Modules or Files =======*/
// Configuration
import { dev } from './config'
import { connectDB } from './config/db'

// Middlewares
import { errorHandler } from './middlewares/errorHandler'
// import myLogger from './middlewares/logger'

// Routes
import productRoutes from './routes/productRoutes'
import categoryRoutes from './routes/categoryRoutes'
import orderRoutes from './routes/orderRoutes'
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import cookieParser from 'cookie-parser'

const app: Application = express()

// Use middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(myLogger)
app.use(cookieParser())

// Setup allowed origins for CORS
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
)

connectDB(); // connect mongo database

// Use routes
app.use('/public', express.static('public'))
app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)
app.use('/users', userRoutes)
app.use('/orders', orderRoutes)
app.use('/auth', authRoutes)

// Default route
app.get('/', (req, res) => {
  res.send(
    'Welcome to our E-commerce API to use this API please refer to the documentation in our github repository'
  )
})

// Error handling
app.use((req, res, next) => {
  try {
    const error = new Error('Route not found')
    res.status(404)
    return next(error)
  } catch (error) {
    return next(error)
  }
})

app.use(errorHandler)

export default app
