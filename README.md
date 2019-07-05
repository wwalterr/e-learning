### Graph

---

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fe6a3cb9ff634640afd1336755d68cb2)](https://www.codacy.com/app/Sphinxs/Graph?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Sphinxs/Graph&amp;utm_campaign=Badge_Grade) [![Maintainability](https://api.codeclimate.com/v1/badges/2e94725148c871f8bbaf/maintainability)](https://codeclimate.com/github/Sphinxs/Graph/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/2e94725148c871f8bbaf/test_coverage)](https://codeclimate.com/github/Sphinxs/Graph/test_coverage) ![GitHub last commit](https://img.shields.io/github/last-commit/sphinxs/graph.svg) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)]([code-of-conduct.md](https://www.contributor-covenant.org/version/1/4/code-of-conduct))

---

GraphQL API to manage MySQL database resources

If this file it's not formated, try to open it using the [Slack Edit](https://stackedit.io/) or [Dillinger](https://dillinger.io/).

#### Setup

This tutorial assumes that the OS is based on Unix / Linux.

<details>
<summary>Yarn</summary>
Configure the repository:

```sh
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

Install the Node package manager:

```sh
$ sudo apt-get update && sudo apt-get install yarn
```
</details>

<details>
<summary>Node Dependencies</summary>
Install the dependencies in local scope using Yarn package manager:

```sh
$ yarn install
```
</details>

<details>
<summary>Docker</summary>
Install the Docker container tool via APT package manager:

```sh
$ sudo apt install docker.io
```

Add the Docker to the system group:

```sh
$ sudo groupadd docker
```

Check the Docker service status:

```sh
$ sudo service docker status # start | stop
```

Unmask the Docker service if the service is masked:

```sh
$ sudo systemctl unmask docker.service
```
</details>

<details>
<summary>Docker Compose</summary>
Install the Docker Compose wrapper for Docker via APT package manager:

```sh
$ sudo apt install docker-compose
```

Check the Docker Compose service status:

```sh
$ sudo service docker-compose status # start | stop
```

Unmask the Docker Compose service if the service is masked:

```sh
$ sudo systemctl unmask  docker-compose.service
```
</details>

<details>
<summary>MySQL</summary>
Install the MySQL image through [Docker Hub](https://hub.docker.com/) and create a database (*database-c*) container:

```sh
$ docker-compose -f docker-compose.yml up
```

<details>
<summary>Generate Models (Manually)</summary>
To generate the database models manually, open the [MySQL Workbench](https://www.mysql.com/products/workbench/), import the [relational/model.mwb](./relational/model.mwb) and export the model as a SQL script.

After generate the SQL script, copy the script to the database container created before:

```sh
$ docker cp model.sql database-c:.
```

Open the database container (*database-c*) MySQL CLI:

```sh
$ docker exec -it database-c mysql # -u root -p
```

Generate the models in the MySQL database through the MySQL CLI using the SQL script:

```sh
mysql> source /model.sql
```
</details>

<details>
<summary>Generate Models (Automatically - **Recommended**)</summary>
To generate the database models automatically, open the database container (database-c) MySQL CLI::

```sh
$ docker exec -it database-c mysql # -u root -p
```

Create a database:

```sh
mysql> CREATE DATABASE graph;
```

Open a Shell, enter inside this repository folder and generate the models in the MySQL database through the Sequelize CLI Yarn `sync` script:

```sh
$ yarn db-sync
```
</details>

After create a database and generate the models inside the database, set the database access configuration inside the [config/config.json](./config/config.json) file.
</details>

#### Run

#### Debug

To debug this project, you can use the tools available in the [Visual Studio Code](https://code.visualstudio.com/) editor, along with your browser and the [GraphiQL](https://github.com/graphql/graphiql) debug tool.

#### Style

This project follow the [Prettier](https://prettier.io/) guide lines, besides the [Jest](https://jestjs.io/en/) guide lines, through the [Codacy](https://app.codacy.com/project/Sphinxs/Graph/dashboard).

#### Credits

Developed by [Sphinxs](https://github.com/Sphinxs).