import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from './config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PlansOverview from './pages/PlansOverview';
import PrivateRoute from './components/PrivateRoute';
import NotificationBanner from './components/NotificationBanner';

function App() {
  const [user] = useAuthState(auth);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const checkDeadlines = async () => {
      if (!user) return;

      try {
        const plansRef = collection(db, 'grows');
        const q = query(plansRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        const now = new Date();
        const threeDaysFromNow = new Date(now.setDate(now.getDate() + 3));
        const newNotifications = [];

        querySnapshot.forEach(doc => {
          const plan = doc.data();
          if (plan.wayForward?.deadline) {
            const deadline = new Date(plan.wayForward.deadline);
            
            if (deadline <= threeDaysFromNow && deadline >= now) {
              newNotifications.push({
                id: doc.id,
                message: `O prazo do PDI "${plan.title || 'Sem título'}" está se aproximando.`,
                deadline: plan.wayForward.deadline
              });
            }
          }
        });

        setNotifications(newNotifications);
      } catch (error) {
        console.error('Error checking deadlines:', error);
      }
    };

    // Check deadlines immediately and then every hour
    checkDeadlines();
    const interval = setInterval(checkDeadlines, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, [user]);

  const dismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/plans"
            element={
              <PrivateRoute>
                <PlansOverview />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/:planId"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <NotificationBanner 
          notifications={notifications}
          onDismiss={dismissNotification}
        />
      </div>
    </Router>
  );
}

export default App; 