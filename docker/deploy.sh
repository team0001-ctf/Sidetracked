cd ../

#nginx
systemctl enable nginx
nginx -t
systemctl start nginx

# python3 -u main.py
gunicorn --bind 0.0.0.0:5000 --log-level=debug server:app

