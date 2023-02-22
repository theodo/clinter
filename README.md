# Clinter

CLI tool to generate or upgrade linter configurations.

# Motivation

Every time we start a new project or join an existing one, it is always struggling to create the perfect linter configuration for the project or upgrade the existing one to suit our needs. Another major problem we encounter is how to share configurations between different projects while still acknowledging the differences in tools and frameworks used. This tool attempts to solve these issues by providing an easily extendible and shareable source of truth for all projects.

# Install

## Prequesites

- NodeJS v12.0 or later

## Installation Process

```bash
# Using Yarn
yarn global add clinter

cd my_project/
yarn clinter

# Using npm
npm i clinter -g

cd my_project/
clinter

# Using Pnpm
cd my_project/
pnpx clinter
```

# Upgrade or generate the latest recommended ESLint configuration for your project

## Upgrading or generating a ESLint configuration within an existing project

- Navigate inside your project directory where your ESLint configuration lives or where it needs to be (if you have or want multiple ESLint configurations in subdirectories, clinter will need to be run in each of the directories)
- Run Clinter by running `clinter` in the terminal
- Choose the `automatic` option and hit `enter`. This option tells Clinter to infer what frameworks and languages the project is using and generate the best matching ESLint configuration. Clinter will also infer whether an ESLint configuration already exists and use it as a base to add the recommended rules.
- The next option checks whether Clinter needs to insert ignore comments in your code to silence the ESLint errors. This can be done later. Leave this option to its default value `No` and hit `enter`.

Clinter will then update the existing eslint configuration where it was previously defined or generate one if none was found. It will also install and update all required dependencies for the newly updated or generated configuration.

- After Clinter is run, it is recommended to fix all ESLint fixable errors by using ESLint's fix option on the whole project: `eslint --fix`
- Check the number of errors reported by ESLint. If the work needed to fix these errors seems too great, you may use Clinter's `disable-errors` option to temporarily disable these errors line by line. This gives the option to progressively fix the ESLint errors while still having the latest recommended ESLint configuration on the project. Check the Migration section for more information.

## Generating an ESLint for a new project manually

Some use cases require to have the user to manually select which type of project he will be working on.

- Navigate inside your project directory where your ESLint configuration should live (if you need multiple ESLint configurations in different subdirectories, clinter will need to be run in each of the directories)
- Run Clinter by running `clinter` in the terminal
- Choose the `manual` option and hit `enter`. You will now have a series of questions to answer to inform Clinter of what type of project you are working on.

Clinter will then generate a ESLint configuration matching the provided answers. It will also install and update all required dependencies for the newly updated or generated configuration.

# Migration

## Migrating a codebase to a new ESLint configuration

Adding ESLint to a project can sometimes be painful as it oftentimes requires developers to make a compromise between the ESLint rules they want to add and their cost in terms of code needed to align the codebase to the new standards. This is also true for projects that already have an ESLint configuration and that wish adding a new set of rules to their project.

Clinter aims to provide a clear strategy on how to easily and progressively migrate an existing codebase to the new rules.

- Add the new ESLint rules to your project configuration (using Clinter or manually by selecting the rules and adding them to the project's ESLint configuration)
- Run a ESLint pass on your project. You should see a number of errors because of the newly added rules or configuration.
- Run Clinter with the `disable-errors` option in the project: `clinter --disable-errors`. This command will tell Clinter to add `// eslint-disable-next-line <ESLINT-RULE>` lines inside your codebase where errors are detected.
- Run a ESLint pass again to check if all errors are silenced.

It is now up to the project's developers to progressively align the codebase to the new ESLint rules. This can be done by continuously removing the ignore comments and fixing the underlying issues when coming across them.

## Monitoring the status of the migration

The migration of the project depends on the number of remaining ESLint ignore comments within the code. To easily monitor these, this CLI utility parses the entire project to find and report them: [https://github.com/CorentinDoue/eslint-disabled-stats](https://github.com/CorentinDoue/eslint-disabled-stats).

# Details

## Options

### --path

Boolean: Path of the directory where clinter should be run.

Defaults to the path where the Clinter is run

### --auto

Boolean: Option to let Clinter automatically infer the ESLint's configuration generator settings. If false, Clinter will ask the option from the user.

Defaults to false.

### --disable-errors

Boolean: If true, run Clinter in disable errors mode. Clinter will run ESLint on all files of the project and add `// eslint-disable-next-line <ESLINT-RULE>` line comments where ESLint reports an error.

Defaults to false.

## Clinter Mode

Clinter supports generating an ESLint configuration from scratch or upgrading an existing configuration.

- Generator Mode: Generate ESLint config file from scratch
- Upgrade Mode: Parse the eslint configuration file that sits within the directory and override it using the new desired configuration.

Upgrade mode will try and find a valid eslint configuration within the current directory. Supported configurations are:

- Eslint configuration in `.eslintrc` file
- Eslint configuration in `.eslintrc.json` file
- ESLint configuration in `package.json` file

Once a new configuration is generated, Clinter will override your existing configuration with the new one using a custom merge system. We recommend saving your existing configuration before using clinter in upgrade mode.

# Supported configurations

For now, clinter only supports generating and upgrading ESLint configuration files.

## Supported languages and frameworks:

- JavaScript & TypeScript
- React & Vue
- Browser and/or Node based projects
- Jest Testing Framework
- Prettier
