ARG VARIANT=16
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}

# Setup latest Node 16
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install nodejs

# Setup latest Angular 14 CLI
RUN npm i @angular/cli@^14.0.0 --location=global

# Setup latest Chrome browser
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb
