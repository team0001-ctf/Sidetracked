FROM ubuntu:20.04

# environment variables
ENV PYTHONUNBUFFERED=0
ENV DEBIAN_FRONTEND=noninteractive


# install and update system stuff
RUN apt-get update && apt-get upgrade -y
RUN apt install apt-utils -y
RUN apt install systemctl -y


# install general things
RUN apt install git -y
RUN apt install cron -y
RUN apt install psmisc -y
RUN apt install busybox -y


# install for flask server
RUN apt install python3 -y
RUN apt install python3-pip -y
RUN apt install python3-wheel -y

RUN pip3 install flask
RUN pip3 install flask_restful
RUN pip3 install uuid
RUN pip3 install bcrypt
RUN pip3 install requests

# install things for frontend
RUN apt install npm -y
RUN apt install nodejs -y
RUN npm install react-scripts -g

# install for prod environment
RUN apt install nginx -y
RUN pip3 install gunicorn

EXPOSE 80
EXPOSE 443
COPY nginx_config /etc/nginx/sites-enabled/default


RUN mkdir /sidetracked
WORKDIR /sidetracked


# run
CMD cd /sidetracked/docker/; ./deploy.sh
