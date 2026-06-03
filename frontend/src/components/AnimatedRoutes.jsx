import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Network from '../pages/Network';
import Services from '../pages/Services';
import AboutUs from '../pages/AboutUs';
import ProtectedRoute from './ProtectedRoute';

/* ── Page transition wrapper ── */
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

/* ── Auth-aware Home route: logged-in → dashboard, logged-out → landing ── */
const HomeRoute = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <PageTransition>
      <Home />
    </PageTransition>
  );
};

/* ── Animated Routes with Framer Motion ── */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public: Home (landing page) */}
        <Route path="/" element={<HomeRoute />} />

        {/* Public: Login */}
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        {/* Public: Network */}
        <Route
          path="/network"
          element={
            <PageTransition>
              <Network />
            </PageTransition>
          }
        />

        {/* Public: Services */}
        <Route
          path="/services"
          element={
            <PageTransition>
              <Services />
            </PageTransition>
          }
        />

        {/* Public: About Us */}
        <Route
          path="/about"
          element={
            <PageTransition>
              <AboutUs />
            </PageTransition>
          }
        />

        {/* Public: Register */}
        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />

        {/* Protected: Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={
              <PageTransition>
                <Dashboard />
              </PageTransition>
            }
          />
        </Route>

        {/* Catch all → redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
