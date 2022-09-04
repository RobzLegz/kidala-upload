## Run

Set current directory to kidala-upload and run:

```uvicorn kebab.main:app --host localhost --port 8000```

Required env variables:
- MONGO_DB_LINK - mongodb database connection url
- SERVER_IP - hostname of the server, i.e. `http://localhost:8000` for dev or `https://cdn.kidala.life` for prod
- ADMIN_TOKEN - secret key used for jwt token signing
- SECRET_KEY - secret key used for jwt token signing
