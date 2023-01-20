FROM nginx:alpine
COPY dist/e-banking /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf