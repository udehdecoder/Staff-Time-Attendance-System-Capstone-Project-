# Testing Process

This document describes how to manually and automatically test all routes and the rules (middleware) associated with them.

## Manual testing (Postman / HTTP client)

1. Import or create a new Postman collection named `CapstoneProject22`.
2. Add an environment with `BASE_URL` (e.g. `http://localhost:5000/api`) and `AUTH_TOKEN`.

3. Test Auth flows first (these produce tokens):
   - POST `{{BASE_URL}}/auth/register` — create test users (admin and staff)
   - POST `{{BASE_URL}}/auth/login` — login and save returned `token` as `AUTH_TOKEN` (use `Bearer {{AUTH_TOKEN}}` in `Authorization` header)

4. Attendance routes (use `Authorization: Bearer {{AUTH_TOKEN}}`):
   - POST `/attendance/clock-in` — verify success when not on Sunday/holiday and not already clocked-in
   - POST `/attendance/clock-out` — verify can only clock-out after clock-in
   - GET `/attendance/status` — check returned status values: `not-clocked-in`, `active`, `completed`
   - GET `/attendance/summary?year=YYYY&month=M` — verify counts match created records
   - GET `/attendance/all` — test with an admin token and query params

5. Leave routes:
   - PATCH `/leave/request` — create leave requests (test validation for missing fields)
   - GET `/leave/getrequest/:userId` — retrieve a user's request
   - PATCH `/leave/approveleave/:id` and `/leave/rejectleave/:id` — test transitions; use admin account (recommend locking routes to admin)

6. User routes:
   - GET `/users/` — admin only
   - GET `/users/:id` — authenticated
   - PUT `/users/:id` and DELETE `/users/:id` — admin only

7. For each endpoint test edge cases and error responses (missing fields, invalid token, duplicate operations).

## Automated testing (suggested)

I recommend using Jest + Supertest for endpoint tests. Steps to add quick automated tests:

1. Install dev dependencies:

```bash
npm install --save-dev jest supertest cross-env
```

2. Add test script to `package.json`:

```json
"scripts": {
  "test": "cross-env NODE_ENV=test jest --runInBand --detectOpenHandles"
}
```

3. Create `tests/` folder and add tests per route group, e.g. `tests/auth.test.js`, `tests/attendance.test.js`.

4. Minimal test structure (example `tests/auth.test.js`):

```js
const request = require("supertest");
const app = require("../index"); // adapt if your server export differs

describe("Auth", () => {
  it("registers a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "T", email: "t@example.com", password: "pass123" });
    expect(res.statusCode).toBe(201);
  });
});
```

5. Mock or use a test database. Set `NODE_ENV=test` and use a separate MongoDB URI for tests (`MONGO_URI_TEST`). Use an in-memory MongoDB (mongodb-memory-server) for faster isolation.

6. Tests to cover middleware rules:
   - Auth middleware: request protected route without token -> expect 401
   - Role middleware: call admin-only route with staff token -> expect 403
   - Attendance middleware: try clock-in on Sunday or public holiday -> expect 400
   - Duplicate clock-in -> expect 400

## Suggested Test Matrix (priority)

- Auth: register, login, invalid credentials
- Attendance: clock-in, duplicate clock-in, clock-out without clock-in, status, summary
- Leave: request creation, approve/reject flows, invalid inputs
- Users: admin-only access, get/update/delete flows

## Running tests

```bash
npm test
```

## Next steps I can take

- Scaffold a Postman collection file (`.json`) for import.
- Add Jest + Supertest scaffold and one CI-friendly smoke test.
