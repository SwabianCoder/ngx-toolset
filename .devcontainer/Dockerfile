ARG VARIANT=16
FROM mcr.microsoft.com/vscode/devcontainers/universal:${VARIANT}

# Install latest Angular 14 CLI
RUN npm i @angular/cli@^14.0.0 --location=global

# Install latest Chrome browser
RUN apt-get install -y wget
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install ./google-chrome-stable_current_amd64.deb
