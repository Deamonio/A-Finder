# A+ Finder 🎓

> 경복대학교 스마트 성적 조회 시스템

A+ Finder는 학생과 교수자를 위한 직관적이고 현대적인 성적 관리 시스템입니다. 실시간 성적 조회, 등급 자동 계산, 댓글 기능을 통한 피드백 시스템을 제공합니다.

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)](https://flask.palletsprojects.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)](https://www.mysql.com/)

## ✨ 주요 기능

### 👨‍🎓 학생 기능
- **성적 조회**: 실시간으로 자신의 성적 확인
- **자동 등급 계산**: A+ ~ F 등급 자동 변환
- **댓글 시스템**: 교수자와 소통할 수 있는 피드백 채널
- **안전한 인증**: 보안 해시 기반 비밀번호 관리

### 👨‍🏫 교수자(관리자) 기능
- **성적 관리**: 과목별 점수 입력 및 수정
- **학생 목록 관리**: 전체 학생 성적 조회
- **피드백 제공**: 학생별 댓글을 통한 개별 피드백
- **통합 대시보드**: 한눈에 보는 학생 관리 인터페이스

### 🎨 UI/UX 특징
- 모던한 Tailwind CSS 기반 디자인
- Glassmorphism 스타일 적용
- 반응형 웹 디자인 (모바일/태블릿/데스크톱)
- 직관적인 네비게이션

## 🛠 기술 스택

### Backend
- **Flask 3.0+**: 웹 프레임워크
- **SQLAlchemy**: ORM (데이터베이스 관리)
- **MySQL 8.0**: 데이터베이스
- **Gunicorn**: WSGI HTTP 서버
- **Werkzeug**: 보안 해싱

### Frontend
- **HTML5 / CSS3**
- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크
- **Font Awesome**: 아이콘 라이브러리
- **Jinja2**: 템플릿 엔진

### DevOps
- **PM2**: 프로세스 관리
- **Nginx**: 리버스 프록시
- **Git**: 버전 관리

## 📋 사전 요구사항

- Python 3.8 이상
- MySQL 8.0 이상
- pip (Python 패키지 관리자)
- Node.js & npm (PM2 설치용)

## 🚀 설치 방법

### 1. 저장소 클론

```bash
git clone <repository-url>
cd grade_management
```

### 2. Python 가상환경 생성 및 활성화

```bash
python3 -m venv .venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate  # Windows
```

### 3. 패키지 설치

```bash
pip install flask flask-sqlalchemy pymysql werkzeug gunicorn
```

### 4. MySQL 데이터베이스 설정

```bash
sudo mysql -u root -p
```

```sql
-- 데이터베이스 생성
CREATE DATABASE KBU_SW CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 사용자 생성 및 권한 부여
CREATE USER 'deamon'@'localhost' IDENTIFIED BY 'Deamon123!';
GRANT ALL PRIVILEGES ON KBU_SW.* TO 'deamon'@'localhost';
FLUSH PRIVILEGES;
```

### 5. 관리자 계정 생성

```bash
sudo mysql -e "USE KBU_SW; 
INSERT INTO users (student_id, login_id, password, name, is_admin) 
VALUES ('00000000', 'admin', '<hashed_password>', '관리자', 1);"
```

### 6. PM2 설치 (선택사항)

```bash
sudo npm install -g pm2
```

## ⚙️ 환경 설정

[app.py](app.py#L17-L18)에서 데이터베이스 연결 정보를 확인/수정하세요:

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://deamon:Deamon123!@localhost/KBU_SW'
```

## 🎯 실행 방법

### 개발 모드

```bash
python app.py
```

서버가 `http://127.0.0.1:5000`에서 실행됩니다.

### 프로덕션 모드 (Gunicorn + PM2)

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### PM2 명령어

```bash
pm2 status          # 상태 확인
pm2 logs afinder    # 로그 확인
pm2 restart afinder # 재시작
pm2 stop afinder    # 중지
```

## 📁 프로젝트 구조

```
grade_management/
├── app.py                  # 메인 애플리케이션
├── ecosystem.config.js     # PM2 설정 파일
├── gunicorn.ctl           # Gunicorn 설정
├── README.md              # 프로젝트 문서
├── templates/             # HTML 템플릿
│   ├── index.html        # 메인 페이지
│   ├── login.html        # 로그인 페이지
│   ├── signup.html       # 회원가입 페이지
│   ├── student.html      # 학생 대시보드
│   └── admin.html        # 관리자 대시보드
├── logs/                  # 애플리케이션 로그
└── __pycache__/          # Python 캐시 파일
```

## 🗄 데이터베이스 스키마

### users 테이블
| 컬럼 | 타입 | 설명 |
|------|------|------|
| student_id | VARCHAR(10) | 학번 (PK) - YYYY0001 형식 |
| login_id | VARCHAR(20) | 로그인 아이디 (UNIQUE) |
| password | VARCHAR(255) | 암호화된 비밀번호 |
| name | VARCHAR(20) | 이름 |
| phone | VARCHAR(15) | 전화번호 |
| email | VARCHAR(50) | 이메일 |
| is_admin | BOOLEAN | 관리자 여부 |

### grades 테이블
| 컬럼 | 타입 | 설명 |
|------|------|------|
| student_id | VARCHAR(10) | 학번 (PK, FK) |
| sql_score | INTEGER | SQL 과목 점수 |
| network_score | INTEGER | 네트워크 과목 점수 |
| programming_score | INTEGER | 프로그래밍 과목 점수 |

### comments 테이블
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | INTEGER | 댓글 ID (PK, AUTO_INCREMENT) |
| student_id | VARCHAR(10) | 작성자 학번 (FK) |
| target_id | VARCHAR(10) | 대상 학생 학번 |
| content | TEXT | 댓글 내용 |
| created_at | DATETIME | 작성 일시 |

## 🔐 보안 기능

- **비밀번호 해싱**: Werkzeug의 PBKDF2-SHA256 알고리즘 사용
- **세션 관리**: Flask 세션 기반 인증
- **SQL Injection 방지**: SQLAlchemy ORM 사용
- **XSS 방지**: Jinja2 자동 이스케이핑

## 📊 등급 산출 기준

| 점수 범위 | 등급 |
|-----------|------|
| 95 ~ 100 | A+ |
| 90 ~ 94 | A |
| 85 ~ 89 | B+ |
| 80 ~ 84 | B |
| 75 ~ 79 | C+ |
| 70 ~ 74 | C |
| 65 ~ 69 | D+ |
| 60 ~ 64 | D |
| 0 ~ 59 | F |

## 🌐 Nginx 설정 (프로덕션)

Nginx를 리버스 프록시로 사용하는 경우 [app.py](app.py#L10-L13)에 ProxyFix 미들웨어가 적용되어 있습니다:

```python
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)
```

## 📝 주요 라우트

| URL | 메서드 | 설명 |
|-----|--------|------|
| `/` | GET | 메인 페이지 |
| `/signup` | GET, POST | 회원가입 |
| `/login` | GET, POST | 로그인 |
| `/dashboard` | GET | 대시보드 (학생/관리자) |
| `/edit_grade/<id>` | POST | 성적 수정 (관리자) |
| `/add_comment/<id>` | POST | 댓글 작성 |
| `/edit_comment/<id>` | POST | 댓글 수정 |
| `/delete_comment/<id>` | POST | 댓글 삭제 |
| `/logout` | GET | 로그아웃 |

## 🐛 문제 해결

### 데이터베이스 연결 오류
```bash
# MySQL 서비스 상태 확인
sudo systemctl status mysql

# 권한 확인
mysql -u deamon -p -e "SHOW GRANTS;"
```

### 포트 충돌
```bash
# 5000번 포트 사용 프로세스 확인
lsof -i :5000
```

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 경복대학교 학습 목적으로 개발되었습니다.

## 👥 제작자

- **고철영 교수님** - 경복대학교 소프트웨어학과

## 📧 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

**Made with ❤️ at Kyungbok University**