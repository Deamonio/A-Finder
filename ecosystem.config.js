module.exports = {
  apps: [{
    name: 'afinder',
    script: '/home/ubuntu/grade_management/.venv/bin/gunicorn',
    args: '-w 2 -b 127.0.0.1:5000 app:app',
    interpreter: 'none',
    exec_mode: 'fork',
    cwd: '/home/ubuntu/grade_management',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      PYTHONUNBUFFERED: '1'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
