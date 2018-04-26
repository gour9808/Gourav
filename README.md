# CarbookPlus Data Manager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Setup Instructions

> Make sure you have angular-cli and node installed on your machine.

* Clone the project.
* Run `npm install` to install all the node components.
* Documentation for the REST APIs can be found at https://swagger-ui.widas.de/swagger-ui.html?url=https://apis.test.carbookplus.com/carbook-fleet-srv/swagger.json#/

## Building and Deployment
All the build scripts have been written in `package.json` file. No changes are required unless something breaks when using the existing scripts. The scripts are as follows:

> Make sure all your credentials are in place before executing these command. (GitLab, Docker etc.)

* `npm start` : Starts a local development server at port 4200. Naviate to http://localhost:4200 to see the live deployment. 
* `npm test`: Creates a test build. Creates a docker test image and pushes it to the repo. (Make sure all your credentials are in place before executing this command).
* `npm build`: Creates a production build. Creates a docker production image and pushes it to the repo. 
* `npm run v:[maj|min|pat]`: Execute this command before making a `test` or a `production` build. This command will bump the app version, and then commit it with app version in the commit message. This makes it easy to revert back to the last working build in case of issues.
* `npm run latest`: Gets the latest code from development branch. Make sure to commit your local changes first.

>WARNING: NEVER CHANGE THE VERSION INFO IN `package.json` MANUALLY. THE SCRIPTS WILL BREAK WHEN BUILDING DOCKER IMAGES.

>If you are using Visual Studio Code, then the `.vscode/tasks.json` file contains all the tasks which can be run using VS Code command palette. 

## Docker Setup
Follow this link for details: https://gitlab.widas.de/widas/HOW-TO/wikis/angular2-node-js-html5-mode

## IDE Setup

We use Visual Studio code as a preferred IDE for this project. Feel free to use any IDE as long as you don't push IDE specific config folders. Add those to `.gitignore`. If you do want to share extensions,key bindings, theme etc. add those to `<your-IDE>-settings.md` file. See `vscode-settings` file for reference.

## Contributing Guidelines

If you want to add a new feature or provide a fix for existing isuues, kindly follow the guidelines:
* Create a new branch from `development` with the following name `dev-<name>`
* Add your changes/fixes and push to your branch (`dev-<name>`)
* Pull all changes from `development` branch and resolve conflicts if any
* Push your branch after merging all changes from `development` 
* Create a Merge Request to `development` detailing all changes (if any)

>NOTE: Do not force push to `development` or `master`. Always make sure you're working on a sub-branch and not on development branch.

## Coding Convention

STRICTLY FOLLOW THE BASIC CODING GUIDELINESS
* Make sure the file is indentated properly before pushing the changes. (Unindentated files will not be accepted in PRs.)
* Don't add unnecessary blank spaces. Keep one line break between methods and declaraions.
* Make use of existing modules instead of writing unoptimized code. (eg. use lodash for searching,filtering, etc.)
* In case of a generic style, create a separate file and import it.
* Methods names should be self-explanatory. Comments are manadatory otherwise.
* Use minimal inline styling. 
* If writing 'hacks', add comments as to what exactly it is a 'hack' for.

## Resources

* Icons used are Material Icons and Font-Awesome Icons. See here for icon reference. https://material.io/icons/
* Layouts are adapted from Angular Material. See here for detailed usage guide. https://material.angularjs.org/latest/layout/alignment
* Datatables are adapted from primefaces. See here for detailed usage guide. https://www.primefaces.org/primeng/#/datatable
* Fleet Management Requirements and Feature Requests: https://gitlab.widas.de/carbook/carbook-concept/wikis/fleet-management-requirements

## Contributors

### Front-End:
* Dhanraj Padmashali (dhanraj.padmashali@widas.in)
* Gourav Sharma (gourav.sharma@widas.in)

### Back-End:
* Anshul Dhyani (anshul.dhyani@widas.in)
