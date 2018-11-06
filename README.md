[![Travis badge](https://travis-ci.com/Damimd10/github-reporter.svg)](https://travis-ci.com/Damimd10/github-reporter)
[![Coverage Status](https://coveralls.io/repos/github/Damimd10/github-reporter/badge.svg?branch=master)](https://coveralls.io/github/Damimd10/github-reporter?branch=master)
[![eslint](https://img.shields.io/badge/eslint-enabled-green.svg)](https://eslint.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Motivation

The motivation to make this application, was to develop a mini system which integrates Apollo and GraphQL.

Taking advantage of the benefits of the Github API, you only need the Apollo client to be able to combine both tools to have a statistical report of a github user.

## Features

- [Apollo Client](https://github.com/apollographql/apollo-client)
- [GraphQL](https://github.com/facebook/graphql)
- [React ChartJS](https://github.com/reactjs/react-chartjs)
- Icons from [React Icons](https://github.com/react-icons/react-icons)
- Developer Tools:
  - husky
  - eslint
  - prettier

## How run locally

```bash
$ git clone https://github.com/Damimd10/github-reporter.git
$ cd github-reporter
$ npm install
```

create a .env file at the same level of src and add the following variables to .env file

```bash
  NODE_PATH=src/
  REACT_APP_GITHUB_TOKEN=<your-token>
```

## Contributing

## License

MIT.
