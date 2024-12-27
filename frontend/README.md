## initial setup
- follow the README.md in the parent directory


## build
- in production mode, if the code changes, the production build has to be rebuilt `docker exec -it meds_frontend npm run build`

# environment variables
- `GENERATE_SOURCEMAP`: controls whether to generate sourcemap during build or not (recommended: `false`)
- `REACT_APP_BACKEND_BASE_URL`: base url for the backend