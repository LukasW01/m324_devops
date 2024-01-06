# m324_devops

A repository to learn DevOps (Gitlab CI, Azure DevOps)

## Structure

The repository is organized into distinct subfolders based on technology:

- `backend/`: Contains Java Spring Boot application for backend services
- `frontend/`: Houses React application for building the frontend user interface
- `kotlin/`: Encapsulates Spring Boot application with Postgres integration
- `typescript/`: Facilitates development of a React application with TypeScript, component libraries, axios, formik, and yup

## Pipeline

Gitlab CI and Azure DevOps pipelines are configured to automate the following processes:

- Build and Test: Conducts comprehensive testing with JUnit's in Java and builds the software for each technology stack.
- Docker Container: Generates [Docker images](https://github.com/LukasW01?tab=packages&repo_name=m324_devops) for the compiled applications.

## Learning Objectives

This repository serves as a stepping stone to comprehending DevOps principles and practices:

- Trunk-Driver Development: Learn how to implement trunk-driver development in a small team.
- Continuous Integration and Continuous Delivery (CI/CD): Gain hands-on experience in implementing CI/CD pipelines using Gitlab CI and Azure DevOps.
- Automated Build and Testing: Automate the build and testing processes for multiple technologies, ensuring code quality and consistency.
- Containerization with Docker: Leverage Docker to package and deploy applications efficiently.

## License

This program is licensed under the MIT License. See the "LICENSE" file for more information

## Contributors

This project was realised by the following people and would not have been possible without them:

- Lukas W.
- Ari 
- Ryan Ford