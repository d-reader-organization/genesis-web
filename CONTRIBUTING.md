<h1 align="center">dReader contributing guide</h1>

> Conventions and steps to respect when contributing to the project

## Git

### Branching

- `main` is the production branch. CI/CD will reflect all changes on [dreader.app](https://www.dreader.app)

- `dev` - [dev.dreader.app](https://dev.dreader.app)

- `[chore | feat | fix | hotfix]/[task-name]` for active branches

e.g. `feat/candy-machine-integration` into `dev` and then into `main`

### Commits

Follow ['Conventional Commits'](https://www.conventionalcommits.org/en/v1.0.0/) guidelines

`feat: add candy-machine service`

`fix: local storage access token handling`

`chore: bump dependencies`
