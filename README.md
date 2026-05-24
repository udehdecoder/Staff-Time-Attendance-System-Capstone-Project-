# capstoneProject22 (Staff Time and Attendance System)
Techsphere academy backend capstone project for group 22





<Routes and their corresponding requests and result>

<!-- leave route -->

request leave route (localhost:5000/api/leave/request)
    PARAMETERS {userId, startdate, endate, purpose }
    result (status = ok).message("request successfully submited")


get one leave request (localhost:5000/api/leave/request/userId)
    parameters none, Get request
    ONLY ADMIN AUTHORIZED ROUTE



get all leave request  (localhost:5000/api/leave/getallrequests/)
    parameters none, Get request
    ONLY ADMINS AUTHORIZED ROUTE


approve leave request (localhost:5000/api/leave/approveleave/id)
    parameters {startDate, endDate, status}, PATCH request
    ONLY ADMINS AUTHORIZED ROUTE


reject leave request (localhost: 5000/api/leave/rejectleave/id)
    parameter {startDate, endDate} PATCH REQUEST
    ADMIN AUTHORIZED ROUE ONLY


delete leave request  (localhost: 5000/api/leave
deleteleave/id)
    parameter none, delete route
    ALL USERS AUTHORIZED ROUTE





<!-- attendance route -->
clock in user (localhost:5000/api/attendance/clock-in)
    parameters {userId}, POST request 
    ALL USERS AUTHORIZED ROUTE

clock out user (localhost:5000/api/attendance/clock-out)
    paramters {userId}, POST request 
    ALL USERS AUTHORIZED ROUTE

get current attenadance status (localhost:5000/api/attendance/status/:userId)
    parameters none, GET request 
    ALL USERS AUTHORIZED ROUTE


get monthly summary (localhost:5000/api/attendance/summary/:userId)
    parameters none, GET request 
    ALL USERS AUTHORIZED ROUTE


get all attendance (localhost:5000/api/attendance/all)

    parameters none, GET request 
    ONLY ADMIN AUTHORIZED ROUTE



<!-- auth route -->
register a new user (localhost:5000/api/auth/register)
    parameter {name, email, password, roles}, POST request
    ALL USERS AUTHORIZED ROUTE


login a regsitered user (localhost:5000/api/auth/login)
    parameter {email, password}, POST request
    ALL USERS AUTHORIZED ROUTE



<!-- user route -->

get all users (localhost:5000/api/user)
    parameter none, GET request 
    ONLY ADMIN AUTHORIZED ROUTE 

get one user(worker) (localhost:5000/api/user/:id)
    parameter none, GET request
    ONLY ADMIN AUTHORIZED ROUTE

update user (localhost:5000/api/user/:id)
    parameter {name, phoneNumber, email, role}, PUT request
    ONLY ADMIN AUTHORIZED ROUTE

delete user (localhost:5000/api/user/:id)
    parameter none, DELETE request
    ONLY ADMIN AUTHORIZED ROUTE


admin profile (localhost:5000/api/user/profile)
    paramter none, GET request 
    ONLY ADMIN AUTHORIZED ROUTE


Admin dashboard display (localhost:5000/api/user/admin-dashbaord)
    parameter none, GET request 
    ONLY ADMIN AUTHORIZED ROUTE






<collaborators (group 22 capstone project "Staff Time and Attendance System")>

1. Udeh Uchechukwu
 udehuchechukwu@gmail.com

2. Abubakr Sofiyyah 
    Abubakrsofiyyah@gmail.com

3. Oluwasegun Akinyanmi 
    akinyanmisegun@gmail.com

4. Patrick Ighodalo
    mrigpat10@gmail.com

5. Afolabi Yusuf 
    afolabiyusufolalekan@gmail.com

6. Oladimeji Rebecca 
    Oladimejirebecca07@gmail.com

7. Chidinma Ogbonna
    Chidimmajanet01@gmail.com

8. Aina Oluwatobi Emmanuel
    ainaoluwatobi3845@gmail.com

9. Marvel Chiamaka Uzonicha
    umcunlimited@gmail.com

10. Kayode Owoseni
    kayode.owoseni123@gmail.com

11. Simeon Ajani
    simeonajani01@gmail.com
