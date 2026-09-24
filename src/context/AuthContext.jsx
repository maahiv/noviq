import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { dbGet, dbPatch, firebaseConfigured, refreshIdToken, signIn, signUp } from '../api/firebaseRest';

const AuthContext = createContext(null);
const STORAGE = 'electrowave_auth';

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => JSON.parse(localStorage.getItem(STORAGE) || 'null'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (!saved?.refreshToken || !firebaseConfigured()) return;
    refreshIdToken(saved.refreshToken)
      .then(token => setSession({ ...saved, idToken: token.id_token, refreshToken: token.refresh_token || saved.refreshToken }))
      .catch(() => logout());
  }, []);

  function setSession(session) {
    setAuth(session);
    localStorage.setItem(STORAGE, JSON.stringify(session));
  }

  async function hydrateUser(base, fallback = {}) {
    try {
      const profile = firebaseConfigured() ? await dbGet(`users/${base.localId}`, base.idToken) : null;
      return profile || { ...fallback, uid: base.localId, email: base.email, role: 'user' };
    } catch {
      return { ...fallback, uid: base.localId, email: base.email, role: 'user' };
    }
  }

  async function login(email, password) {
    setLoading(true);
    try {
      if (!firebaseConfigured()) throw new Error('Firebase env is missing. Demo mode does not authenticate real accounts.');
      const data = await signIn(email, password);
      const profile = await hydrateUser(data);
      setSession({
        idToken: data.idToken,
        refreshToken: data.refreshToken,
        uid: data.localId,
        email: data.email,
        profile
      });
      return profile;
    } finally { setLoading(false); }
  }

  async function register(name, email, password) {
    setLoading(true);
    try {
      if (!firebaseConfigured()) throw new Error('Firebase env is missing. Configure .env before creating an account.');
      const data = await signUp(email, password);
      const profile = { uid: data.localId, name, email: data.email, phone: '', role: 'user', addresses: [] };
      await dbPatch(`users/${data.localId}`, profile, data.idToken);
      setSession({ idToken: data.idToken, refreshToken: data.refreshToken, uid: data.localId, email: data.email, profile });
      return profile;
    } finally { setLoading(false); }
  }

  function logout() {
    setAuth(null);
    localStorage.removeItem(STORAGE);
  }

  async function updateProfile(values) {
    if (!auth) throw new Error('Please login first');
    const next = { ...auth.profile, ...values };
    if (firebaseConfigured()) await dbPatch(`users/${auth.uid}`, values, auth.idToken);
    setSession({ ...auth, profile: next });
    return next;
  }

  const value = useMemo(() => ({ auth, user: auth?.profile || null, loading, login, register, logout, updateProfile }), [auth, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
