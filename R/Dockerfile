# Base image
FROM rocker/r-ver:latest

# Create and Set work app directory
WORKDIR /usr/src/app

# Bundle source
COPY . /usr/src/app

# install cron
RUN apt-get update &&  apt-get -y install cron && apt-get -y install vim

# add cron
RUN (crontab -l ; echo "* * * * * /usr/local/bin/Rscript /usr/src/app/index.R  >> /usr/src/app/cron.log") | crontab

# install packge
RUN R -e "source('cron.R')"
