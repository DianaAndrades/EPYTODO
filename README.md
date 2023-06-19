<h1>EpyTodo - TODO App API</h1>
<p>The EpyTodo project is a TODO App API built using Node.js. The project focuses on the backend development of the application, with the possibility of building a frontend as a bonus.</p>

<h2>Prerequisites</h2>
<p>Before compiling and running the EpyTodo program, make sure you have the following prerequisites installed:</p>
<ul>
    <li>Node.js</li>
    <li>MySQL server</li>
</ul>

<h2>Configuration</h2>
<p>Create a <code>.env</code> file in the root directory.</p>
<p>Add the following configuration variables to the .env file:</p>
<ul>
    <li><code>SERVER_PORT</code> : the port number on which the web server will listen (e.g., 3000)</li>
    <li><code>MYSQL_DATABASE</code> : the name of your MySQL database</li>
    <li><code>MYSQL_HOST</code> : the host address of your MySQL server</li>
    <li><code>MYSQL_USER</code> : the username for accessing the MySQL server</li>
    <li><code>MYSQL_ROOT_PASSWORD</code> : the password for the MySQL server</li>
    <li><code>SECRET</code> : a secret key for JSON Web Token (JWT) encryption</li>
</ul>

<h2>Installation</h2>
<p>To compile and run the EpyTodo program, follow these steps:</p>
<ol>
    <li>Clone the repository:</li>
    <pre><code>git clone https://github.com/your-username/epytodo.git</code></pre>
    <li>Navigate to the project directory:</li>
    <pre><code>cd epytodo</code></pre>
    <li>Install the dependencies:</li>
    <pre><code>npm install</code></pre>
    <li>Import the <code>epytodo.sql</code> file into your MySQL server:</li>
    <pre><code>cat epytodo.sql | mysql -u root -p</code></pre>
    <p>Note: Replace <code>root</code> with your MySQL username if different.</p>
</ol>

<h2>Usage</h2>
<p>First you need to run <code>Postman Agent</code> (download it if you haven't already) <a href="https://www.postman.com/downloads/postman-agent/">https://www.postman.com/downloads/postman-agent/</a>.</p>
<p>To start the EpyTodo server, run the following command:</p>
<pre><code>npm start</code></pre>
<p>The server will start running on <a href="http://localhost:3000">http://localhost:3000</a>.</p>

<h2>API Endpoints</h2>
<p>The following are the available API endpoints provided by the EpyTodo application:</p>
<table>
  <tr>
    <th>Route</th>
    <th>Method</th>
    <th>Protected</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>/register</td>
    <td>POST</td>
    <td>no</td>
    <td>Register a new user</td>
  </tr>
  <tr>
    <td>/login</td>
    <td>POST</td>
    <td>no</td>
    <td>Connect a user</td>
  </tr>
  <tr>
    <td>/user</td>
    <td>GET</td>
    <td>yes</td>
    <td>View all user information</td>
  </tr>
  <tr>
    <td>/user/todos</td>
    <td>GET</td>
    <td>yes</td>
    <td>View all user tasks</td>
  </tr>
  <tr>
    <td>/users/:id or :email</td>
    <td>GET</td>
    <td>yes</td>
    <td>View user information</td>
  </tr>
  <tr>
    <td>/users/:id</td>
    <td>PUT</td>
    <td>yes</td>
    <td>Update user information</td>
  </tr>
  <tr>
    <td>/users/:id</td>
    <td>DELETE</td>
    <td>yes</td>
    <td>Delete user</td>
  </tr>
  <tr>
    <td>/todos</td>
    <td>GET</td>
    <td>yes</td>
    <td>View all the todos</td>
  </tr>
  <tr>
    <td>/todos/:id</td>
    <td>GET</td>
    <td>yes</td>
    <td>View the todo</td>
  </tr>
  <tr>
    <td>/todos</td>
    <td>POST</td>
    <td>yes</td>
    <td>Create a todo</td>
  </tr>
  <tr>
    <td>/todos/:id</td>
    <td>PUT</td>
    <td>yes</td>
    <td>Update a todo</td>
  </tr>
  <tr>
    <td>/todos/:id</td>
    <td>DELETE</td>
    <td>yes</td>
    <td>Delete a todo</td>
  </tr>
</table>

<footer>
    <p>
    © 2023
    <a href="https://github.com/AlbaCande">Alba Candelario</a> -
    <a href="https://github.com/DianaAndrades">Diana Andrades</a>
    </p>
</footer>