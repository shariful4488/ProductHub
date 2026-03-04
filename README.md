#  Asset Management System

A high-performance, full-stack Asset Management solution built with **Next.js 14**, **MongoDB**, and **Tailwind CSS**. This system is engineered with a **"Universal Table"** architecture, ensuring that every asset, price, and action button remains perfectly visible and functional on everything from an iPhone SE to a 4K monitor.

---

##  UI/UX Highlights

* **Universal Responsiveness:** Custom-built tables that scale fonts and images dynamically to eliminate horizontal scrolling on mobile devices.
* **Modern Aesthetics:** A premium "Slate & Blue" theme featuring a clear typographic hierarchy and full **Dark Mode** support.
* **Tactile Interactions:** Micro-interactions such as `active:scale-95` on buttons and smooth hover transitions for cards and list items.
* **State-Driven UI:** Integrated loading states (`Loader2`), inline validation, and empty-state placeholders for a professional user experience.

---

-----Live Link-----
https://product-hub-eta-topaz.vercel.app/

## 🛠 Setup & Installation

Follow these steps to get your development environment running:

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/asset-manager.git](https://github.com/yourusername/asset-manager.git)
cd asset-manager

2. Install Dependencies
Bash
npm install

3. Configure Environment Variables
Create a .env.local file in the root directory and add your credentials:

Code snippet
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_SECRET=your_random_secret_string
NEXTAUTH_URL=https://product-hub-eta-topaz.vercel.app/


4. Run Development Server
Bash
npm run dev


Technologies Used
Next.js 14 (App Router)

Tailwind CSS (Styling & Dark Mode)

Lucide React (Iconography)

NextAuth.js (Authentication)

MongoDB (Database)

📄 License
This project is licensed under the MIT License.

Developed with 💡 and ☕ by [Shariful Islam]