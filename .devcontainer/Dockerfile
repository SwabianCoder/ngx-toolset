ARG VARIANT="jammy"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

# Install latest Node 16.x.x
apt-get update
apt-get install curl
curl -sL https://deb.nodesource.com/setup_16.x | bash
apt-get install nodejs
node -v
npm -v

# Install latest Angular 14.x.x CLI
RUN npm i @angular/cli@^14.0.0 --location=global

# Install latest Chrome browser
RUN apt-get install -y wget
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install ./google-chrome-stable_current_amd64.deb
