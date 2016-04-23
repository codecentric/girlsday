FROM httpd:2.4.17

COPY httpd.conf /usr/local/apache2/conf/httpd.conf
COPY httpd-proxy.conf /usr/local/apache2/conf/extra/httpd-proxy.conf

RUN chown -R root:www-data /usr/local/apache2/conf/extra/httpd-proxy.conf

