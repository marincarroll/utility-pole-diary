## Setup
### Install dependencies
```
npm install
```

### Set up .env
- Create a new .env file
- Generate a new Prisma connection string
- Add the following lines to .env:
  ```
  PORT=[desired-port]
  DATABASE_URL="[connection-string]"
  ```
  
  
### Connect to Prisma database
```
npx prisma migrate dev --name init
npx prisma generate
```

### Load utility poles into database
To fetch utility pole data from Newton's GIS endpoint:
```
tsx fetch-poles.ts  
```

### Start server
```
tsx index.ts
```
