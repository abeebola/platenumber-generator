Simple plate number generation app.

1. setup a web server preferably NGinx to route all requests to the index.php file
Example: 
Use the following try_files directive:
    try_files  $uri $uri/ /index.php?$args;

2. Set up a MySQL database with the `export.sql` file included.
3. Run app.