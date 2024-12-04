#php8.3を使用するためのDockerfile
FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install zip pdo_mysql mysqli

#composerのインストール \
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

#apacheの設定
RUN a2enmod rewrite

#apacheの設定ファイルをコピー
COPY ./apache/000-default.conf /etc/apache2/sites-available/000-default.conf