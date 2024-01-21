# Solution for Novata Fullstack Engineer Challenge

## Running locally

How to run backend:
1. Navigate to `server` folder
2. Install dependencies: `npm i`
3. Create `.env` file by copy-pasting template `.env.example`
4. Start database in docker: `docker compose up` 
5. Populate database:
   - Apply DB migrations: `npm run db:migrate:dev`
   - Seed database: `npm run db:seed`
6. Start backend: `npm run start:dev`

How to run frontend:
1. Navigate to `client` folder
2. Install dependencies: `npm i`
3. Run frontend: `npm start`
