/**
 * Grid Guard — Unified Core Store
 * Single source of truth for all application data.
 * Both the Citizen Portal (Module 1) and Ops Center (Module 2) share this store.
 */

const GridApp = {
  get(key, defaultValue) {
    const data = localStorage.getItem(`grid_unified_${key}`);
    return data ? JSON.parse(data) : defaultValue;
  },
  set(key, value) {
    localStorage.setItem(`grid_unified_${key}`, JSON.stringify(value));
  },

  // -- Session Guards --

  requireAdmin() {
    const session = this.get('session', null);
    if (!session || session.role !== 'admin') {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  requireCitizen() {
    const session = this.get('session', null);
    if (!session) {
      window.location.href = 'login.html';
      return false;
    }
    if (session.role === 'admin') {
      window.location.href = 'admin-faults.html';
      return false;
    }
    return true;
  },

  logout() {
    localStorage.removeItem('grid_unified_session');
    window.location.href = 'login.html';
  },

  init() {

    // Sanitize any existing reports in localStorage replacing legacy names with Ram Kumar
    const existingReportsStr = localStorage.getItem('grid_unified_reports');
    if (existingReportsStr) {
      const sanitizedStr = existingReportsStr
        .replace(/Michael Scott/g, 'Ram Kumar')
        .replace(/Pam Beesly/g, 'Priya Sundaram')
        .replace(/452 Elm Street, Ward 4/g, '142 Anna Salai, T. Nagar, Chennai')
        .replace(/Intersection of 5th Ave & Market St/g, 'Intersection of 100 Feet Road & Velachery Main Rd, Chennai');
      localStorage.setItem('grid_unified_reports', sanitizedStr);
    } else {
      const initialReports = [
        {
          id: 'GG-2026-8801',
          citizenName: 'Ram Kumar',
          type: 'Power Outage / Line Fault',
          title: 'High-voltage line sagging near residential complex',
          description: 'Storm winds caused heavy tree branches to fall on main feeder line. Sparking observed.',
          location: '142 Anna Salai, T. Nagar, Chennai',
          lat: '13.0418',
          lng: '80.2341',
          severity: 'High',
          status: 'Dispatched',
          date: '2026-08-05 22:15',
          contactPhone: '+91 98401 23456',
          source: 'Citizen',
          attachments: ['Photo', 'Photo'],
          timeline: [
            { status: 'Reported', time: '2026-08-05 22:15', note: 'Incident report filed via Citizen Portal.' },
            { status: 'Under Review', time: '2026-08-05 22:20', note: 'Assigned to Sector 4 T. Nagar Electrical Dispatch.' },
            { status: 'Dispatched', time: '2026-08-05 22:45', note: 'Maintenance Crew #12 en route.' }
          ]
        },
        {
          id: 'GG-2026-8794',
          citizenName: 'Priya Sundaram',
          type: 'Water Main Leak / Pipe Burst',
          title: 'Clean water gusher flooding sidewalk',
          description: 'Underground main rupture creating significant water accumulation on roadway.',
          location: 'Intersection of 100 Feet Road & Velachery Main Rd, Chennai',
          lat: '12.9791',
          lng: '80.2180',
          severity: 'Medium',
          status: 'Under Review',
          date: '2026-08-05 18:30',
          contactPhone: '+91 98402 98765',
          source: 'Citizen',
          attachments: ['Photo'],
          timeline: [
            { status: 'Reported', time: '2026-08-05 18:30', note: 'Received by Chennai Municipal Works.' },
            { status: 'Under Review', time: '2026-08-05 19:00', note: 'Inspector dispatched for pressure test verification.' }
          ]
        }
      ];
      this.set('reports', initialReports);
    }

    if (!localStorage.getItem('grid_unified_poles')) {
      const initialPoles = [
        { id: 'POLE-W4-012', location: '142 Anna Salai, T. Nagar, Chennai', status: 'CRITICAL', voltage: 182, current: 84.2, tilt: 14.2, temp: 98.4, transformerStatus: 'OVERHEATING', lineStatus: 'FAULT_SAG', lat: '13.0418', lng: '80.2341', lastPing: '10s ago' },
        { id: 'POLE-W4-013', location: '148 Anna Salai, T. Nagar, Chennai', status: 'WARNING', voltage: 204, current: 45.1, tilt: 2.1, temp: 72.0, transformerStatus: 'NORMAL', lineStatus: 'VOLTAGE_DROP', lat: '13.0422', lng: '80.2348', lastPing: '15s ago' },
        { id: 'POLE-W2-089', location: 'SIPCOT Industrial Complex Gate 3, Cuddalore', status: 'CRITICAL', voltage: 0, current: 0.0, tilt: 28.5, temp: 112.5, transformerStatus: 'OFFLINE_BLOWN', lineStatus: 'LINE_BROKEN', lat: '11.7480', lng: '79.7714', lastPing: '1m ago' },
        { id: 'POLE-W1-004', location: 'Intersection of 100 Feet Road & Velachery Main Rd, Chennai', status: 'WARNING', voltage: 218, current: 62.0, tilt: 1.0, temp: 84.0, transformerStatus: 'WARN_HIGH_LOAD', lineStatus: 'NORMAL', lat: '12.9791', lng: '80.2180', lastPing: '5s ago' },
        { id: 'POLE-W3-045', location: 'Kaveri Substation Feeder A, Tiruchirappalli', status: 'HEALTHY', voltage: 238, current: 32.4, tilt: 0.4, temp: 64.2, transformerStatus: 'NORMAL', lineStatus: 'NORMAL', lat: '10.7905', lng: '78.7047', lastPing: '2s ago' },
        { id: 'POLE-W3-046', location: 'Kaveri Substation Feeder B, Tiruchirappalli', status: 'HEALTHY', voltage: 240, current: 31.0, tilt: 0.2, temp: 62.8, transformerStatus: 'NORMAL', lineStatus: 'NORMAL', lat: '10.7910', lng: '78.7052', lastPing: '4s ago' }
      ];
      this.set('poles', initialPoles);
    }

    if (!localStorage.getItem('grid_unified_notifications')) {
      const initialNotifications = [
        {
          id: 1,
          title: 'Dispatch Update - Ticket GG-2026-8801',
          message: 'Maintenance Crew #12 was dispatched to 142 Anna Salai, T. Nagar, Chennai.',
          time: '2026-08-05 22:45',
          unread: true,
          urgent: false
        }
      ];
      this.set('notifications', initialNotifications);
    }
  },

  // Extract all hardware sensor-originated alerts ONLY (excluding citizen reports)
  getSensorAlerts() {
    const poles = this.get('poles', []);
    const alerts = [];

    poles.forEach(p => {
      const faultTypes = [];
      const readings = [];

      if (p.voltage < 210 && p.voltage > 0) {
        faultTypes.push('Voltage Drop');
        readings.push(`Bus Voltage: ${p.voltage}V (Nominal 240V)`);
      } else if (p.voltage === 0 || p.lineStatus === 'LINE_BROKEN') {
        faultTypes.push('Broken Line / Power Failure');
        readings.push(`Bus Voltage: 0V | Line Status: BROKEN`);
      }

      if (p.current > 70) {
        faultTypes.push('Overcurrent');
        readings.push(`Phase Current: ${p.current}A (Max Rating 65A)`);
      }

      if (p.tilt > 10) {
        faultTypes.push('Pole Tilt Hazard');
        readings.push(`Gyro Tilt Angle: ${p.tilt}° (Max Safe 10.0°)`);
      }

      if (p.temp > 85 || p.transformerStatus === 'OVERHEATING') {
        faultTypes.push('Transformer Overheating');
        readings.push(`Transformer Temp: ${p.temp}°C (${p.transformerStatus})`);
      }

      if (faultTypes.length > 0 || p.status === 'CRITICAL' || p.status === 'WARNING') {
        alerts.push({
          id: `ALT-SENS-${p.id}`,
          poleId: p.id,
          location: p.location,
          faultType: faultTypes.length > 0 ? faultTypes.join(' & ') : 'Telemetry Anomaly Alert',
          triggerReading: readings.length > 0 ? readings.join(' | ') : `Voltage: ${p.voltage}V, Temp: ${p.temp}°C, Tilt: ${p.tilt}°`,
          severity: p.status === 'CRITICAL' ? 'Critical' : 'Warning',
          status: p.status === 'CRITICAL' ? 'UNASSIGNED DISPATCH' : 'MONITORING',
          lastPing: p.lastPing,
          lat: p.lat,
          lng: p.lng
        });
      }
    });

    return alerts;
  },

  // Combined feed: hardware sensor anomalies + citizen reports (used by Priority Queue)
  getCombinedFaultFeed() {
    const poles = this.get('poles', []);
    const reports = this.get('reports', []);
    const faults = [];

    // Hardware Sensor Faults
    poles.forEach(p => {
      if (p.status === 'CRITICAL' || p.status === 'WARNING') {
        faults.push({
          id: `FLT-SENS-${p.id}`,
          source: 'Sensor Node',
          poleId: p.id,
          location: p.location,
          type: p.status === 'CRITICAL' ? 'Hardware Hazard & Overtemp' : 'Telemetry Variance Alert',
          triggerReading: `Voltage: ${p.voltage}V | Temp: ${p.temp}°C | Tilt: ${p.tilt}°`,
          severity: p.status === 'CRITICAL' ? 'Critical' : 'Medium',
          time: p.lastPing,
          status: 'UNPROCESSED'
        });
      }
    });

    // Citizen Reports mapped into priority queue feed
    reports.forEach(r => {
      faults.push({
        id: `FLT-CIT-${r.id}`,
        source: 'Citizen Portal',
        poleId: 'N/A (Citizen Location)',
        location: r.location,
        type: r.type,
        triggerReading: `Reported by ${r.citizenName || 'Citizen'} (${r.contactPhone})`,
        severity: r.severity === 'Emergency' ? 'Critical' : r.severity,
        time: r.date,
        status: r.status.toUpperCase()
      });
    });

    return faults;
  },

  // Update Status across both portals synchronously
  updateIncidentStatus(ticketId, newStatus, auditNote) {
    const reports = this.get('reports', []);
    const r = reports.find(item => item.id === ticketId);
    if (r) {
      r.status = newStatus;
      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
      r.timeline.push({
        status: newStatus,
        time: nowStr,
        note: auditNote || `Status updated to ${newStatus} by Ops Center Dispatcher.`
      });
      this.set('reports', reports);

      // Trigger Citizen Notification
      const notifications = this.get('notifications', []);
      notifications.unshift({
        id: Date.now(),
        title: `Status Update - ${r.id}`,
        message: `Your report for ${r.type} is now marked: ${newStatus}.`,
        time: nowStr,
        unread: true,
        urgent: newStatus === 'Dispatched' || newStatus === 'Resolved'
      });
      this.set('notifications', notifications);
    }
  }
};

GridApp.init();

// Global Nav Header Renderer
function renderAppHeader(activeKey) {
  const session = GridApp.get('session', { role: 'citizen', name: 'RAM KUMAR' });
  const notifications = GridApp.get('notifications', []);
  const unreadCount = notifications.filter(n => n.unread).length;
  const isAdmin = session.role === 'admin';

  const headerHTML = `
    <header class="top-nav" style="${isAdmin ? 'background-color: #060d17; border-bottom: 3px solid #2563eb;' : ''}">
      <div class="nav-container">
        <a href="${isAdmin ? 'admin-faults.html' : 'portal-dashboard.html'}" class="brand" style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="logo_v2.png" alt="Grid Guard Logo" style="height: 42px; width: 42px; object-fit: contain; border-radius: 50%; border: 2px solid #2563eb; background: #0f172a; padding: 2px;" />
          <div>
            <span class="brand-title" style="font-size: 1.25rem; font-weight: 700; color: #ffffff;">Grid Guard ${isAdmin ? '<span class="admin-badge">OPS CENTER</span>' : ''}</span>
            <span class="brand-subtitle" style="color: #94a3b8; font-size: 0.725rem;">${isAdmin ? 'Municipal Operations & Sensor Hub' : 'Citizen Infrastructure Portal'}</span>
          </div>
        </a>

        <nav class="nav-links">
          ${!isAdmin ? `
            <a href="portal-dashboard.html" class="nav-link ${activeKey === 'dashboard' ? 'active' : ''}"><i data-lucide="layout-dashboard"></i> Overview</a>
            <a href="report-issue.html" class="nav-link ${activeKey === 'report' ? 'active' : ''}"><i data-lucide="file-plus"></i> Report Issue</a>
            <a href="history.html" class="nav-link ${activeKey === 'history' ? 'active' : ''}"><i data-lucide="history"></i> My Reports</a>
            <a href="notifications.html" class="nav-link ${activeKey === 'notifications' ? 'active' : ''}">
              <i data-lucide="bell"></i> Alerts ${unreadCount > 0 ? `<span style="background:#ef4444; color:white; border-radius:99px; padding:2px 6px; font-size:0.7rem; font-weight:700;">${unreadCount}</span>` : ''}
            </a>
          ` : `
            <a href="admin-faults.html" class="nav-link ${activeKey === 'complaints' || activeKey === 'faults' ? 'active' : ''}"><i data-lucide="users"></i> Complaints</a>
            <a href="admin-incident-creation.html" class="nav-link ${activeKey === 'sensor-alerts' || activeKey === 'incidents' ? 'active' : ''}"><i data-lucide="alert-triangle"></i> Sensor Alerts</a>
            <a href="admin-priority-queue.html" class="nav-link ${activeKey === 'queue' ? 'active' : ''}"><i data-lucide="list-ordered"></i> Priority Queue</a>
            <a href="admin-flood-intelligence.html" class="nav-link ${activeKey === 'flood-intel' ? 'active' : ''}"><i data-lucide="waves"></i> Flood Intelligence</a>
          `}
        </nav>

          <div class="nav-right">
          ${!isAdmin ? `
            <a href="emergency.html" class="btn-emergency-nav"><i data-lucide="siren"></i> Emergency Dispatch</a>
          ` : ''}
          <div class="user-pill">
            <span><i data-lucide="${isAdmin ? 'shield-check' : 'user'}"></i> <strong>${session.name || 'RAM KUMAR'}</strong></span>
            <button onclick="GridApp.logout()" class="btn btn-secondary btn-sm" style="background:#1e293b; border-color:#334155; color:#f8fafc; cursor:pointer;">Switch Portal</button>
          </div>
        </div>
      </div>
    </header>
  `;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

function renderAppFooter() {
  const footerHTML = `
    <footer class="footer">
      <div class="footer-container">
        <span>&copy; 2026 Grid Guard Unified Infrastructure System. Official Municipal Operations & Citizen Portal.</span>
        <span><i data-lucide="shield"></i> Core Engine: Operational</span>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function getBadgeClass(status) {
  switch (status) {
    case 'Reported': return 'badge-reported';
    case 'Under Review': return 'badge-review';
    case 'Dispatched': return 'badge-dispatched';
    case 'Resolved': return 'badge-resolved';
    default: return 'badge-reported';
  }
}

function getPriorityClass(severity) {
  switch (severity) {
    case 'Emergency': case 'Critical': return 'priority-emergency';
    case 'High': return 'priority-high';
    case 'Medium': return 'priority-medium';
    default: return 'priority-low';
  }
}
