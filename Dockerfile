FROM ubuntu:20.04



# environment variables
ENV PYTHONUNBUFFERED=0
ENV DEBIAN_FRONTEND=noninteractive
ENV TEAHAZ_PORT=${TEAHAZ_PORT}


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
RUN cd client; npm run build

# setup stuff for prod environment
EXPOSE 5000


# setup permissions
RUN useradd -m teahaz
RUN chown teahaz /home/teahaz
RUN chgrp teahaz /home/teahaz
RUN chmod -R u+wrx /home/teahaz
RUN chmod -R g+wrx /home/teahaz


# set user and work dir
# USER teahaz
WORKDIR /home/teahaz



# run
CMD ["python3", "server.py"]







