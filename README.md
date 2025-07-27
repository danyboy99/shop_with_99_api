# ShopWith99 E-commerce API

A comprehensive e-commerce REST API built with Node.js, Express, and MongoDB. This API provides complete functionality for an online shopping platform including user authentication, product management, shopping cart operations, and integrated payment processing.

## 🚀 Features

- **User Management**

  - User registration and authentication
  - JWT-based authorization
  - User profile management
  - Password hashing with bcrypt

- **Admin Panel**

  - Admin registration and authentication
  - Product management (CRUD operations)
  - Order management

- **Product Management**

  - Create, read, update, delete products
  - Image upload with Cloudinary integration
  - Product categorization
  - Product search and filtering

- **Shopping Cart**

  - Add products to cart
  - Update product quantities
  - Remove products from cart
  - Cart persistence for logged-in users

- **Payment Processing**
  - Flutterwave payment integration
  - Secure payment processing
  - Payment verification
  - Order tracking

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with JWT and Local strategies
- **File Upload**: Multer with Cloudinary integration
- **Payment**: Flutterwave API
- **Validation**: Validator.js
- **Security**: bcrypt for password hashing
- **Environment**: dotenv for configuration

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- MongoDB database
- Cloudinary account (for image uploads)
- Flutterwave account (for payments)

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/shopwith99.git
   cd shopwith99
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   # Database
   DB_url=mongodb://localhost:27017/shopwith99

   # JWT Secret
   jwt_secret=your_jwt_secret_key_here

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Flutterwave Configuration
   FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
   FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key

   # Server Configuration
   PORT=8000
   ```

4. **Start the application**

   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:8000`

## 📚 API Documentation

### Base URL

```
http://localhost:8000
```

### Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### User Endpoints

#### Register User

```http
POST /user/signup
Content-Type: application/json

{
  "fullname": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "password2": "password123",
  "address": "123 Main St, City"
}
```

#### Login User

```http
POST /user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile

```http
GET /user/profile
Authorization: Bearer <token>
```

### Admin Endpoints

#### Register Admin

```http
POST /admin/signup
Content-Type: application/json

{
  "fullname": "Admin User",
  "email": "admin@example.com",
  "password": "adminpass123"
}
```

#### Login Admin

```http
POST /admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "adminpass123"
}
```

#### Get Admin Profile

```http
GET /admin/profile
Authorization: Bearer <admin_token>
```

### Product Endpoints

#### Create Product (Admin Only)

```http
POST /admin/createproduct
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "name": "Product Name",
  "category": "Electronics",
  "price": 299.99,
  "about": "Product description",
  "image": <file>
}
```

#### Update Product (Admin Only)

```http
POST /admin/updateproduct
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Updated Product Name",
  "category": "Electronics",
  "price": 349.99,
  "about": "Updated description"
}
```

#### Delete Product (Admin Only)

```http
POST /admin/deleteproduct
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "id": "product_id_here"
}
```

### Cart Endpoints

#### Add Product to Cart

```http
POST /cart/add/:productId
Authorization: Bearer <token>
```

#### Get User's Cart

```http
GET /cart/
Authorization: Bearer <token>
```

#### Reduce Product Quantity in Cart

```http
POST /cart/reduce/:productId
Authorization: Bearer <token>
```

#### Remove Product from Cart

```http
POST /cart/remove/:productId
Authorization: Bearer <token>
```

### Checkout Endpoints

#### Initiate Payment

```http
POST /checkout/initiate
Authorization: Bearer <token>
Content-Type: application/json

{
  "card_number": "4187427415564246",
  "card_cvv": "828",
  "card_exp_month": "09",
  "card_exp_year": "32",
  "email": "user@example.com",
  "name": "John Doe",
  "address": "123 Main St",
  "card_pin": "3310"
}
```

#### Validate Payment

```http
POST /checkout/validate
Authorization: Bearer <token>
Content-Type: application/json

{
  "otp": "12345",
  "flw_ref": "flutterwave_reference"
}
```

#### Verify Payment

```http
POST /checkout/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "transaction_id": "transaction_id_here"
}
```

## 📁 Project Structure

```
shopwith99/
├── config/
│   ├── keys.js              # Configuration keys
│   └── productMulter.js     # Multer configuration for file uploads
├── controller/
│   ├── admin.js             # Admin controller functions
│   ├── cart.js              # Cart controller functions
│   ├── checkout.js          # Payment controller functions
│   ├── product.js           # Product controller functions
│   └── user.js              # User controller functions
├── model/
│   ├── admin.js             # Admin database model
│   ├── cart.js              # Cart database model
│   ├── order.js             # Order database model
│   ├── product.js           # Product database model
│   └── user.js              # User database model
├── route/
│   ├── admin.js             # Admin routes
│   ├── cart.js              # Cart routes
│   ├── checkout.js          # Checkout routes
│   ├── product.js           # Product routes
│   └── user.js              # User routes
├── validation/
│   ├── adminRegister.js     # Admin registration validation
│   ├── initiatePayment.js   # Payment initiation validation
│   ├── isEmpty.js           # Empty field validation utility
│   ├── login.js             # Login validation
│   ├── product.js           # Product validation
│   ├── userRegister.js      # User registration validation
│   ├── validatePayment.js   # Payment validation
│   └── validationText.js    # Text validation utilities
├── productimage/            # Uploaded product images
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
├── passport.js             # Passport authentication configuration
├── server.js               # Main application entry point
└── README.md               # Project documentation
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

| Variable                 | Description                 | Required |
| ------------------------ | --------------------------- | -------- |
| `DB_url`                 | MongoDB connection string   | Yes      |
| `jwt_secret`             | Secret key for JWT tokens   | Yes      |
| `CLOUDINARY_CLOUD_NAME`  | Cloudinary cloud name       | Yes      |
| `CLOUDINARY_API_KEY`     | Cloudinary API key          | Yes      |
| `CLOUDINARY_API_SECRET`  | Cloudinary API secret       | Yes      |
| `FLUTTERWAVE_PUBLIC_KEY` | Flutterwave public key      | Yes      |
| `FLUTTERWAVE_SECRET_KEY` | Flutterwave secret key      | Yes      |
| `PORT`                   | Server port (default: 8000) | No       |

## 🚦 Response Format

All API responses follow this format:

### Success Response

```json
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response

```json
{
  "status": "failed",
  "error": "Error message here"
}
```

## 🧪 Testing

You can test the API endpoints using tools like:

- **Postman**: Import the API endpoints and test them
- **cURL**: Use command line to test endpoints
- **Thunder Client**: VS Code extension for API testing

### Example cURL Request

```bash
# Register a new user
curl -X POST http://localhost:8000/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "password2": "password123",
    "address": "123 Main St"
  }'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Danilo99**

- Email: your-email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Express.js team for the excellent web framework
- MongoDB team for the database
- Flutterwave for payment processing
- Cloudinary for image management
- All contributors and users of this project

---

**Happy Coding! 🚀**
