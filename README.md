
# Staff Time & Attendance Management System

## Overview

The **Staff Time & Attendance Management System** is a backend REST API developed as a capstone project by Group 22 at Techsphere Academy.

The system helps organizations manage:

- Staff attendance tracking
- Clock-in and clock-out operations
- Leave request management
- User authentication and authorization
- Admin dashboard operations
- Employee management



# Project Information

### Project Name
Staff Time & Attendance Management System

### Repository Name
Staff-Time-Attendance-System-Capstone-Project

### Developed By
Group 22 – Techsphere Academy Backend Development Cohort



# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js



# Features

- User Authentication & Authorization
- Attendance Tracking
- Leave Request System
- Admin Dashboard
- Role-Based Access Control
- Monthly Attendance Summary
- User Management
- RESTful API Architecture


# Installation Guide

## Clone Repository

```bash
git clone <repository-url>
```

---

## Navigate Into Project Directory

```bash
cd Staff-Time-Attendance-System-Capstone-Project
```

---

## Install Dependencies

```bash
npm install
```

---

## Setup Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## Start Development Server

```bash
npm run dev
```

---

# Base URL

```bash
http://localhost:5000/api
```

---

# Authentication

The API uses JWT Authentication.

Protected routes require:

```bash
Authorization: Bearer your_token
```

---

# User Roles

| Role | Access |
|------|--------|
| Admin | Full Access |
| Staff/User | Limited Access |

---

# API ENDPOINTS

# 1. Authentication Routes

---

## Register User

### Endpoint

```http
POST /api/auth/register
```

### Description

Registers a new user into the system.

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "staff"
}
```

### Success Response

```json
{
  "status": "success",
  "message": "User registered successfully"
}
```

---

## Login User

### Endpoint

```http
POST /api/auth/login
```

### Description

Authenticates a registered user.

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "status": "success",
  "token": "jwt_token_here"
}
```

---

# 2. Attendance Routes

---

## Clock In User

### Endpoint

```http
POST /api/attendance/clock-in
```

### Authorization

Authenticated Users

### Request Body

```json
{
  "userId": "user_id"
}
```

### Success Response

```json
{
  "message": "Clock in successful"
}
```

---

## Clock Out User

### Endpoint

```http
POST /api/attendance/clock-out
```

### Authorization

Authenticated Users

### Request Body

```json
{
  "userId": "user_id"
}
```

### Success Response

```json
{
  "message": "Clock out successful"
}
```

---

## Get Attendance Status

### Endpoint

```http
GET /api/attendance/status/:userId
```

### Authorization

Authenticated Users

### Success Response

```json
{
  "status": "Present",
  "clockInTime": "08:00 AM"
}
```

---

## Get Monthly Attendance Summary

### Endpoint

```http
GET /api/attendance/summary/:userId
```

### Authorization

Authenticated Users

### Success Response

```json
{
  "totalDaysPresent": 20,
  "totalHoursWorked": "160 hours"
}
```

---

## Get All Attendance Records

### Endpoint

```http
GET /api/attendance/all
```

### Authorization

Admin Only

### Success Response

```json
{
  "status": "success",
  "data": []
}
```

---

# 3. Leave Management Routes

---

## Request Leave

### Endpoint

```http
POST /api/leave/request
```

### Authorization

Authenticated Users

### Request Body

```json
{
  "userId": "user_id",
  "startDate": "2026-05-01",
  "endDate": "2026-05-05",
  "purpose": "Medical leave"
}
```

### Success Response

```json
{
  "message": "Request successfully submitted"
}
```

---

## Get One Leave Request

### Endpoint

```http
GET /api/leave/request/:userId
```

### Authorization

Admin Only

### Success Response

```json
{
  "status": "success",
  "data": {}
}
```

---

## Get All Leave Requests

### Endpoint

```http
GET /api/leave/getallrequests
```

### Authorization

Admin Only

### Success Response

```json
{
  "status": "success",
  "data": []
}
```

---

## Approve Leave Request

### Endpoint

```http
PATCH /api/leave/approveleave/:id
```

### Authorization

Admin Only

### Request Body

```json
{
  "startDate": "2026-05-01",
  "endDate": "2026-05-05",
  "status": "approved"
}
```

### Success Response

```json
{
  "message": "Leave request approved successfully"
}
```

---

## Reject Leave Request

### Endpoint

```http
PATCH /api/leave/rejectleave/:id
```

### Authorization

Admin Only

### Request Body

```json
{
  "startDate": "2026-05-01",
  "endDate": "2026-05-05"
}
```

### Success Response

```json
{
  "message": "Leave request rejected successfully"
}
```

---

## Delete Leave Request

### Endpoint

```http
DELETE /api/leave/deleteleave/:id
```

### Authorization

Authenticated Users

### Success Response

```json
{
  "message": "Leave request deleted successfully"
}
```

---

# 4. User Management Routes

---

## Get All Users

### Endpoint

```http
GET /api/user
```

### Authorization

Admin Only

### Success Response

```json
{
  "status": "success",
  "data": []
}
```

---

## Get One User

### Endpoint

```http
GET /api/user/:id
```

### Authorization

Admin Only

### Success Response

```json
{
  "status": "success",
  "data": {}
}
```

---

## Update User

### Endpoint

```http
PUT /api/user/:id
```

### Authorization

Admin Only

### Request Body

```json
{
  "name": "Updated Name",
  "phoneNumber": "08012345678",
  "email": "updated@example.com",
  "role": "staff"
}
```

### Success Response

```json
{
  "message": "User updated successfully"
}
```

---

## Delete User

### Endpoint

```http
DELETE /api/user/:id
```

### Authorization

Admin Only

### Success Response

```json
{
  "message": "User deleted successfully"
}
```

---

## Admin Profile

### Endpoint

```http
GET /api/user/profile
```

### Authorization

Admin Only

### Success Response

```json
{
  "status": "success",
  "data": {}
}
```

---

## Admin Dashboard

### Endpoint

```http
GET /api/user/admin-dashboard
```

### Authorization

Admin Only

### Success Response

```json
{
  "totalUsers": 50,
  "presentToday": 42,
  "leaveRequests": 5
}
```

---

# Error Responses

## Unauthorized Access

```json
{
  "message": "Unauthorized access"
}
```

---

## Resource Not Found

```json
{
  "message": "Resource not found"
}
```

---

## Validation Error

```json
{
  "message": "Please provide all required fields"
}
```

---

# Suggested Future Improvements

- Email Notifications
- Payroll Integration
- QR Code Attendance
- Biometric Authentication
- Real-Time Monitoring
- File Upload Support
- Swagger API Documentation
- Unit Testing
- Integration Testing

---

# Collaborators (Group 22)

| Name | Email |
|------|--------|
| Udeh Uchechukwu | udehuchechukwu@gmail.com |
| Abubakr Sofiyyah | abubakrsofiyyah@gmail.com |
| Oluwasegun Akinyanmi | akinyanmisegun@gmail.com |
| Patrick Ighodalo | mrigpat10@gmail.com |
| Afolabi Yusuf | afolabiyusufolalekan@gmail.com |
| Oladimeji Rebecca | oladimejirebecca07@gmail.com |
| Chidinma Ogbonna | chidimmajanet01@gmail.com |
| Aina Oluwatobi Emmanuel | ainaoluwatobi3845@gmail.com |
| Marvel Chiamaka Uzonicha | umcunlimited@gmail.com |
| Kayode Owoseni | kayode.owoseni123@gmail.com |
| Simeon Ajani | simeonajani01@gmail.com |

---

# License

This project was developed for educational purposes as part of the Techsphere Academy Backend Development Capstone Project.

---

# Conclusion

The Staff Time & Attendance Management System provides an efficient backend solution for managing employee attendance, leave requests, and administrative operations.

The project demonstrates practical backend development concepts including:

- Authentication
- Authorization
- REST API Design
- Database Management
- Error Handling
- Role-Based Access Control
- Attendance Logic Implementation

---
