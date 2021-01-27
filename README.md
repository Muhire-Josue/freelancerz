[![Maintainability](https://api.codeclimate.com/v1/badges/696b28a46a4d9ba447e7/maintainability)](https://codeclimate.com/github/Muhire-Josue/freelancerz/maintainability) [![Coverage Status](https://coveralls.io/repos/github/Muhire-Josue/freelancerz/badge.svg?branch=develop)](https://coveralls.io/github/Muhire-Josue/freelancerz?branch=develop)

# Freelancerz

Freelancerz is a web application that helps people to hire talented software developers to work and collaborate on various software projects.

### API Link

##### Localhost: http://localhost:3000

### Requirements

- `Nodejs v10-13` - a JavaScript run-time environment that executes JavaScript code outside of a browser
- `POSTGRES` - a database management system for data persistence
- `.env.example` - a file that contains all the variable environment for this project

### SETUP

First clone it to your machine:

```
https://github.com/Muhire-Josue/freelancerz.git
```

Open it using your favorite IDE,
I used ([vs code](https://code.visualstudio.com/download))

Install all necessary node modules

```
npm install
```

To start the app

```
npm run dev
```

To run tests

```
npm test
```

### API ENDPOINTS

| API                           | Methods | Description             |
| ----------------------------- | ------- | ----------------------- |
| `/`                           | GET     | Welcome message         |
| `api/auth/signup`             | POST    | Create account          |
| `api/auth/login`              | POST    | Login                   |
| `api/jobs`                    | POST    | Create Job              |
| `api/jobs?status=open`        | GET     | Get all available jobs  |
| `api/job?id=1`                | GET     | Get details of a job    |
| `api/job/apply`               | POST    | Apply for a job         |
| `/api/job?id=1&status=closed` | PUT     | Update job Status       |
| `/api/job/edit`               | PUT     | Update a job            |
| `/api/job/apply/approve`      | PUT     | Approve an application  |
| `/api/job/applications`       | POST    | View all applications   |
| `/api/job/application`        | POST    | View an application     |
| `/api/job/profile`            | POST    | View profile            |
| `/api/job/profile/edit`       | PUT     | update profile          |
| `/api/job/`                   | DELETE  | Delete a job            |
| `/api/stacks/`                | GET     | Get all stacks          |
| `/api/user`                   | GET     | Get user from token     |
| `/api/complaint`              | POST    | Create a complain       |
| `/api/complaintTypes`         | GET     | Get all complaint types |
| `/api/complaints`             | GET     | Get all complaints      |
| `/api/complaint/:id`          | GET     | Get a complaint         |

### How can it be manually tested

- using [postman](https://www.getpostman.com/downloads/)

### Pivotal tracker stories

- Follow this [Link](https://www.pivotaltracker.com/n/projects/2432894)

### Technologies used

- `NPM` - a package manager for the JavaScript programming language
- `Git` - version-control system for tracking changes in source code during software development
