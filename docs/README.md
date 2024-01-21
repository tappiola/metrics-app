# Solution for Novata Fullstack Engineer Challenge

How to run backend:
1. Inside `server` folder:
   - Install dependencies: `npm i`
   - Create `.env` file by copy-pasting template `.env.example`
2. Start database in docker: `docker compose up` 
3. Populate database:
   - Navigate to `server` folder
   - Apply DB migrations: `npm run db:migrate:dev`
   - Seed database: `npm run db:seed`
4. Start backend: `npm run start:dev`

How to run frontend:
1. Navigate to `client` folder
2. Install dependencies: `npm i`
3. Run frontend: `npm start`
