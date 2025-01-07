# MyFriend GitHub Project Setup 🚀

## 1. Repository Structure

```
myfriend.app.br/
├── assets/
│   ├── images/
│   │   ├── home/
│   │   ├── landing-pages/
│   │   │   ├── main-lp/
│   │   │   ├── funnel-1/
│   │   │   └── funnel-2/
│   ├── css/
│   │   ├── common/
│   │   └── landing-pages/
│   └── js/
│       ├── common/
│       └── landing-pages/
├── landing-pages/
│   ├── main/
│   ├── funnel-1/
│   └── funnel-2/
└── tests/
    └── ab/
        ├── main-lp/
        └── funnels/
```

## 2. Quick Setup Steps

1. Create new repo in MyFriend's GitHub:
```bash
git init
git remote add origin git@github.com:myfriend/myfriend.app.br.git
```

2. Set up branch structure:
```bash
git checkout -b main
git checkout -b development
git checkout -b landing-page-v1
```

3. Configure GitHub Pages:
- Go to repo Settings > Pages
- Set source branch to 'main'
- Set custom domain: myfriend.app.br

## 3. A/B Testing Setup

Create test variations in `/landing-pages/main/variants/`:
```
landing-pages/main/
├── index.html
└── variants/
    ├── variant-a/
    ├── variant-b/
    └── variant-c/
```

## 4. Development Workflow

1. Local development:
```bash
# Switch to development branch
git checkout development

# Create feature branch
git checkout -b feature/new-landing-page

# After testing, merge to development
git checkout development
git merge feature/new-landing-page
```

2. Production deployment:
```bash
git checkout main
git merge development
git push origin main
```

## 5. Essential Git Commands

```bash
# Check current setup
git remote -v
git branch -a

# Switch GitHub account
git config user.name "MyFriend"
git config user.email "team@myfriend.app.br"

# Push new landing page
git add .
git commit -m "feat: add new landing page variant"
git push origin feature/new-landing-page
```

## 6. Next Steps 🎯

1. Set up GitHub Actions for automated deployment
2. Configure analytics tracking for A/B tests
3. Implement CSS/JS minification pipeline
4. Set up automatic image optimization
5. Configure SSL certificate through GitHub Pages