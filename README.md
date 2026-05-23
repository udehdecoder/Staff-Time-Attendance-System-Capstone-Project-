# Capstone Project - Attendance & Leave Management API

This repository implements a simple attendance and leave management backend (Express + MongoDB).

## Contents

- `configs/` - configuration (database)
- `controllers/` - route handlers
- `middleware/` - auth and validation middleware
- `models/` - Mongoose models
- `routes/` - Express route definitions
- `utils/` - helper functions

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` with at least:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

3. Run the app:

```bash
npm start
```

## What I added

Detailed API routes and a testing process are documented in the `docs/` folder:

- [Routes Reference](docs/ROUTES.md)
- [Testing Process](docs/TESTING.md)

# capstoneProject22

Techsphere academy backend capstone project for group 22
