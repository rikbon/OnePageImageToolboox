# Use a lightweight Nginx image as the base
FROM nginx:alpine

# Copy the application files into the Nginx web root
COPY . /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Nginx serves content from /usr/share/nginx/html by default
# No CMD needed as Nginx base image already runs Nginx
