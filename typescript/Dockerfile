FROM node:alpine
ARG user=docker
ARG home=/home/$user
ARG port=3000

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home $home \
    $user

WORKDIR $home
COPY . .
RUN pnpm i
RUN chown -R $user:$user .

USER $user
EXPOSE $port
CMD ["pnpm", "start"]
