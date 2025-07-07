# Scatch - Bag Shop E-commerce

A full-stack e-commerce application for selling bags with user and admin functionality.

## Features

- User authentication (register/login)
- Admin dashboard for product management
- Product catalog with sorting options
- Shopping cart functionality
- Checkout process

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templates, TailwindCSS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **Other**: Flash messages, Multer for file uploads

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   JWT_KEY=your_secret_key
   ```
4. Make sure MongoDB is running locally
5. Start the application:
   ```
   npm start
   ```
6. Access the application at `http://localhost:3000`

## Routes

### User Routes
- `/` - Home page with register/login
- `/shop` - Product catalog
- `/cart` - Shopping cart
- `/logout` - Log out user

### Admin Routes
- `/owners/auth` - Admin login page
- `/owners/dashboard` - Admin dashboard
- `/products/create` - Create new product

## Project Structure

- `models/` - Database schemas
- `routes/` - Express routes
- `views/` - EJS templates
- `middleware/` - Authentication middleware
- `config/` - Configuration files
- `public/` - Static assets
- `utils/` - Utility functions

## License

MIT