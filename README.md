Clinter
===

CLI tool to generate or upgrade linter configurations. 

# Motivation

Every time we start a new projet or join an existing one, it is always struggling to create the perfect linter configuration for the project or upgrade the exisitng one to suit our needs. Another major problem we encounter is how to share configurations between different projects while still acknowledging the differences in tools and frameworks used. This tool attempts to solve these issues by providing an easily extendible and shareable source of truth for all projects.

# Install

```bash
# Using Yarn
yarn globale add clinter

cd my_project/
yarn clinter

# Using npm
npm i clinter -g


cd my_project/
clinter
```

# Usage & Options

When run, clinter will prompt you with a few questions regarding your desired linter configuration. 

## Clinter Mode

Clinter supports generating an ESLint configuration from scratch or upgrading an existing configuration.

- Generator Mode: Generate ESLint config file from scratch
- Upgrade Mode: Parse the eslint configuration file that sits within the directory and override it using the new desired configuration.

Upgrade mode will try and find a valid eslint configuration within the current directory. Supported configurations are:

- Eslint configuration in `.eslintrc` file
- Eslint configuration in `.eslintrc.json` file
- ESLint configuration in `package.json` file

Once a new configuration is generated, Clinter will override your existing configuration with the new one using a custom merge system. We recommend saving your existing configuration before using clinter in upgrade mode.

## Clinter generator options

WIP

# Supported configurations

For now, clinter only supports generating and upgrading ESLint configuration files.

## Supported languages and frameworks:

- JavaScript & TypeScript
- React & Vue
- Browser and/or Node based projects
- Jest Testing Framework
- Prettier

# Contribution

WIP
