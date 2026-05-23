# API Routes Reference

This document lists the available API routes, expected inputs, middleware rules, and example responses.

Base path: `/api` (adjust if you mount differently in `index.js`).

---

## Auth

- POST `/auth/register`
  - Body: `{ name, email, password, role }`
  - Access: public
  - Response: `201` created with `user` object

- POST `/auth/login`
  - Body: `{ email, password }`
  - Access: public
  - Response: `200` with `{ token, user }`

---

## Attendance (`/attendance`)

- POST `/attendance/clock-in`
  - Middleware: `protect` (requires valid JWT), `checkLeaveDay` (no clock-in on Sundays/holidays), `checkAlreadyClockedIn` (blocks duplicate clock-in)
  - Body: none
  - Success: `201` with created attendance record
  - Errors: `400` if already clocked-in or it's a holiday/Sunday

- POST `/attendance/clock-out`
  - Middleware: `protect`
  - Body: none
  - Success: `200` with updated attendance (duration, timeOut)
  - Errors: `400` if user hasn't clocked-in or already clocked-out

- GET `/attendance/status`
  - Middleware: `protect`
  - Query: none
  - Success: `200` with today's status for the logged-in user

- GET `/attendance/summary`
  - Middleware: `protect`
  - Query params: `year` (optional), `month` (optional)
  - Success: `200` with monthly summary: workingDays, daysPresent, approvedLeave, publicHolidays, absentDays

- GET `/attendance/all`
  - Middleware: `protect`, `adminOnly` (admin/manager)
  - Query filters: `userId`, `date`, or `year`+`month`
  - Success: `200` list of records

---

## Leave (`/leave`)

- PATCH `/leave/request`
  - Body: `{ userId, startdate, enddate, purpose }`
  - Access: (currently no auth middleware applied in routes) — consider adding `protect` to require authenticated users
  - Success: `201` on creation
  - Errors: `401/403` for invalid input or duplicate request

- GET `/leave/getrequest/:userId`
  - Params: `userId`
  - Access: public in current code (consider `protect` + role checks)
  - Success: `200` with user's leave request

- GET `/leave/getallrequests`
  - Access: public in current code (consider restricting to admin)
  - Success: `200` list of requests

- PATCH `/leave/approveleave/:id`
  - Params: `id` (leave request id)
  - Body (optional): `{ startDate, endDate, status }`
  - Access: public in current code (should be admin/manager only)
  - Success: `200` updated leave request with `status: approved`

- PATCH `/leave/rejectleave/:id`
  - Params: `id`
  - Body (optional): `{ startDate, endDate }`
  - Access: public in current code (should be admin/manager only)
  - Success: `200` updated leave request with `status: rejected`

---

## Users (`/users`)

- GET `/users/admin-dashboard`
  - Middleware: `authMiddleware`, `roleMiddleware(["admin"])`
  - Access: admin only
  - Success: `200` JSON welcome message

- GET `/users/profile`
  - Middleware: `authMiddleware`
  - Access: authenticated user
  - Success: `200` with `req.user`

- GET `/users/`
  - Middleware: `authMiddleware`, `roleMiddleware(["admin"])`
  - Access: admin only
  - Success: `200` list of users (password excluded)

- GET `/users/:id`
  - Middleware: `authMiddleware`
  - Access: authenticated user (route returns any user's data; consider restricting)
  - Success: `200` single user

- PUT `/users/:id`
  - Middleware: `authMiddleware`, `roleMiddleware(["admin"])`
  - Body: `{ surname, othername, phoneNumber, email, role }`
  - Access: admin only for updates
  - Success: `200` updated user

- DELETE `/users/:id`
  - Middleware: `authMiddleware`, `roleMiddleware(["admin"])`
  - Access: admin only
  - Success: `200` deletion confirmation

---

## Notes & Recommendations

- Some routes currently lack `protect` or role checks (notably `/leave` routes). For security, add `protect` and role checks where appropriate.
- There are a few inconsistencies between how middleware is imported (`authMiddleware` vs. `{ protect, adminOnly }`) — review `middleware/authMiddleware.js` exports.
- Controllers and models may have naming/casing mismatches; run tests to identify runtime errors.
