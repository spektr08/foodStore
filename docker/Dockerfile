FROM serversideup/php:8.2-fpm-apache
WORKDIR /var/www/html
COPY . /var/www/html
RUN composer install \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash \
    && apt-get install -y nodejs vim php-pgsql php8.2-pgsql \
    && npm install \
    && npm run build \
    && mkdir -p /var/www/html/public/images \
    && chown -R webuser:webgroup /var/www/html/ \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache