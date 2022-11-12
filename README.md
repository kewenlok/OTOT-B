# OTOT-B

# API

The backend API server is deployed on Google Cloud Run and is accessible at https://otot-b-cd-65vjwih74a-as.a.run.app.

A continuous deployment is achieved by using triggers on the Google Cloud Build platform and is triggered upon every push to the main branch.

The database server used for this task is deployed on MongoDB ATLAS with whitelist connection of `0.0.0.0/0` to allow all connections for simplicity.

- `GET /api/task/all` - Retrieve a list of added tasks
- `POST /api/task/add` - Create a new task
  - Expected data:
    ```json
    {
      "_id": "mongo_db_document_id",
      "task_name": "task_name",
      "is_completed": "is_completed"
    }
    ```
- `PUT /api/task/update` - Update task completion status with specified task ID
  - Expected data:
    ```json
    {
      "_id": "mongo_db_document_id",
      "task_name": "task_name",
      "is_completed": "is_completed"
    }
    ```
- `DELETE /api/task/delete` - Delete the user with the specified task ID
  - Expceted data:
    ```json
    {
      "_id": "mongo_db_document_id",
      "task_name": "task_name",
      "is_completed": "is_completed"
    }
    ```
