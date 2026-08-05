/**
 * Grid Guard — Admin Session Store
 * Handles ONLY authentication state for the Ops Center.
 * All application data (reports, poles, notifications) lives in GridApp (common.js).
 */

const AdminStore = {
  get(key, defaultValue) {
    const data = localStorage.getItem(`grid_admin_${key}`);
    return data ? JSON.parse(data) : defaultValue;
  },
  set(key, value) {
    localStorage.setItem(`grid_admin_${key}`, JSON.stringify(value));
  },

  requireAdmin() {
    const session = GridApp.get('session', null);
    if (!session || session.role !== 'admin') {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  logout() {
    GridApp.set('session', null);
    window.location.href = 'login.html';
  }
};
