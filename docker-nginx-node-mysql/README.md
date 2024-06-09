# Full Cycle 3.0 Docker Challenge

This project is a challenge by the Full Cycle 3.0 course to use Docker to host a Node.js app with MySQL and Nginx. The application functions as a to-do list for people's names, meeting the challenge requirements.

## Project Structure

The `docker-compose.yaml` file defines three services:

- **app**: An Express.js application.
- **db**: A MySQL database.
- **nginx**: An Nginx server to route traffic.

Additionally, a bridge network is set up so the containers can communicate with each other. The database uses a volume to ensure data persists even if the container is stopped.

## Running the Project

To run the project, simply use:

```bash
docker compose up
```

The application will be accessible at http://localhost on port 80.

## Workaround for Database Connection Issue
The app service sometimes attempts to connect to the db service before it is fully up, causing errors. To address this, the following command is used to ensure the app waits for the database to be ready before starting:

```yaml
command: bash -c 'while !</dev/tcp/db/3306; do sleep 1; done; node index.js'
```
