# FoodFlow - Food Delivery Management System

## 🚀 Project Overview

FoodFlow is a modern, futuristic food delivery web application built with React 18, Redux Toolkit, and Tailwind CSS. It features a beautiful dark theme with vibrant gradients, smooth animations, and a complete food ordering workflow.

## 📁 Project Structure

```
src/
├── api/                    # API integration layer
│   ├── axios.ts           # Axios instance with JWT interceptors
│   └── endpoints.ts       # All API endpoint functions
│
├── redux/                 # State management
│   ├── store.ts          # Redux store configuration
│   └── slices/
│       ├── authSlice.ts  # Authentication state
│       ├── cartSlice.ts  # Shopping cart state
│       └── orderSlice.ts # Order management state
│
├── components/            # Reusable components
│   ├── Navbar.tsx        # Navigation bar with cart counter
│   ├── Footer.tsx        # Footer component
│   ├── Loader.tsx        # Loading spinner
│   ├── ProtectedRoute.tsx # Route protection HOC
│   └── ui/               # Shadcn UI components
│
├── pages/                 # Application pages
│   ├── Login.tsx         # Login page
│   ├── Signup.tsx        # Signup page
│   ├── Home.tsx          # Landing page
│   ├── Restaurants.tsx   # Restaurant listing
│   ├── Menu.tsx          # Restaurant menu
│   ├── Cart.tsx          # Shopping cart
│   ├── Checkout.tsx      # Checkout flow
│   ├── Orders.tsx        # Order history
│   ├── Delivery.tsx      # Delivery tracking
│   ├── Profile.tsx       # User profile
│   ├── AdminRestaurants.tsx # Admin panel
│   └── NotFound.tsx      # 404 page
│
├── App.tsx               # Main app component with routing
└── index.css             # Global styles & design system
```

## 🎨 Design System

### Color Palette
- **Primary**: Orange-Red gradient (#FF6B35 → #EC4646)
- **Secondary**: Purple (#8B5CF6)
- **Accent**: Amber (#FFC107)
- **Background**: Dark (#0F1419)
- **Cards**: Glass morphism with backdrop blur

### Design Tokens
All colors, gradients, shadows, and effects are defined in `src/index.css` as CSS variables:
- `--gradient-primary`: Main brand gradient
- `--gradient-glass`: Glass morphism effect
- `--shadow-glow`: Glow effect for interactive elements
- `--transition-smooth`: Smooth animations

### Typography
- Font: Inter, System UI fallback
- Headings: Bold weight
- Body: Regular weight with antialiasing

## 🔑 Key Features

### Authentication
- JWT-based authentication
- Login/Signup flows
- Token stored in Redux + localStorage
- Auto-redirect on 401 errors
- Protected routes for authenticated users

### Restaurant & Menu Management
- Browse restaurants with animated cards
- View restaurant menus
- Add items to cart with quantity control
- Admin panel for restaurant CRUD operations

### Shopping Cart
- Add/remove items
- Update quantities
- Persistent cart (localStorage)
- Real-time total calculation
- Cart badge in navbar

### Checkout & Orders
- Multi-step checkout form
- Delivery address input
- Payment details form
- Order creation and payment processing
- Order history with status tracking

### Delivery Tracking
- Real-time delivery status
- Animated timeline (Placed → Preparing → On the Way → Delivered)
- Driver information display
- Estimated delivery time
- Order details summary

## 🛣️ Routes

### Public Routes
- `/login` - Login page
- `/signup` - Signup page

### Protected Routes
- `/home` - Landing page
- `/restaurants` - Restaurant listing
- `/menu/:id` - Restaurant menu
- `/cart` - Shopping cart
- `/checkout` - Checkout flow
- `/orders` - Order history
- `/delivery/:orderId` - Delivery tracking
- `/profile` - User profile

### Admin Routes
- `/admin/restaurants` - Restaurant management (Admin only)

## 🔌 API Integration

### Base URL
`http://localhost:8080/api`

### Endpoints

#### Auth
- `POST /auth/signup` - Create new account
- `POST /auth/login` - Login user

#### Restaurants
- `GET /restaurants` - Get all restaurants
- `GET /restaurants/:id` - Get restaurant by ID
- `POST /restaurants` - Create restaurant (Admin)
- `PUT /restaurants/:id` - Update restaurant (Admin)
- `DELETE /restaurants/:id` - Delete restaurant (Admin)

#### Menus
- `GET /menus/restaurant/:id` - Get menu by restaurant
- `POST /menus` - Create menu item (Admin)
- `PUT /menus/:id` - Update menu item (Admin)
- `DELETE /menus/:id` - Delete menu item (Admin)

#### Orders
- `POST /orders` - Create order
- `GET /orders/user/:userId` - Get user orders
- `GET /orders/:id` - Get order by ID

#### Payments
- `POST /payments` - Process payment

#### Delivery
- `GET /deliveries/order/:orderId` - Get delivery status
- `PUT /deliveries/:id/status` - Update delivery status

## 🎭 Animation Features

### Framer Motion Animations
- Page transitions with fade & slide
- Card hover effects with scale
- Staggered list animations
- Loading states
- Timeline animations for delivery tracking

### CSS Animations
- Gradient button hover effects
- Glass morphism with backdrop blur
- Smooth transitions (300ms cubic-bezier)
- Spinner animations

## 📦 State Management

### Redux Slices

#### authSlice
- `user`: Current user object
- `token`: JWT token
- `isAuthenticated`: Auth status
- Actions: `loginSuccess`, `logout`, `loadUser`

#### cartSlice
- `items`: Cart items array
- `totalAmount`: Total price
- `totalItems`: Total item count
- Actions: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `loadCart`

#### orderSlice
- `orders`: User orders array
- `currentOrder`: Active order
- `loading`: Loading state
- Actions: `setOrders`, `setCurrentOrder`, `addOrder`, `setLoading`

## 🔒 Security Features

1. **JWT Authentication**: Token-based auth with automatic refresh
2. **Protected Routes**: Role-based access control
3. **Axios Interceptors**: Auto-attach JWT to requests
4. **Auto Logout**: 401 errors trigger logout
5. **Admin-Only Routes**: Separate admin access

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid layouts adapt to screen size
- Touch-friendly UI elements
- Optimized animations for mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running at `http://localhost:8080`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup
The app expects the backend API at `http://localhost:8080/api`. Update `src/api/axios.ts` if your backend runs on a different URL.

## 🧪 Testing the App

1. **Signup**: Create a new account at `/signup`
2. **Login**: Login with your credentials at `/login`
3. **Browse**: Explore restaurants at `/restaurants`
4. **Order**: Add items to cart and checkout
5. **Track**: View order status and delivery tracking

## 🎯 Best Practices Implemented

1. **Modular Architecture**: Separate concerns (API, Redux, Components, Pages)
2. **Reusable Components**: DRY principle throughout
3. **Type Safety**: TypeScript interfaces for data models
4. **Error Handling**: Try-catch blocks with user-friendly toasts
5. **Loading States**: Proper loading indicators
6. **Responsive Design**: Mobile-first approach
7. **SEO Optimized**: Semantic HTML, meta tags
8. **Accessibility**: ARIA labels, keyboard navigation
9. **Performance**: Code splitting, lazy loading
10. **Clean Code**: Consistent naming, formatting

## 📚 Technologies Used

- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **React Toastify** - Notifications
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **TypeScript** - Type safety

## 🎨 Customization

### Changing Colors
Edit `src/index.css` CSS variables:
```css
--primary: 16 100% 60%; /* Orange */
--secondary: 265 50% 50%; /* Purple */
--accent: 45 100% 55%; /* Amber */
```

### Adding New Routes
1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Navbar.tsx`

### Modifying API Endpoints
Update `src/api/endpoints.ts` to match your backend API structure.

## 🐛 Troubleshooting

### Cart not persisting
- Check localStorage is enabled
- Verify `loadCart` is called in App.tsx

### Authentication errors
- Verify backend API is running
- Check JWT token format
- Ensure CORS is enabled on backend

### Styling issues
- Clear browser cache
- Rebuild Tailwind: `npm run build`
- Check CSS variable values

## 📝 Future Enhancements

- [ ] Real-time order tracking with WebSocket
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] User reviews and ratings
- [ ] Favorite restaurants
- [ ] Order scheduling
- [ ] Promo codes and discounts
- [ ] Admin analytics dashboard

## 👥 Contributing

This is a production-grade template. Feel free to customize and extend based on your requirements.

## 📄 License

MIT License - Free to use and modify.
