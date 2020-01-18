### Graph

---

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fe6a3cb9ff634640afd1336755d68cb2)](https://www.codacy.com/app/Sphinxs/Graph?utm_source=github.com&utm_medium=referral&utm_content=Sphinxs/Graph&utm_campaign=Badge_Grade) [![Test Coverage](https://api.codeclimate.com/v1/badges/2e94725148c871f8bbaf/test_coverage)](https://codeclimate.com/github/Sphinxs/Graph/test_coverage) ![GitHub last commit](https://img.shields.io/github/last-commit/sphinxs/graph.svg) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](<[code-of-conduct.md](https://www.contributor-covenant.org/version/1/4/code-of-conduct)>)

---

GraphQL API to manage MySQL resources

#### Setup

<details>
<summary>Yarn</summary>
Configure the repository:

```sh
sudo curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

Update the source list:

```sh
sudo apt update
```

Install Yarn:

```sh
sudo apt install yarn
```

</details>

<details>
<summary>Project Dependencies</summary>
Install project dependencies:

```sh
yarn install
```

</details>

<details>
<summary>Docker</summary>
Install Docker:

```sh
sudo apt install docker.io
```

Add Docker to the system group:

```sh
sudo groupadd docker
```

</details>

<details>
<summary>Docker Compose</summary>

Configure the repository:

```sh
sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
```

Apply executable permissions:

```sh
sudo chmod +x /usr/local/bin/docker-compose
```

</details>

<details>
<summary>MySQL</summary>
Install the MySQL image and create a container:

```sh
docker-compose -f docker-compose.yml up -d
```

If you receive an error when you run `yarn sync`, try to create the database without detach mode `docker-compose -f docker-compose.yml up` and if you want it to run in background, hit **ctrl** + **c** and type `docker start database`.

<details>
<summary>Generate Models</summary>
Generate the application' models in the database:

```sh
yarn sync # --unhandled-rejections=strict
```

</details>

<details>
<summary>Generate Data</summary>
Generate the application' models data in the database:

```sh
yarn data
```

</details>

<details>
<summary>See Models (optional)</summary>

Enter inside the MySQL CLI through the MySQL container, default password **root**:

```sh
docker exec -it database mysql -u root -p
```

Select the database:

```sh
mysql> use graph;
```

Show the tables:

```sh
mysql> show tables;
```

</details>

After create a database and generate the application' models, set the database configuration in the [config/config.json](./config/config.json) file.

> If you have already generated the database structure and persisted the data in the database and want to recreate the structure and the data, run `docker system prune -f`

</details>

#### Run

<details>
<summary>Start</summary>
Start the application:

```sh
yarn start
```

Open the [localhost:3000](http://localhost:3000) URL in the browser. If is there already a service running at this port, try to kill the service `fuser -k 3000/tcp`.

> If you register a user and not inform the password, the application will try to send a e-mail, for this the e-mail configuration needs to be set in the environment configurations file _nodemon.json_

</details>

#### Collections

To manage the collections its necessary to install some REST client, at this project we use Insomnia.

<details>
<summary>Snap</summary>
Install the Snap:

```sh
sudo apt install snapd
```

</details>

<details>
<summary>Insomnia</summary>
Install the Insomnia:

```sh
snap install insomnia
```

</details>

Now open Insomnia, or your REST client, and load the collection _insomnia.json_ that is inside the _collections_ folder.

#### Debug

To debug this project, you can use the [Visual Studio Code](https://code.visualstudio.com/) and [GraphiQL](https://github.com/graphql/graphiql). To debug / understand the schema, you can use the [GraphQL Editor](https://app.graphqleditor.com/grapher/grapher).

#### Style

This project follow the [Prettier](https://prettier.io/) guide lines.

#### Credits

Developed by [Sphinxs](https://github.com/Sphinxs).
