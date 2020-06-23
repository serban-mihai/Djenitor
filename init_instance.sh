#!/bin/bash 
# This Script is meant to be used to setup the environment on the instance the containers are run/
# You can use it on Debian like distros to install all the dependencies.

# Djenitor runs on an AWS EC2 Instance t2.micro Free Tier with the Ubuntu 18.04 LTS
# AMI: ami-085925f297f89fce1

G="\033[0;32m"
Y="\033[0;33m"
NC="\033[0m"

USER=ubuntu
REPO="git@github.com:serban-mihai/Djenitor.git"
APP_DOMAIN="live.djenitor.com"
API_DOMAIN="api.djenitor.com"

set -e
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

echo -e ">>> ${Y}Djenitor${NC} Dependencies"
# Docker Dependecies
apt remove docker docker-engine docker.io containerd runc
apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
apt-key fingerprint 0EBFCD88
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

apt update -y && apt upgrade -y                 # Update Repo and Upgrade Distro
apt install nginx-full -y                       # Used as a Reverse Proxy -y
apt install certbot python3-certbot-nginx -y    # For issuing the SSL Certificate -y
apr install git -y                              # For Source Controll
apt install docker-ce docker-ce-cli containerd.io docker-compose -y
usermod -aG docker ${USER}

# Setting up the Reverse Proxy
# App Subdomain:
cat << EOF > /etc/nginx/sites-available/djenitor_app
upstream app_server_djenitor {
    server 0.0.0.0:8001 fail_timeout=0;
}

server {
    server_name ${APP_DOMAIN};

    access_log  /var/log/nginx/djenitor-app-access.log;
    error_log  /var/log/nginx/djenitor-app-error.log info;

    keepalive_timeout 5;

    location / {
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header Host \$http_host;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_redirect off;
        client_max_body_size 25M;

        if (!-f \$request_filename) {
            proxy_pass http://app_server_djenitor;
            break;
        }
    }
}

server {
    server_name ${APP_DOMAIN};
    listen 80;
}
EOF

# App Subdomain:
cat << EOF > /etc/nginx/sites-available/djenitor_api
upstream api_server_djenitor {
    server 0.0.0.0:8002 fail_timeout=0;
}

server {
    server_name ${API_DOMAIN};

    access_log  /var/log/nginx/djenitor-api-access.log;
    error_log  /var/log/nginx/djenitor-api-error.log info;

    keepalive_timeout 5;

    location / {
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header Host \$http_host;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_redirect off;
        client_max_body_size 25M;

        if (!-f \$request_filename) {
            proxy_pass http://api_server_djenitor;
            break;
        }
    }
}

server {
    server_name ${API_DOMAIN};
    listen 80;
}
EOF

ln -s /etc/nginx/sites-available/djenitor_app /etc/nginx/sites-enabled/djenitor_app
ln -s /etc/nginx/sites-available/djenitor_api /etc/nginx/sites-enabled/djenitor_api
service nginx reload
service nginx restart
certbot -d ${APP_DOMAIN} -d ${API_DOMAIN} -y

# Clone and Start Containers (Note that the SSH Pub Key needs to be present into the Deployment Keys of the Repo)
cd ${HOME}
git clone ${REPO} -y
cd Djenitor/server
docker-compose up -d