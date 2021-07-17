<h1 align='center'>GoBarber's Backend</h1>

<div align='center'>
  <a href='#-show-your-support'>Show your support</a> •
  <a href='#-how-to-run'>How To Run</a> •
  <a href='#-how-to-test'>How To Test</a> •
  <a href='#-contributing'>Contributing</a> •
  <a href='#-technologies-used'>Technologies Used</a> •
  <a href='#-license'>License</a>
</div>

<h4 align='center'>Made with ❤️ by Alvaro Israel 👏🏻 <a href='https://www.linkedin.com/in/alvaroisraeldesenvolvedor/'>
Get in Touch!</a></h4>

## ⭐️ Show your support

Hit the ⭐️ button if you like this project!

## 💻 How to Run

To clone and run this application, you'll need [Git](https://git-scm.com)
and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/AlvaroIsrael/gobarber-app.git

# Go into the main app folder
$ cd gobarber-app

# Go into backend folder
$ cd gobarber-backend

# Install dependencies
$ yarn install

# Install the 3 databases needed to run this program. See 'How To' below.

# Run the app
$ yarn start
```

This application will require 3 databases in order to work properly:

- [MongoDb](https://www.mongodb.com/)
- [PostgreSql](https://www.postgresql.org/)
- [Redis](https://redis.io/)

Frist you will need to install those 3 databases on your local machine and, after that, configure all 3 databases using
both ```.env``` and ```ormconfig.json``` files which can be located in the ```src``` folder. The installation of those
databases can be done in a variety of ways, but I personally believe the simplest one is to use docker. So I will
provide a brief guide on how to install then using docker and bitnami images.

Frist, download and install docker in your local machine:

- [Docker](https://www.docker.com/)

Once docker is up and running, you can them install each database service using the following comands:

- [MongoDb](https://github.com/bitnami/bitnami-docker-mongodb)

```bash
docker run -d --name mongodb -e MONGODB_DATABASE=myLegendaryDatabase -p 99999:55555 bitnami/mongodb:latest

# The flag '--name' represents the name of your container, so in this case '--name mongodb' will name the container 'mongodb'.
# myLegendaryDatabase - Can be any string without quotes representing the name of your database.
# The flah '-p' maps the container port 99999 to your local machine port number 55555.
# You can choose whenever value you want, but keep in mind the ports must be available and default mongodb port is 27017.

# After that you can simply run the container by typing:
docker start mongodb
```

- [PostgreSql](https://github.com/bitnami/bitnami-docker-postgresql)

```bash
docker run -d --name postgresql -e POSTGRESQL_PASSWORD=mySuperSecurePassword -e POSTGRESQL_USERNAME=dataBaseUserName -e POSTGRESQL_DATABASE=myLegendaryDatabase -p 88888:44444 bitnami/postgresql:latest

# The flag '--name' represents the name of your container, so in this case '--name postgresql' will name the container 'postgresql'.
# dataBaseUserName - Can be any string without quotes representing the login to your database.
# mySuperSecurePassword - Can be any string without quotes representing the password to your database.
# myLegendaryDatabase - Can be any string without quotes representing the name of your database.
# The flah '-p' maps the container port 88888 to your local machine port number 44444.
# You can choose whenever value you want, but keep in mind the ports must be available and default postgresql port is 5432.

# After that you can simply run the container by typing:
docker start postgresql
```

- [Redis](https://github.com/bitnami/bitnami-docker-redis)

```bash
docker run -d --name redis-server -e REDIS_PASSWORD=mySuperSecurePassword -p 77777:33333 bitnami/redis:latest

# The flag '--name' represents the name of your container, so in this case '--name redis-server' will name the container 'redis-server'.
# mySuperSecurePassword - Can be any string without quotes representing the password to your database.
# The flah '-p' maps the container port 77777 to your local machine port number 33333.
# You can choose whenever value you want, but keep in mind the ports must be available and default redis port is 6379.

# After that you can simply run the container by typing:
docker start redis-server
```

Once that is done you will need to configure those databases in the application by changing the following files:

- ```ormconfig.json.example``` which should be renamed to ```ormconfig.json```

After that the following fields must be changed according to the databases you just installed and set up.

```json
[
  {
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "post": 44444,
    "username": "dataBaseUserName",
    "password": "mySuperSecurePassword",
    "database": "myLegendaryDatabase",
    "entities": [
      "./src/modules/**/infra/typeorm/entities/*.ts"
    ],
    "migrations": [
      "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
  },
  {
    "name": "mongo",
    "type": "mongodb",
    "host": "localhost",
    "port": 55555,
    "database": "myLegendaryDatabase",
    "useUnifiedTopology": true,
    "entities": [
      "./src/modules/**/infra/typeorm/schemas/*.ts"
    ]
  }
]
```

- ```.env.example``` which should be renamed to ```.env```

```dotenv
# Redis
REDIS_HOST=localhost
REDIS_PORT=33333
REDIS_PASSWORD=mySuperSecurePassword
```

Keep in mind the ```.env ``` file also contains another list of variables that need to be filled up for the application
to run locally:

```dotenv
# Application
APP_SECRET=anyStringCanBePutHere
APP_WEB_URL=http://localhost:3000
APP_API_URL=http://localhost:3333
PORT=3333

# CDN
STORAGE_DRIVER=disk
```

After you have all databases up and running, you will need to run the migrations to create the tables in those
databases. This can be done by running the following command:

```bash
# Run the migrations
$ yarn typeorm migration:run
```

## 🎯 How to Test

```bash
# Open up terminal and run
$ yarn test
```

Code coverage html report can be found at:

```
./gobarber-backend/coverage/lcov-report/index.html
```

## 🤝 Contributing

Fork this repository: https://github.com/AlvaroIsrael/gobarber-app/fork

```bash
# Create your feature branch:
$ git checkout -b feature/myAewsomeFeature

# Commit your changes:
$ git commit -m 'feat: Added some new aewsomeFeature'

# Push to the branch:
$ git push origin feature/myAewsomeFeature

# Create a new pull request
```

- Read more about commits in [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Read more about how to open a Pull Request from
  [GitHub official documentation](
  https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request
  ).

## 🏆 Technologies Used

- [Node](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [JestJs](https://jestjs.io/)

## 🧾 License

This software is under MIT license. See [LICENSE](LICENSE.md) for more details.
