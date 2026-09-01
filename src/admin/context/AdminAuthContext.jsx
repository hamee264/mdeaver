import { createContext, useContext, useState } from 'react';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('mdeaver_admin_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (email === 'sefngbusiness@gmail.com' || email === 'admin@mdeavercharity.org') {
        const sessionData = {
          email,
          fullName: 'Mdeaver Administrator',
          role: 'super_admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
          loggedInAt: new Date().toISOString(),
        };
        localStorage.setItem('mdeaver_admin_session', JSON.stringify(sessionData));
        setAdminUser(sessionData);
        setLoading(false);
        return { success: true };
      }

      setLoading(false);
      return { success: false, error: 'Invalid admin credentials.' };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('mdeaver_admin_session');
    setAdminUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, login, logout, loading, isAuthenticated: !!adminUser }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
