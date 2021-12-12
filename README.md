# Naruto API
🐱‍👤 API to display data for almost all characters in Naruto.

Built with :
- ExpressJS
- Mongoose
- MongoDB

## Installation
1. Clone the Repository
    ```bash
    git clone https://github.com/othneildrew/Best-README-Template.git
    ```

2. Install packages
    ```bash
    yarn install
    # or
    npm install
    ```

3. Setting `.env` file
    ```env
    PORT = 5000
    MONGODB_URI = local | cloud
    ```

4. Seed data to MongoDB
    This process is relatively long depending on your internet connection.
    ```bash
    yarn seed:json
    yarn seed:db
    ```

5. And run the API
    ```bash
    yarn start
    # or
    npm start
    ```

## Enpoints

### Get all characters
- Request
    - Method : `GET`
    - Endpoint : `/api/characters`
    - URL Params / Query : 
        - `q=[string]` : For full-text search (optional)
        - `skip=[number]` : For skip/offset data (optional)
        - `limit=[number]` : For limiting data (optional)
        - `sort=['ASC', 'DESC']` : For sorting data by the name (optional)

- Response
    - Success
        ```json
        {
            "total": "number",
            "previous":{
                "skip": "number"
            },
            "next":{
                "skip": "number"
            },
            "data": [
                {
                    "_id": "string",
                    "name": "string",
                    "picture": "string"
                }
            ]
        }
        ```


Thanks...🙏