module.exports = {
  apps: [{
    name: 'class-afinder',
    script: '/home/ubuntu/afinder-class/.venv/bin/gunicorn',
    args: '-w 2 -b 127.0.0.1:4000 app:app',
    interpreter: 'none',
    exec_mode: 'fork',
    cwd: '/home/ubuntu/afinder-class',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      PYTHONUNBUFFERED: '1'
    },
    error_file: './logs/class-err.log',
    out_file: './logs/class-out.log',
    log_file: './logs/class-combined.log',
    time: true
  }]
};
