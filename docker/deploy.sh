cd ../

function runc() {
    echo "root_script running: $@"
    $@
    if [ "$?" != 0 ]
    then
        killall python3
    fi
}

#nginx
runc systemctl enable nginx
runc nginx -t
runc systemctl start nginx

# python3 -u main.py
gunicorn --bind 0.0.0.0:5000 --log-level=debug server:app

