## Student Record API

Lightweight REST API built with Express.js to manage a list of student records. The service demonstrates typical CRUD operations (create, read, update, delete) using an in-memory data store, input validation, and helpful HTTP responses for client integrations.

### Tech Stack
- Node.js + Express 5
- Nodemon for local development reloading
- Postman collection for manual testing

## Getting Started
1. **Install dependencies**
	 ```bash
	 npm install
	 ```
2. **Set environment variables (optional)**
	 - Copy `.env.example` to `.env` (if you create one) and set `PORT=4000` or any available port.
3. **Run the service**
	 - Development with reloading: `npm run dev`
	 - Production build: `npm start`

The default port is 3000 when `PORT` is not defined.

## API Reference

### Health Check
| Method | Path | Description |
| --- | --- | --- |
| GET | `/` | Returns a short message confirming that the API is online. |

### Student Collection

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/students` | Retrieve all student records. |
| POST | `/api/students` | Create a new student record. |


### Individual Student

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/students/:id` | Retrieve a single student by numeric ID. |
| PUT | `/api/students/:id` | Replace a student record (all fields required). |
| PATCH | `/api/students/:id` | Partially update a student (at least one field required). |
| DELETE | `/api/students/:id` | Remove a student record. |

All endpoints respond with JSON in the shape `{ "data": ... }` on success or `{ "error"/"errors": ... }` on failure. Validation rules ensure that `name`, `email`, and `major` are non-empty strings and `age` is a positive number.

## Sample Responses
**List students**
```http
GET /api/students


## Postman Collection
A ready-to-use collection lives in `postman/Student_Record_API.postman_collection.json`. Import it into Postman (or the VS Code Postman extension) to hit each endpoint with preconfigured requests and sample bodies.

## Testing Strategy
- Use Postman collection or curl commands to verify each CRUD operation.
- Because the API uses an in-memory store, data resets on every server restart. This keeps the sample predictable for demos and exercises.

## Contributing
1. Create a feature branch.
2. Make changes with clear commits.
3. Open a pull request describing the updates and testing performed.

## Future Enhancements
- Persist students in a real database (MongoDB, PostgreSQL, etc.).
- Add automated tests (Jest + Supertest).
- Add pagination and filtering to the GET collection endpoint.

## Team Members

		Awalu Levison (Computer Scientist)

		Opeyemi (Computer Scientist)

		Abubakar Ibrahim Aruwa