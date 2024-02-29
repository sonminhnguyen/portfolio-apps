exports.seed = function (knex) {
  // Deletes ALL existing entries
  knex
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "admin",
          avatar: "",
          password:
            "$2b$10$CKDSGm9BC/E7f.lvxv2By.UnxuV8n4AWj/plBLJAYFeFLUNmthpKO",
          email: "sonnguyen@gmail.com",
          telephone: "+78934582732",
          role: "admin",
        },
        {
          username: "dev",
          avatar: "",
          password:
            "$2b$10$37AQlecTPz.hFKGRYRfFueGBiFYMiZitazF4gsI71t6MXwy2JjaG2",
            avatar: "",
          email: "devUser@gmail.com",
          telephone: "+72315468512",
          role: "teacher",
        },
        {
          username: "Isaf",
          avatar: "",
          password:
            "$2b$10$hddIs.DBypp78tqtsMJVtOszWdYuOsFLVbi9BcdQOg9Yg9WIySlge",
          email: "Isaf@gmail.com",
          telephone: "+79844562485",
          role: "user",
        },
      ]);
    });
};
