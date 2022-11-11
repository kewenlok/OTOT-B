# OTOT-B

# API

- `GET /task/all` - Retrieve a list of added tasks
- `POST /task/add` - Create a new task
  - Expected data:
    ```json
    {
      "_id": "mongo_db_document_id",
      "task_name": "task_name",
      "is_completed": "is_completed"
    }
    ```
- `PUT /task/update` - Update task completion status with specified task ID
  - Expected data (json):
    ```json
    {
      "_id": "mongo_db_document_id",
      "task_name": "task_name",
      "is_completed": "is_completed"
    }
    ```
- `DELETE /task/delete` - Delete the user with the specified task ID
  - Expceted data (json):
    ```json
    {
      "_id": "mongo_db_document_id",
      "task_name": "task_name",
      "is_completed": "is_completed"
    }
    ```
