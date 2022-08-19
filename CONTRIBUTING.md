# Contributing to Kidala upload

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

-   Reporting an issue
-   Discussing the current state of the code
-   Submitting a fix
-   Proposing new features
-   Becoming a maintainer

## Code of Conduct

The code of conduct is described in [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

## Our Development Process

All changes happen through pull requests. Pull requests are the best way to propose changes. We actively welcome your pull requests and invite you to submit pull requests directly [here](https://github.com/RobzLegz/kidala-upload/pulls), and after review, these can be merged into the project.

## Using the Project's Standard Commit Messages

This project is using the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) standard. Please follow these steps to ensure your
commit messages are standardized:

1. Make sure your shell path is in the root of the project (not inside any of the packages).
2. Run `yarn`.
3. Stage the files you are committing with `git add [files]`.
4. Run `yarn commit`. This will start an interactive prompt that generates your commit message:
    1. Select the type of change.
    2. Type the scope. This is either `global` for project-wide changes or one of the packages (kibbeh, shawarma etc.).
    3. Write a short, imperative tense description of the change.
    4. If the above was not sufficient, you may now write a longer description of your change (otherwise press enter to leave blank).
    5. y or n for whether there are any breaking changes (e.g. changing the props of a component, changing the JSON structure of an API response).
    6. y or n for whether this change affects an open issue, if positive you will be prompted to enter the issue number.
5. Your commit message has now been created, you may push to your fork and open a pull request (read below for further instructions).

## Pull Requests

1. Fork the repo and create your branch (usually named `patch-%the number of PRs you've already made%`) from `staging`.
2. If you've added code that should be tested, add some test examples.
3. Ensure to describe your pull request.

## Quickstart Local Frontend Development

### UI _(react + next.js)_:

Navigate to `/fronend`

-   Run `yarn`
-   Run `yarn staging` (this tells React to connect to a hosted version of the backend for development purposes).
-   Read `frontend/README.md` for more information and fixes for known development issues.

## Translating

1. Fork the [repository](https://github.com/RobzLegz/kidala-upload 'RobzLegz/kidala-upload') (click on `fork` in the top right corner of the screen)
   ![image](https://i.ibb.co/RB4FVS0/Screenshot-2021-05-07-152827.jpg)

2. In the forked repository, navigate to `frontend/src/languages` and then choose your language and open the `text.ts` file
3. Click on `edit` in the top right corner of the window

![image](https://i.ibb.co/vZjt4jD/Screenshot-2021-05-07-153427.jpg)

4. Make the changes in the translation(make sure you are using the correct json syntax)
5. click `commit changes` in the bottom of the page and add `fix(frontend): update {my language} Translation` as the commit message(`fix` if you are fixing tranlsations and `feat` if you are adding a language)(leave the description empty!)
   ![image](https://user-images.githubusercontent.com/68110106/117442435-6e1b1080-af3f-11eb-990f-9a1a270fef29.png)
6. Go to the [main page of the repository](https://github.com/RobzLegz/kidala-upload) and under `Contribute`, click on `Open Pull Request`

## Devcontainer Full Local Development

For VSCode users, we're able to use devcontainers which allows you to create development environments that already have all the tools and services configured and ready to go.

## Issues

> NOTE: If your bug is a **security vulnerability**, please instead see the [security policy](https://github.com/RobzLegz/kidala-upload/security/policy)

We use GitHub issues to track public bugs. Please ensure your description is
clear and has sufficient instructions to be able to reproduce the issue. Report a bug by <a href="https://github.com/RobzLegz/kidala-upload/issues">opening a new issue</a>; it's that easy!

## Frequently Asked Questions (FAQs)

<!--- I thought it would be great to have a list of FAQs for the project to help save time for new contributors--->

    - Q: [The Question?]
    - A: [The Answer!]

## Feature Request

Great Feature Requests tend to have:

-   A quick idea summary.
-   What & why you wanted to add the specific feature.
-   Additional context like images, links to resources to implement the feature etc, etc.

## License

By contributing to Kidala upload, you agree that your contributions will be licensed
under the [LICENSE file](LICENSE).
