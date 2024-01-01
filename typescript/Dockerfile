FROM node:alpine
ARG user=docker
ARG home=/home/$user
ARG port=3000

RUN adduser \
    --disabled-password \
    --gecos "" \
    --home $home \
    $user

WORKDIR $home
COPY . .
RUN npm i
RUN chown -R $user:$user .

USER $user
EXPOSE $port
CMD ["npm", "start"]