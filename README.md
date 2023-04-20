# Employee Manager
![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)

## Description

The Employee Manager CLI Application is a Node.js command-line interface designed to manage an employee database. The application allows the user to view, add, update, and delete departments, roles, and employees, as well as view employees by manager or department and view department budgets. The user is presented with a series of prompts to interact with the database and perform these actions.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
To install this application, follow these steps:

1. Clone the repository from GitHub
2. Install and set up MySQL on your local machine if you haven't already done so. You can download and install MySQL from the [official website](https://dev.mysql.com/downloads/mysql/).
3. Download and install Node.js from the [official website](https://nodejs.org/en/download) if you haven't already done so
4. Open your terminal and navigate to the root directory of the application
5. Install the required dependencies by running ```npm install```
6. Log in to the MySQL server by running the command mysql ```-u root -p``` and entering your password when prompted.
7. Create the database schema by running the command ```SOURCE db/schema.sql;```
8. Seed the database with data by running the command ```SOURCE db/seeds.sql;``` 

*Please note that steps 6-8 should be performed in a separate terminal window or tab from the one running the Node.js application.*

## Usage
To use this application, please follow the steps below:

1. Open a terminal window and navigate to the ```src``` directory of the application
2. Start the application by running ```node app.js```
3. Choose an action from the main menu by selecting the corresponding number or using the arrow keys and pressing Enter
4. Follow the prompts to perform the desired action
5. To exit the application, select "Exit" from the main menu or press Ctrl + C

For a more detailed explanation of how to use this application, please refer to the [video tutorial]('video link here').

![Alt Text](./assets/svg.gif)

## License

This project is licensed under the MIT license. Click [here](https://opensource.org/licenses/MIT) for more information.

## Contributing
To contribute to this project, please read the installation section and ensure you have a solid understanding of the codebase. Contributions are welcome via pull requests.

## Tests
Currently, there are no automated tests for this application. Testing is performed manually.

## Questions
If you have any questions, you can reach out to me on [GitHub](https://github.com/spamdalfz) or contact me directly at coreyvasser@gmail.com.