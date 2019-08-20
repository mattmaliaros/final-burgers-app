# final-burgers-app

The burgers app uses Node, Handlebars, MySQL, and Express to create a burger logger as a web application.  This application creates new burgers waiting to be eaten or sent to an already devoured pile.  The user submits a burger on the bottom of the page specifying whether it has been eaten or not using a radio button.  All of the burgers created are stored into a MySQL database with a boolean value of "devoured" set to true if eaten and false if the burger is waiting to be eaten.
Here is a snippet of the database creation and inserted default burgers:
``CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
INSERT INTO burgers (name, devoured) VALUES ('Cheeseburger', true);
INSERT INTO burgers (name, devoured) VALUES ('Hamburger', true);
INSERT INTO burgers (name, devoured) VALUES ('Bacon Burger', false);
``
The project uses Handlebars to create web pages.  The index.Handlebars page uses helper functions to determine where the burgers will be placed on our web page.
Here is a snippet of the helper functions used to create our view:
``<h1>Burgers!</h1>

<h2>Burgers that are not devoured!</h2>

<ul>
  {{#each burgers}}
    {{#unless devoured}}
      {{> burgers/burger-block devour=true}}
    {{/unless}}
  {{/each}}
</ul>

<h2>Burgers that are devoured!</h2>

<ul>
  {{#each burgers}}
    {{#if devoured}}
      {{> burgers/burger-block devour=false}}
    {{/if}}
  {{/each}}
</ul>
``
We use express to create routes and logic within them to access JSON objects, display our homepage, and create/update/delete our JSON objects.
Here is a snippet of a simple get method to display all burgers in our database.
``router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
``

The burgers project has uses the ORM technique to query and manipulate information from our database.  As you can see above, the "selectAll" function is creating a query to select all information from the burgers table.  The ORM contains all the functions necessary to query our table within the database.
Here is a snippet of the "selectAll" function from the ORM file:
`` var orm = {
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  ``
  Finally, the organization of all the files and folders are created as using an MVC architecture.  This is crucial for organization; the files need to know where to require and export our information.
  Here is the structure of our files/folders:
  ``
.
├── config
│   ├── connection.js
│   └── orm.js
│ 
├── controllers
│   └── burgers_controller.js
│
├── db
│   ├── schema.sql
│   └── seeds.sql
│
├── models
│   └── burger.js
│ 
├── node_modules
│ 
├── package.json
│
├── public
│   └── assets
│       ├── css
│       │   └── burger_style.css
│       └── img
│           └── burger.png
│   
│
├── server.js
│
└── views
    ├── index.handlebars
    └── layouts
        └── main.handlebars
``
