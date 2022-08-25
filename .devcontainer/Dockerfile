ARG VARIANT="jammy"
ARG USER=vscode
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

USER $USER

# Setup latest Node 16
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install nodejs

# Setup latest Angular 14 CLI
RUN npm i @angular/cli@^14.0.0 --location=global

# Setup Verdaccio proxy registry
RUN npm i verdaccio --location=global

# Setup latest Chrome browser
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb

USER root
