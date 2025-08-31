# Customer Management App Setup & Deployment Script

echo "🚀 Starting setup for Customer Management App..."

# -----------------------------
# 1. Clone repository
# -----------------------------
echo "📥 Cloning repository..."
git clone <repository-url>
cd customer-management-app || exit

# -----------------------------
# 2. Backend setup
# -----------------------------
echo "⚙️  Installing backend dependencies..."
npm install

# Create SQLite database if it doesn't exist
if [ ! -f database.db ]; then
  echo "🗄️  Creating SQLite database..."
  sqlite3 database.db <<EOF
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone_number TEXT NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS addresses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  address_details TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pin_code TEXT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);
EOF
fi

# -----------------------------
# 3. Frontend setup
# -----------------------------
echo "📦 Installing frontend dependencies..."
cd client || exit
npm install

# -----------------------------
# 4. Run locally
# -----------------------------
echo "🖥️  Starting frontend and backend locally..."
# Open two terminals: backend and frontend
# Backend (from root folder)
#   npm run dev
# Frontend (from client folder)
#   npm start

echo "✅ Local setup complete."
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:3000/api"

# -----------------------------
# 5. Vercel Deployment
# -----------------------------
echo "🌐 Deploying to Vercel..."
npm install -g vercel
vercel login
vercel --prod

echo "🎉 Deployment complete! Check your Vercel dashboard for live URL."
