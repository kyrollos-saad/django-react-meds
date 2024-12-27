## initial setup
- if the applications need to be served from nginx (otherwise skip this step and use `localhost:3000/8000`)
    - make sure that the `server_name` has the correct domain name for the frontend and backend `server` blocks
    - for local dev: add the domain names mapped to localhost in your OS's `hosts` like so: 
            - `127.0.0.1 front.pyramids-meds.com` and `127.0.0.1 back.pyramids-meds.com`

- build the image `docker-compose build`

- follow the instructions in the README.md files in the child directories

- run the containers `docker-compose up`

# environment variables
- `DB_USERNAME`: postgres default username
- `DB_PASSWORD`: postgres default password
- `DB_NAME`: postgres default database name