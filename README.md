# Shoppy-backEnd

This is the backend for Shoppy, an e-commerce platform. It is built with Node.js, TypeScript, and Express, and provides RESTful APIs for user authentication, product management, order processing, and more.

## Features

- User authentication (JWT-based)
- Product CRUD operations
- Category management
- Order management
- File uploads (Cloudinary integration)
- Error handling and logging
- Email notifications

## Project Structure

```
src/
  config/         # Database and app configuration
  controllers/    # Route handlers for business logic
  helper/         # Utility functions (JWT, email, cloudinary)
  middlewares/    # Express middlewares (auth, error, logger, upload, validation)
  models/         # Mongoose schemas for data models
  routes/         # API route definitions
  services/       # Service layer for business logic
  types/          # TypeScript type definitions
  utils/          # Utility functions
public/           # Static files (images, etc.)
api/              # API entry point
```

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abdullahriad-alghamdi/Shoppy-backEnd.git
   cd Shoppy-backEnd
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```
4. **Start the server:**
   ```bash
   npm start
   ```
   The server will run on the port specified in your configuration (default: 3000).

### Important: Local Development Changes

If you are running the project locally, make sure to:

- **Set up your own `.env` file:**

  - Use your local MongoDB connection string (e.g., `mongodb://localhost:27017/shoppy`)
  - Set a secure value for `JWT_SECRET` (any random string)
  - Use your own Cloudinary credentials, or comment out Cloudinary-related code if you do not need image uploads
  - For email features, use a test email account or disable email sending in development

- **Check the port configuration:**

  - By default, the server runs on port 3000. You can change this in your configuration or `.env` file if needed.

- **Review any hardcoded URLs or paths:**

  - Make sure any URLs (e.g., for API calls, static files) point to your local server during development.

- **Install all dependencies:**

  - Run `npm install` to ensure all required packages are available.

- **Start MongoDB locally:**
  - If using a local database, ensure MongoDB is running before starting the server.

#### CORS_ORIGIN and Access-Control-Allow-Origin

To enable your frontend to communicate with the backend during local development, set the `CORS_ORIGIN` variable in your `.env` file to the URL of your frontend (e.g., `http://localhost:3003`).

This value is used to set the `Access-Control-Allow-Origin` header, which controls which origins are allowed to access your API. If you change your frontend's port or domain, update `CORS_ORIGIN` accordingly.

Example:

```env
CORS_ORIGIN=http://localhost:3003
```

This ensures your backend accepts requests from your local frontend. No code changes are needed—just update the value in `.env`.

### Development

```bash
npm run dev
```

```bash
npm run build
```

## API Endpoints

- `/api/auth` - Authentication routes (register, login, etc.)
- `/api/products` - Product CRUD operations
- `/api/categories` - Category management
- `/api/orders` - Order management
- `/api/users` - User management

### Example Request

```http
GET /api/products
```

### Example Response

```json
[
  {
    "_id": "...",
    "name": "Product Name",
    "price": 100,
    "category": "Category Name"
    // ...other fields
  }
]
```

### Error Handling

Errors are returned in JSON format with an appropriate HTTP status code:

```json
{
  "error": "Resource not found"
}
```

## Testing

### Access-Control-Allow-Origin in Vercel

When deploying to Vercel, set the `CORS_ORIGIN` environment variable in your Vercel project settings to match your production frontend URL (e.g., `https://your-frontend-domain.com`).

This will set the `Access-Control-Allow-Origin` header for your deployed backend, just as it does locally. If you need to allow multiple origins, update your backend code to support that logic.

You can also configure custom headers in your `vercel.json` file if needed. Example:

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "https://your-frontend-domain.com" }
      ]
    }
  ]
}
```

This ensures your backend on Vercel only accepts requests from your specified frontend domain.

## Deployment

- The project includes a `vercel.json` for deployment on Vercel.
- Configure environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes
4. Push to your branch and open a pull request

## License

MIT

## Contact

For questions or support, open an issue on GitHub or contact me.
