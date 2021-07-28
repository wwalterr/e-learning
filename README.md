# E-Learning

E-Learning GraphQL API.

## About

E-Learning GraphQL API to manage school courses, students and schedules.

## Built with

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Express](https://expressjs.com/)
- [GraphQL](https://graphql.org/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://github.com/sequelize/sequelize)
- [Mailer](https://github.com/nodemailer/nodemailer)
- [Docker](https://www.docker.com/)

## Installation

Use the package manager [Yarn](https://yarnpkg.com/getting-started/install) to install the dependencies.

```sh
yarn
```

Use the package manager APT to install Docker and Docker Compose.

```sh
apt install docker.io
```

```sh
curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

mv /usr/local/bin/docker-compose /usr/bin/docker-compose

chmod +x /usr/bin/docker-compose
```

Download the necessary Docker images and create a database container.

```sh
docker-compose -f docker-compose.yml up -d
```

Create the database models.

```sh
yarn sync # In case of errors, use --unhandled-rejections=strict as a parameter
```

Create the default data and insert into the database.

```sh
yarn data
```

Rename _.env.example_ to _.env_ and change the variables.

## Usage

Start a server.

```sh
yarn start
```

## Documentation

See the [database model](./database/model.png) or use the database design [MySQL Workbench](https://www.mysql.com/products/workbench/) to change the model design and edit the *models* to reflect the design.

Use the [Insomnia](https://insomnia.rest/) HTTP client to load the [E-Learning](./insomnia.json) playground.

Use the command `docker system prune -f` to recreate the database models and clean the data.

Use the command `docker exec -it database mysql -u root -p` to access the MySQL CLI, the default password is "root". Select the default "database" `use graph` and use any SQL command.

Use the command `docker rm $(docker ps -a -q) -f && docker network prune && docker volume prune` to remove all Docker containers, networks and volumes.

## Contributing

Pull requests are welcome. Please, consider the following.

1. Make sure you code have quality, a.k.a standards
2. Make sure your code is secure
3. Make sure your code has no performance issues
4. Make sure your code is documented, if necessary
5. Describe the changes that were done

> No issue or PR template required, but be informative

## License

[MIT](./LICENSE.md)
