# Todo Slack
A small project as a POC for Sails and a simple Slack [slash command](https://api.slack.com/slash-commands).

## Local Setup
Run the following to run locally:
```bash
npm i -g sails
cd /path/to/project
sails lift
```

Then navigate to http://localhost:1337.

## Docker
To build and run the Docker container run the following:
```bash
cd /path/to/project
docker build -t theconnman/todo-slack .
docker run -d -p 80:80 theconnman/todo-slack
```

Then navigate to http://localhost.
