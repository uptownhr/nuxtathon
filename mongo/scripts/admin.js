// admin.js
// creation of the admin user
db.createUser(
  {
    user: "nuxtathon",
    pwd: "nuxtvue",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)

// let's authenticate to create the other user
db.auth("nuxtathon", "nuxtvue" )