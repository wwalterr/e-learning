### Graph

---

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fe6a3cb9ff634640afd1336755d68cb2)](https://www.codacy.com/app/Sphinxs/Graph?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Sphinxs/Graph&amp;utm_campaign=Badge_Grade) [![Maintainability](https://api.codeclimate.com/v1/badges/2e94725148c871f8bbaf/maintainability)](https://codeclimate.com/github/Sphinxs/Graph/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/2e94725148c871f8bbaf/test_coverage)](https://codeclimate.com/github/Sphinxs/Graph/test_coverage) ![GitHub last commit](https://img.shields.io/github/last-commit/sphinxs/graph.svg) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)]([code-of-conduct.md](https://www.contributor-covenant.org/version/1/4/code-of-conduct))

---

GraphQL API to manage MySQL resources

#### Setup

This tutorial assumes you're using Linux.

<details>
<summary>Yarn</summary>
Configure the repository:

```sh
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

Install the Yarn:

```sh
$ sudo apt-get update && sudo apt-get install yarn
```
</details>

<details>
<summary>Docker</summary>
Install the Docker container:

```sh
$ sudo apt install docker.io
```

Add the Docker to the system group:

```sh
$ sudo groupadd docker
```
</details>

<details>
<summary>Docker Compose</summary>
Install the Docker Compose:

```sh
$ sudo apt install docker-compose
```
</details>

<details>
<summary>MySQL</summary>
Install the MySQL image, through [Docker Hub](https://hub.docker.com/), and create a container:

```sh
$ docker-compose -f docker-compose.yml up
```

<details>
<summary>Generate Models</summary>
Enter inside the container MySQL CLI:

```sh
$ docker exec -it database mysql -u root -p
```

Create a database, through the MySQL CLI, if it wasn't generated when the container was created:

```sh
mysql> CREATE DATABASE graph;
```

Generate the application' models in the database created above, through the Shell:

```sh
$ yarn sync
```
</details>

After create a database and generate the application' models, set the database configuration in the [config/config.json](./config/config.json) file.
</details>

#### Run

<details>
<summary>Dependencies</summary>
Install the dependencies:

```sh
$ yarn install
```
</details>

<details>
<summary>Start</summary>
Start the application:

```sh
$ yarn start
```

Open the [localhost:3000](http://localhost:3000) URL in the browser.
</details>

#### Debug

To debug this project, you can use the [Visual Studio Code](https://code.visualstudio.com/) and [GraphiQL](https://github.com/graphql/graphiql).

#### Style

This project follow the [Prettier](https://prettier.io/) guide lines.

#### Credits

Developed by [Sphinxs](https://github.com/Sphinxs).