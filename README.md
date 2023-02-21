# Braint
A web-based planner app.

## About
Braint is an online planner app. You can add tasks for each day of the week, and it will repeat every week. Everyday, your tasks will show up on the `Today` page. You can also switch to the `Calendar` view to see everything that you need to do during the week.

### Technology
#### Database
Braint uses the SQLite3 database system to store all of the user data.
#### Web Framework
Flask is the main web framework that is used by Braint.
#### Security
Passwords are encrypted using the sha256 hashing algorithm. Additionally, the encrypted password is then salted.

## Deploy
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/JonathanW2018/Braint)

## Clone
Clone this repository:
```bash
git clone https://github.com/JonathanW2018/Braint.git
```