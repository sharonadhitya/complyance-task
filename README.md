# ROI Calculator - Automated Invoicing

A professional ROI calculator that helps businesses calculate cost savings and payback when switching from manual to automated invoicing.

## Features

- **Real-time ROI calculations** with instant results
- **Scenario management** - save, load, and compare different business cases
- **Email-gated reports** - downloadable HTML reports for stakeholders
- **Professional UI** - modern, responsive design built with Tailwind CSS
- **Secure API** - comprehensive validation and error handling

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Deployment**: Production-ready for cloud platforms

## Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL database

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd roi-calculator
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file with your database URL
echo "DATABASE_URL=your_postgresql_url" > .env
echo "PORT=3001" >> .env
echo "NODE_ENV=production" >> .env

# Initialize database
npm run init-db

# Start backend
npm start
```

3. **Frontend Setup**
```bash
cd frontend
npm install

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Backend (Node.js)
Deploy to platforms like Render, Railway, or Heroku:
- Set `DATABASE_URL` environment variable
- Set `NODE_ENV=production`
- Run `npm run init-db` once
- Start with `npm start`

### Frontend (Static)
Deploy to platforms like Vercel, Netlify, or AWS S3:
- Run `npm run build`
- Deploy the `dist/` folder
- Configure API proxy to your backend URL

## API Endpoints

- `POST /api/simulate` - Calculate ROI
- `GET /api/scenarios` - List saved scenarios
- `POST /api/scenarios` - Save new scenario
- `DELETE /api/scenarios/:id` - Delete scenario
- `POST /api/report/generate` - Generate report (email required)
- `GET /api/health` - Health check

## Environment Variables

### Backend
```
DATABASE_URL=postgresql://user:pass@host:port/database
PORT=3001
NODE_ENV=production
```

## License

Proprietary - All rights reserved