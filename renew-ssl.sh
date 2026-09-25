#!/bin/bash
cd /home/ubuntu/mustang
docker compose run --rm certbot renew --quiet
docker compose exec proxy nginx -s reload
