FROM python:3.7-alpine


# Set the working directory in the container to /app
WORKDIR /app

# add the current directory to the container as /app
# ADD . /app

# Copy 
COPY . .

# execute pip command, pip install -r, create a virtual env
RUN pip install -r requirements.txt

# Expose Port
EXPOSE 5000

# Run command
CMD gunicorn -w 4 -k uvicorn.workers.UvicornWorker --timeout 120 app.gateway:app -b 0.0.0.0:8000 --log-config logger.ini