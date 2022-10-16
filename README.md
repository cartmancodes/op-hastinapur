# op-hastinapur

Steps to bring up backend server:
1. Start DB server via docker by running shell script. Command : sh db_start.sh
2. Create virtual environment: python -m venv test-env
3. Activate virtual environment: source test-env/bin/activate
4. Install python binaries: python -r requirements.txt
5. gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.gateway:app -b 0.0.0.0:5000 --log-config logger.ini
