# capstoneProject22
Techsphere academy backend capstone project for group 22





Routes and their corresponding requests and result

leave route

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


attendance route






user route






