# CLI Todo App

A simple command-line Todo application to manage daily tasks quickly and efficiently.

## Features

- Add new tasks
- List all tasks
- Mark tasks as completed
- Remove tasks
- Persistent local storage (if implemented in the project)

## Tech Stack

- Runtime: Node.js
- Language: JavaScript (or TypeScript, if applicable)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed

### Installation

```bash
git clone <your-repository-url>
cd CLI-todo
npm install
```

### Run the App

```bash
#No build
npm start

#If built
npm run build
npm link
clitodo <command>
```

## Usage

Examples:

```bash

#Add a new project
todo newp "<My Project> <color>"

# Add a task
todo add "Study_JavaScript 1 week"
# *I still haven't implemented a way to write the title and the due date separately, so you have to write the title together like this. I will fix this in the future.

# Edit a task
todo edit

# Edit a project (including marking it as completed)
todo editp

# List all tasks
todo list

# List tasks in a project
todo listfromp

# List all projects
todo listp

# List a project and all its tasks
todo listpt

# Delete a task
todo remove

# Delete a project
todo removep
```

## Project Structure

```text
CLI-todo/
├─ src/
├─ package.json
└─ readme.md
```

## Scripts

- `npm start` — Runs the CLI app
- `npm run dev` — Runs in development mode
- `npm build` — Builds the project

## Contributing

For now the project is closed for contributions as it's a side project, but feel free to fork and make your own version!

## License

This project is licensed under the MIT License.
