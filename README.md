Simple plate number generation app.

1. setup a web server preferably NGinx to route all requests to the index.php file
Example: 
Use the following try_files directive:
    try_files  $uri $uri/ /index.php?$args;

2. Set up a MySQL database with the `export.sql` file included.
3. Rename the .env-default file in the `app` folder to `.env`
4. Set up database connection settings (username and password) in the `.env` file.
5. Run app.