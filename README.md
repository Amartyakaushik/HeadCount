# HR Performance Dashboard

A modern, responsive HR management dashboard built with Next.js, TypeScript, and Tailwind CSS. This application provides comprehensive employee management, performance tracking, and analytics capabilities.

👉 **Live Demo**: [https://head-count-blush.vercel.app/login](https://head-count-blush.vercel.app/login)

![HR Dashboard Preview](https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop&crop=center)

## ✨ Features Implemented

### 🔐 Authentication & User Management
- **User Registration & Login** - Secure authentication system with persistent sessions
- **Multiple User Roles** - Admin, HR Manager, HR Specialist, Manager
- **Profile Management** - Update personal information and avatar
- **Session Persistence** - Stay logged in across browser sessions
- **Demo Accounts** - Pre-configured accounts for testing

### 👥 Employee Management
- **Employee Directory** - View all employees in a responsive grid
- **Employee Profiles** - Detailed individual employee pages with tabs
- **Add New Employees** - Create employee records with form validation
- **Performance Ratings** - 5-star rating system for employee performance
- **Department Organization** - Organize employees by departments
- **Employee Actions** - View, bookmark, and promote employees

### 🔍 Search & Filtering
- **Advanced Search** - Search by name, email, or department
- **Multi-filter System** - Filter by department and performance rating
- **Real-time Results** - Instant search and filter updates
- **Pagination** - Efficient browsing of large employee lists (8 per page)
- **URL State** - Shareable search and filter URLs

### 📊 Analytics & Reporting
- **Performance Analytics** - Department-wise performance charts
- **Performance Distribution** - Visual breakdown of rating distribution
- **Top Performers** - Identify and showcase high-performing employees
- **Bookmark Trends** - Track employee engagement metrics
- **Interactive Charts** - Built with Chart.js for rich visualizations

### 🔖 Bookmark System
- **Save Employees** - Bookmark important employees for quick access
- **Bulk Actions** - Perform actions on multiple bookmarked employees
- **Grid & List Views** - Multiple viewing options for bookmarks
- **Quick Actions** - Promote, assign projects, and manage bookmarked employees
- **Persistent Storage** - Bookmarks saved across sessions

### 🎨 User Experience
- **Dark/Light Theme** - Toggle between themes or use system preference
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Toast Notifications** - Real-time feedback for user actions
- **Loading States** - Smooth loading indicators and skeleton screens
- **Error Handling** - Graceful error handling with retry options
- **Animations** - Smooth transitions and micro-interactions

### ⚙️ Settings & Customization
- **Profile Settings** - Update personal information and preferences
- **Notification Preferences** - Customize email and push notifications
- **Appearance Settings** - Theme, language, and timezone preferences
- **Security Settings** - Password management and session control
- **Data Management** - Export data and privacy controls

### 📱 Additional Features
- **Help & Support** - Comprehensive FAQ and contact system
- **Keyboard Shortcuts** - Speed up workflow with hotkeys
- **Activity Tracking** - Monitor user actions and system changes
- **Mock Data Fallback** - Continues working even if API fails
- **Avatar Upload** - Custom profile picture support

## 🚀 Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** (optional but recommended)

### Installation

1. **Clone or Download the Project**
   \`\`\`bash
   # If using Git
   git clone <your-repository-url>
   cd hr-dashboard
   
   # Or download and extract the ZIP file from v0
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

   **Note**: If you encounter dependency conflicts, try:
   \`\`\`bash
   npm install --legacy-peer-deps
   \`\`\`

3. **Start the Development Server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open Your Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Accounts

Use these pre-configured accounts to test the application:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| Admin | `admin@company.com` | `admin123` | Full system access |
| HR Specialist | `hr@company.com` | `hr123` | HR management features |
| Manager | `manager@company.com` | `manager123` | Team management |

You can also create a new account using the registration page.

### Build for Production

\`\`\`bash
# Create production build
npm run build

# Start production server
npm start
\`\`\`

## 🔧 Troubleshooting

### Common Issues

**1. Authentication Redirect Loop**
If you experience redirect loops between login and dashboard:
\`\`\`bash
# Clear browser data completely
# Open Developer Tools (F12) → Application → Storage → Clear Site Data
# Restart development server
npm run dev
\`\`\`

**2. Port Already in Use**
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

**3. Dependency Issues**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
\`\`\`

**4. TypeScript Errors**
\`\`\`bash
npm run type-check
\`\`\`

**5. Build Failures**
\`\`\`bash
npm run clean  # if available
npm run build
\`\`\`

**6. Authentication Not Persisting**
- Clear browser localStorage and cookies
- Disable browser extensions temporarily
- Try in incognito/private mode

### Debug Mode

To enable debug logging for authentication:
1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for authentication debug messages
4. Check Application → Local Storage → `hr-dashboard-auth`

## 📸 Screenshots

### Authentication overview
![Login](https://github.com/user-attachments/assets/2ccc773e-94a1-4127-80c5-0ab9f48e79e2)
![Register](https://github.com/user-attachments/assets/8cc0fd27-b2e4-411d-9d3d-c93c74345206)

### Dashboard Overview
![Dashboard](https://github.com/user-attachments/assets/77642cd0-3aec-4484-89c3-aeaeb3acc726)
*Main dashboard showing employee grid with search and filter capabilities*

### Employee Profile
![Employee Profile](https://github.com/user-attachments/assets/c698de79-004d-4e78-8509-75db96193699)
*Detailed employee profile with performance history and project information*

### Analytics Dashboard
![Analytics](https://github.com/user-attachments/assets/d350c537-f0a8-4026-80d4-6db7e5cf0f6a)
*Performance analytics with charts and insights*

### Bookmarks Management
![Bookmarks](https://github.com/user-attachments/assets/3f3aa197-0485-47e7-8b3f-9cae93146651)
*Bookmark system for managing favorite employees*

### Settings
![Settings](https://github.com/user-attachments/assets/5ccf7430-5dd9-4b8a-82c6-c2e02f219f2a)
*Bookmark system for managing favorite employees*

### Profile
![Profile](https://github.com/user-attachments/assets/59388655-59aa-4c52-a753-5a77b7e2ffdf)
*Bookmark system for managing favorite employees*

### Mobile Responsive
![Mobile View](https://github.com/user-attachments/assets/3248d175-e78f-4948-bfa9-c8d70fd8c7e4)
*Fully responsive design works perfectly on mobile devices*

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **Charts**: Chart.js with react-chartjs-2
- **Forms**: React Hook Form with Zod validation
- **Theme**: next-themes
- **Animations**: Framer Motion

## 📁 Project Structure

\`\`\`
hr-dashboard/
├── app/                    # Next.js app directory
│   ├── login/             # Authentication pages
│   ├── register/          # Registration page
│   ├── employee/          # Employee detail pages
│   ├── bookmarks/         # Bookmarks management
│   ├── analytics/         # Analytics dashboard
│   ├── settings/          # Settings pages
│   ├── profile/           # User profile
│   ├── help/              # Help and support
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── ClientLayout.tsx   # Client-side layout wrapper
├── components/            # React components
│   ├── auth-guard.tsx     # Authentication protection
│   ├── dashboard/         # Dashboard-specific components
│   ├── employee/          # Employee-related components
│   ├── analytics/         # Analytics components
│   ├── layout/           # Layout components (header, sidebar)
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions
│   ├── api.ts           # API functions with fallback
│   ├── utils.ts         # Helper utilities
│   ├── data.ts          # Static data
│   └── mock-data.ts     # Mock data generators
├── store/               # Zustand state stores
│   ├── auth.ts         # Authentication state
│   ├── employees.ts    # Employee data state
│   ├── bookmarks.ts    # Bookmark state
│   ├── profile.ts      # User profile state
│   └── notifications.ts # Notification state
├── types/              # TypeScript type definitions
│   ├── user.ts         # User types
│   └── employee.ts     # Employee types
├── middleware.ts       # Next.js middleware (disabled)
└── public/            # Static assets
\`\`\`

## 🔧 Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript compiler check

# Utilities
npm run clean       # Clean build artifacts (if available)
\`\`\`

## 🌟 Key Features Explained

### Authentication System
- Secure login/registration with form validation
- Session persistence using Zustand with localStorage
- Role-based access (ready for future permissions)
- Profile synchronization after registration
- Demo accounts for easy testing

### Employee Management
- CRUD operations for employee data
- Performance rating system (1-5 stars)
- Department categorization
- Responsive employee cards with actions
- Detailed employee profiles with tabs

### Search & Filtering
- Real-time search across name, email, department
- Multi-select filters for departments and ratings
- URL-based filter state (shareable links)
- Pagination for large datasets
- Clear filter options

### Data Handling
- API integration with fallback to mock data
- Caching system for improved performance
- Error handling with user-friendly messages
- Optimistic updates for better UX
- Persistent state management

## 🔒 Security Features

- Client-side authentication with secure state management
- Password validation and strength requirements
- Session timeout handling
- CSRF protection through Next.js
- Input validation and sanitization

## 🎯 Performance Optimizations

- Lazy loading of components and routes
- Image optimization with Next.js
- Code splitting and tree shaking
- Efficient state management with Zustand
- Skeleton loading states
- Pagination for large datasets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the **Help** page in the application
2. Review the troubleshooting section above
3. Check browser console for error messages
4. Open an issue in the repository

## 🎯 Future Enhancements

- [ ] Real-time notifications with WebSocket
- [ ] Advanced reporting features with PDF export
- [ ] Employee onboarding workflow
- [ ] Performance review system with templates
- [ ] Calendar integration for scheduling
- [ ] File upload capabilities for documents
- [ ] Advanced role-based permissions
- [ ] API integration with external HR systems
- [ ] Mobile app with React Native
- [ ] Email notifications and reminders

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔄 Version History

- **v0.1.0** - Initial release with core features
- Authentication system
- Employee management
- Search and filtering
- Analytics dashboard
- Bookmark system
- Responsive design

---

**Built with ❤️ using Next.js and modern web technologies**

For more information, visit the [Next.js Documentation](https://nextjs.org/docs) or [shadcn/ui Documentation](https://ui.shadcn.com/).
