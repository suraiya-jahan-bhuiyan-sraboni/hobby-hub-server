
# 📘 HobbyHub Backend API Documentation

**Live Site:** https://hobby-hub-f64a3.web.app/


This is the HobbyHub backend.It is a RESTful API built with **Express.js** and **MongoDB Atlas**. It powers the HobbyHub application by managing hobby group data, including creation, retrieval, updating, and deletion of groups.

---

## 📁 Endpoints

### ✅ `GET /groups`

Fetch all groups or filter groups by user email.

#### Query Parameters:

* `email` (optional): Filters groups created by a specific user.

#### Example:

```
GET /groups?email=user@example.com
```

#### Response:

```json
[
  {
    "_id": "groupId123",
    "name": "Photography Lovers",
    "category": "Photography",
    "description": "A group for photography enthusiasts.",
    ...
  }
]
```

---

### ✅ `GET /groups/:id`

Fetch a single group by its unique ID.

#### URL Parameters:

* `id`: MongoDB ObjectId of the group

#### Example:

```
GET /groups/60c72b2f5f1b2c001c8d1234
```

---

### ✅ `POST /createGroup`

Create a new hobby group.

#### Body:

```json
{
  "name": "Book Club",
  "category": "Books",
  "description": "Group for book lovers",
  "maxMembers": 20,
  "startDate": "2025-06-01",
  "imageUrl": "https://example.com/image.jpg",
  "userName": "John Doe",
  "userEmail": "john@example.com"
}
```

#### Response:

```json
{
  "acknowledged": true,
  "insertedId": "60c72b2f5f1b2c001c8d5678"
}
```

---

### ✅ `PUT /updateGroup/:id`

Update an existing group by ID.

#### URL Parameters:

* `id`: MongoDB ObjectId of the group to update

#### Body:

```json
{
  "name": "New Name",
  "category": "Updated Category",
  "description": "Updated Description",
  "maxMembers": 25,
  "startDate": "2025-07-01",
  "imageUrl": "https://example.com/newimage.jpg",
  "userName": "Jane Doe",
  "userEmail": "jane@example.com"
}
```

---

### ✅ `DELETE /groups/:id`

Delete a group by its ID.

#### URL Parameters:

* `id`: MongoDB ObjectId of the group

#### Example:

```
DELETE /groups/60c72b2f5f1b2c001c8d5678
```

---

## 🛠 Development Setup

### 1. Install dependencies:
clone the project and install all dependencies.

```bash
npm install
```

### 2. Run the server:

```bash
node index.js
```

---

## 📦 Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* dotenv
* CORS

---
