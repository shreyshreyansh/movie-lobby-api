# Movie Lobby API

A RESTful API for a movie lobby in an OTT application. The lobby has a collection of movies with genre, rating, and streaming link.

## Prerequisites

- **Visual Studio Code**: [Download and install](https://code.visualstudio.com/)
- **Node.js**: [Download and install](https://nodejs.org/)
- **NPM**: Comes with Node.js, but you can update it using `npm install -g npm`
- **MongoDB**: [Download and install](https://www.mongodb.com/try/download/community)

## Project Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shreyshreyansh/movie-lobby-api.git
   cd movie-lobby-api
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Set up the environment variables:**

   Create a `.env` file in the root of the project and add the following:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/movie-lobby
   ```

## Starting the Application

1. **Compile and start the server:**

   ```bash
   npx ts-node src/server.ts
   ```

   The server will start on `http://localhost:3000`.

## Running Tests

1. **Run the tests:**

   ```bash
   npx jest
   ```

   This will run the unit and integration tests defined in the `__tests__` directory.

## API Documentation [https://documenter.getpostman.com/view/11180861/2sA3dvksjY]

### Endpoints

- **GET /api/movies**: List all movies

  - **Response:** Array of movie objects

    ```json
    [
      {
        "_id": "60d5ec49d1d2c72d6c441414",
        "title": "Inception",
        "genre": "Sci-Fi",
        "rating": 8.8,
        "streamingLink": "http://example.com/inception"
      },
      {
        "_id": "60d5ec49d1d2c72d6c441415",
        "title": "The Dark Knight",
        "genre": "Action",
        "rating": 9.0,
        "streamingLink": "http://example.com/thedarkknight"
      }
    ]
    ```

- **GET /api/movies/search?q={query}**: Search for a movie by title or genre

  - **Response:** Array of movie objects that match the query

    ```json
    [
      {
        "_id": "60d5ec49d1d2c72d6c441414",
        "title": "Inception",
        "genre": "Sci-Fi",
        "rating": 8.8,
        "streamingLink": "http://example.com/inception"
      }
    ]
    ```

- **POST /api/movies**: Add a new movie (requires "admin" role)

  - **Request:** Movie object (JSON)
    ```json
    {
      "title": "Inception",
      "genre": "Sci-Fi",
      "rating": 8.8,
      "streamingLink": "http://example.com/inception"
    }
    ```
  - **Response:** The added movie object

    ```json
    {
      "_id": "60d5ec49d1d2c72d6c441414",
      "title": "Inception",
      "genre": "Sci-Fi",
      "rating": 8.8,
      "streamingLink": "http://example.com/inception"
    }
    ```

- **PUT /api/movies/:id**: Update an existing movie (requires "admin" role)

  - **Request:** Updated movie object (JSON)
    ```json
    {
      "title": "Inception Updated",
      "genre": "Sci-Fi",
      "rating": 9.0,
      "streamingLink": "http://example.com/inception-updated"
    }
    ```
  - **Response:** The updated movie object

    ```json
    {
      "_id": "60d5ec49d1d2c72d6c441414",
      "title": "Inception Updated",
      "genre": "Sci-Fi",
      "rating": 9.0,
      "streamingLink": "http://example.com/inception-updated"
    }
    ```

- **DELETE /api/movies/:id**: Delete a movie (requires "admin" role)

  - **Response:** Success message

    ```json
    {
      "message": "Movie deleted"
    }
    ```
