## initial setup
- follow the README.md in the parent directory
- run DB migrations `docker exec -it meds_backend python /app/manage.py migrate`


## make migrations
`docker exec -it meds_backend python /app/manage.py makemigrations`

note that migrations are tracked in git


## migrate
`docker exec -it meds_backend python /app/manage.py migrate`


# changin environment variables
- notes:
    - environment variables are in `.env` file
    - for the changes to reflect, container restart is needed `docker-compose restart`
`SECRET_KEY`: 32 bytes secret key used for encryption
`DEBUG`: [bool] debug status of the backend
`ALLOWED_HOSTS`: [list] whitelisted backend domains
`CSRF_TRUSTED_ORIGINS`: whitelisted frontend domains
`CORS_ALLOWED_ORIGINS`: whitelisted frontend domains
`DB_ENGINE`: db engine to use. ref: https://docs.djangoproject.com/en/stable/ref/settings/#engine
`DB_NAME`: database name (recommeded to match the db name configured in docker-compose)
`DB_USERNAME`: database username (recommeded to match the db name configured in docker-compose)
`DB_PASSWORD`: database password (recommeded to match the db name configured in docker-compose)
`DB_HOST`: database host
`DB_PORT`: database port
`TIME_ZONE`: timezone of the backend app