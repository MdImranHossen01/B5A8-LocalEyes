# 🌍 LocalEyes - Local Guide Platform

*Connecting Travelers with Passionate Local Experts*

[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635bff)](https://stripe.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)](https://tailwindcss.com/)

## 📋 Project Overview

LocalEyes is a comprehensive platform that democratizes travel experiences by connecting travelers with passionate local guides. Unlike generic tour agencies, LocalEyes empowers individuals to share their city's hidden gems, culture, and stories, offering authentic, personalized experiences that go beyond typical tourist attractions.

**Live Demo:** [https://localeyes-psi.vercel.app](https://localeyes-psi.vercel.app)

## 🎯 Objectives

- ✅ Build a secure platform connecting travelers with local guides
- ✅ Enable guides to create and manage tour listings
- ✅ Provide detailed profiles with reviews and verification for trust
- ✅ Implement a secure booking workflow with integrated payments
- ✅ Create an engaging, user-friendly interface for discovering experiences

## ✨ Core Features

### 🔐 Authentication & User Roles
- **Role-based access control**: Tourist, Guide, and Admin
- **JWT-based authentication** with secure password hashing
- **Social login options** (Google OAuth)
- **Secure session management** with NextAuth.js

### 👤 User Profile Management
#### Common Features
- Name, profile picture, bio, languages spoken
- Email verification system
- Profile completion status

#### Guide Specific
- Expertise areas (History, Food, Adventure, etc.)
- Daily rate and availability
- Verification badges and certificates
- Tour statistics and ratings

#### Tourist Specific
- Travel preferences and interests
- Booking history
- Reviews written

### 🗺️ Tour Listing Management
- **Create/Edit Tours**: Detailed forms with rich text editing
- **Tour Details**: Title, description, itinerary, pricing, duration
- **Media Upload**: Multiple image support with ImgBB integration
- **Availability Management**: Date and time scheduling
- **Group Size Control**: Maximum participants per tour
- **Category System**: Organized by experience type

### 🔍 Advanced Search System
- **Smart Filters**: City, category, price range, language, date
- **Real-time Search**: Debounced search with instant results
- **Map View**: Visual tour location display (optional)
- **Sorting Options**: Price, rating, popularity, recency
- **Pagination**: Efficient browsing of large result sets

### 📅 Booking & Payment System
#### Booking Workflow
1. Tourist selects date/time and submits booking request
2. Guide receives notification and can accept/decline
3. Tourist completes payment to confirm booking
4. Both parties receive confirmation and details

#### Payment Integration
- **Stripe Integration**: Secure payment processing
- **Multiple Payment Methods**: Credit cards, digital wallets
- **Service Fee Structure**: 15% platform fee
- **Secure Payouts**: Guides receive payment 48h after tour completion
- **Refund System**: Structured cancellation policy

### ⭐ Review & Rating System
- **Post-tour reviews**: Tourists can rate and review guides
- **Verified reviews**: Only booked users can leave reviews
- **Rating aggregation**: Average rating calculation
- **Review responses**: Guides can respond to reviews
- **Review filtering**: Sort by date, rating, relevance

### 📱 Dashboard System
#### Tourist Dashboard
- Upcoming and past bookings
- Wishlist and saved tours
- Review management
- Profile settings

#### Guide Dashboard
- Tour listing management
- Booking requests and calendar
- Earnings and payout tracking
- Review monitoring
- Performance analytics

#### Admin Dashboard
- User management and verification
- Tour listing moderation
- Booking oversight
- Platform analytics
- Content management

## 🏗️ Technology Stack

### Frontend
- **Next.js 16.0.7** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Server state management
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **NextAuth.js** - Authentication library
- **Stripe** - Payment processing
- **JWT** - JSON Web Tokens for authentication

### Services & APIs
- **Stripe API** - Payment processing
- **ImgBB API** - Image hosting
- **Google OAuth** - Social authentication
- **Email Service** - Transactional emails
- **Cloudinary** - Image optimization (optional)



## 🎯 Demo Accounts

Test the platform with pre-configured demo accounts:

### Tourist Account
- **Email:** `tourist@demo.com`
- **Password:** `123456`
- Access tourist dashboard, browse tours, make bookings

### Guide Account
- **Email:** `guide@demo.com`
- **Password:** `123456`
- Create tours, manage bookings, track earnings

### Admin Account
- **Email:** `admin@demo.com`
- **Password:** `123456`
- Full platform management and moderation access

## 💳 Testing Payments

Use Stripe test cards for payment testing:

### Test Card Numbers
- **4242 4242 4242 4242** - Successful payment
- **4000 0000 0000 0002** - Requires authentication (3D Secure)
- **4000 0000 0000 9995** - Insufficient funds (declined)

### Test Card Details
- **Expiry Date:** Any future date (e.g., 12/34)
- **CVC:** Any 3 digits (e.g., 123)
- **ZIP Code:** Any 5 digits (e.g., 12345)

**Note:** No real charges will be made with test cards. All transactions are simulated in Stripe's test mode.

## 📄 Key Pages Implementation

### Home Page (`/`)
- **Hero Section**: Search bar with "Where are you going?" prompt
- **Featured Cities**: Highlight popular destinations
- **Top-rated Guides**: Showcase verified, highly-rated guides
- **How It Works**: Step-by-step guide for users
- **Tour Categories**: Browse experiences by type
- **Testimonials**: User reviews and success stories
- **Why Choose Us**: Platform differentiators
- **CTA Section**: "Become a Guide" promotion

### Explore Page (`/explore`)
- **Advanced Search**: Multiple filter options
- **Map/Grid View Toggle**: Different browsing experiences
- **Real-time Filtering**: Instant results as filters change
- **Pagination**: Efficient browsing
- **Sorting Options**: Multiple sorting criteria
- **Tour Cards**: Attractive tour previews with key details

### Tour Details Page (`/tours/[id]`)
- **Image Gallery**: Multiple high-quality images
- **Tour Information**: Full description, itinerary, details
- **Guide Profile**: Guide information and credentials
- **Booking Widget**: Date/time selection and booking
- **Reviews Section**: User ratings and testimonials
- **Location Details**: Meeting point and area information

### User Profile (`/profile/[id]`)
- **Profile Header**: Avatar, name, verification status
- **About Section**: Bio, languages, expertise
- **Tour Statistics**: For guides - tours given, ratings
- **Active Listings**: Guide's available tours
- **Reviews**: User testimonials and ratings
- **Contact Options**: Message user or view contact info

### Dashboard (`/dashboard`)
#### Tourist Dashboard
- **My Bookings**: Upcoming and past tours
- **Wishlist**: Saved tours for later
- **Reviews Written**: Your feedback to guides
- **Profile Settings**: Update preferences

#### Guide Dashboard
- **My Listings**: Create, edit, manage tours
- **Booking Requests**: Accept/decline incoming requests
- **Calendar View**: Schedule management
- **Earnings**: Revenue and payout tracking
- **Performance**: Ratings and review analytics

#### Admin Dashboard
- **User Management**: View, verify, manage users
- **Content Moderation**: Review tour listings
- **Analytics**: Platform usage statistics
- **System Settings**: Configure platform parameters

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for password security
- **Role-based Access Control**: Granular permissions
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Token-based protection
- **Rate Limiting**: API request limiting
- **Secure Headers**: HTTP security headers
- **Data Encryption**: Encrypted sensitive data

## 💳 Payment Integration

### Stripe Implementation
- **Payment Intents**: Server-side payment processing
- **Webhook Handling**: Event-driven updates
- **Payout System**: Secure guide payments
- **Refund Processing**: Automated refund system
- **Receipt Generation**: Automatic email receipts
- **Tax Calculation**: Automated tax handling

### Booking Flow
1. **Tourist Request**: Select dates and submit booking
2. **Guide Confirmation**: Guide accepts booking request
3. **Payment Processing**: Tourist completes payment
4. **Booking Confirmation**: Both parties receive confirmation
5. **Post-Tour**: Review and rating collection
6. **Payout Processing**: Guide receives payment (minus platform fee)

## 📱 Responsive Design

- **Mobile-First Approach**: Optimized for all devices
- **Responsive Breakpoints**: Tailwind CSS responsive classes
- **Touch-Friendly**: Mobile-optimized interactions
- **Progressive Enhancement**: Core functionality on all devices
- **Performance Optimized**: Fast loading on mobile networks

## 🚀 Deployment

### Vercel Deployment
```bash
npm run build
vercel --prod
```

### Environment Setup for Production
1. Set up production MongoDB cluster
2. Configure production Stripe keys
3. Set up custom domain
4. Configure SSL certificates
5. Set up monitoring and logging
6. Configure backup systems

## 🧪 Testing

### Test Coverage
- **Unit Tests**: Component and utility testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: User workflow testing
- **Performance Tests**: Load and stress testing

### Testing Commands
```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Run with coverage
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.localeyes.com](https://docs.localeyes.com)
- **Community Forum**: [community.localeyes.com](https://community.localeyes.com)
- **Email Support**: support@localeyes.com
- **Twitter**: [@LocalEyesApp](https://twitter.com/LocalEyesApp)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Stripe](https://stripe.com/) - Payment processing
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [ImgBB](https://imgbb.com/) - Image hosting
- [Vercel](https://vercel.com/) - Hosting and deployment

## 📊 Project Status

- ✅ **Complete**: Core platform functionality
- ✅ **Complete**: User authentication and profiles
- ✅ **Complete**: Tour creation and management
- ✅ **Complete**: Booking and payment system
- ✅ **Complete**: Review and rating system
- ✅ **Complete**: Admin dashboard
- ✅ **Complete**: Responsive design
- 🔄 **In Progress**: Advanced features (calendar, map integration)
- 🔄 **In Progress**: Multi-language support
- 🔄 **In Progress**: Mobile app development
- 🔄 **In Progress**: AI-powered recommendations

---

**Built with ❤️ for the travel community**

*"Discover the world through local eyes"*