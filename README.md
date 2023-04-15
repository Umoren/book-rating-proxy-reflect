# Book Rating App with Proxies & Reflect

This repository contains a backend application that demonstrates the power of JavaScript Proxies and Reflect API through a simple book rating system. The application features user authentication and efficient data validation, providing a hands-on learning experience for developers looking to incorporate these advanced JavaScript concepts in their projects.

## Table of Contents

- [Book Rating App with Proxies \& Reflect](#book-rating-app-with-proxies--reflect)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)

## Features

- User registration and authentication
- Book creation and listing
- Book rating with validation and error handling using JavaScript Proxies and Reflect API

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

## Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/book-rating-proxy-reflect.git
```

2. Install dependencies:

```bash
cd book-rating-proxy-reflect
yarn install
```

3. Set up environment variables:

Create a `.env` file in the root directory of the project, and add the following variables:

```sh
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

4. Seed the database with sample data (optional):

```sh
npm run seed
```

## Usage

1. Start the application:

```sh
npm start
```

2. Use a REST client like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the API endpoints.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
