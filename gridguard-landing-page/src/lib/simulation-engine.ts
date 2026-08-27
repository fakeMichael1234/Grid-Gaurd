// GridGuard Simulation Engine — Core State & Logic

export type RiskLevel = 'SAFE' | 'FLOOD_WARNING' | 'GRID_ANOMALY' | 'CRITICAL'
export type SimPhase = 'idle' | 'normal' | 'water_rising' | 'flood_warning' | 'electrical_anomaly' | 'ai_correlation' | 'critical_hazard' | 'gis_update' | 'alert' | 'auto_isolation' | 'incident_logged'

export interface SensorData {
  waterLevel: number
  voltage: number
  current: number
  timestamp: string
}

export interface PoleData {
  id: string
  label: string
  lat: number
  lng: number
  sensors: SensorData
  risk: RiskLevel
  isolated: boolean
}

export interface TimelineEvent {
  time: string
  poleId: string
  message: string
  severity: 'info' | 'warning' | 'critical' | 'success'
}

export interface SimulationState {
  phase: SimPhase
  phaseIndex: number
  running: boolean
  paused: boolean
  poles: PoleData[]
  timeline: TimelineEvent[]
  aiVerdict: string
  aiExplanation: string
  overallRisk: RiskLevel
  waterHistory: number[]
  voltageHistory: number[]
  currentHistory: number[]
}

const PHASE_LABELS: Record<SimPhase, string> = {
  idle: 'System Idle',
  normal: 'Phase 1 — Normal Conditions',
  water_rising: 'Phase 2 — Water Rising',
  flood_warning: 'Phase 3 — Flood Warning',
  electrical_anomaly: 'Phase 4 — Electrical Anomaly',
  ai_correlation: 'Phase 5 — AI Correlation',
  critical_hazard: 'Phase 6 — Critical Hazard',
  gis_update: 'Phase 7 — GIS Incident Update',
  alert: 'Phase 8 — Alert Dispatched',
  auto_isolation: 'Phase 9 — Auto-Isolation',
  incident_logged: 'Phase 10 — Incident Logged',
}

export function getPhaseLabel(phase: SimPhase): string {
  return PHASE_LABELS[phase] || phase
}

export function now(): string {
  return new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export function createInitialPoles(): PoleData[] {
  return [
    { id: 'GG-P11', label: 'Sector A — Main Feeder', lat: 41.4095, lng: -75.6610, sensors: { waterLevel: 12, voltage: 238, current: 3.8, timestamp: now() }, risk: 'SAFE', isolated: false },
    { id: 'GG-P12', label: 'Sector B — Junction', lat: 41.4110, lng: -75.6640, sensors: { waterLevel: 10, voltage: 240, current: 4.1, timestamp: now() }, risk: 'SAFE', isolated: false },
    { id: 'GG-P13', label: 'Sector C — Residential', lat: 41.4080, lng: -75.6670, sensors: { waterLevel: 15, voltage: 235, current: 3.5, timestamp: now() }, risk: 'SAFE', isolated: false },
    { id: 'GG-P14', label: 'Sector D — Industrial', lat: 41.4120, lng: -75.6590, sensors: { waterLevel: 8, voltage: 242, current: 5.2, timestamp: now() }, risk: 'SAFE', isolated: false },
    { id: 'GG-P15', label: 'Sector E — River Crossing', lat: 41.4100, lng: -75.6630, sensors: { waterLevel: 18, voltage: 230, current: 4.2, timestamp: now() }, risk: 'SAFE', isolated: false },
  ]
}

export function createInitialState(): SimulationState {
  return {
    phase: 'idle',
    phaseIndex: 0,
    running: false,
    paused: false,
    poles: createInitialPoles(),
    timeline: [],
    aiVerdict: 'SAFE',
    aiExplanation: 'All sensors reporting normal values. No anomalies detected.',
    overallRisk: 'SAFE',
    waterHistory: [18, 17, 18, 19, 18, 17, 18],
    voltageHistory: [230, 231, 230, 229, 230, 231, 230],
    currentHistory: [4.2, 4.1, 4.2, 4.3, 4.2, 4.1, 4.2],
  }
}

export function correlateAI(s: SensorData): { risk: RiskLevel; verdict: string; explanation: string } {
  const waterHigh = s.waterLevel > 50
  const waterRising = s.waterLevel > 30
  const voltageAbnormal = s.voltage < 180 || s.voltage > 260
  const currentAbnormal = s.current > 8 || s.current < 1

  if (waterHigh && (voltageAbnormal || currentAbnormal)) {
    return { risk: 'CRITICAL', verdict: 'CRITICAL FLOOD + ELECTRICAL HAZARD', explanation: 'Multiple correlated anomalies detected at the same infrastructure location. Water level critically high with simultaneous electrical faults.' }
  }
  if (waterRising && !voltageAbnormal && !currentAbnormal) {
    return { risk: 'FLOOD_WARNING', verdict: 'FLOOD RISK — WARNING', explanation: 'Water level rising near electrical infrastructure. Electrical readings remain normal. Monitoring escalated.' }
  }
  if ((voltageAbnormal || currentAbnormal) && !waterRising) {
    return { risk: 'GRID_ANOMALY', verdict: 'GRID ANOMALY — WARNING', explanation: 'Voltage or current readings outside normal parameters. Water level normal. Possible equipment fault.' }
  }
  return { risk: 'SAFE', verdict: 'SAFE', explanation: 'All sensors reporting normal values. No anomalies detected.' }
}

// Sensor detail info for modals
export interface SensorInfo {
  name: string
  purpose: string
  measures: string
  role: string
  icon: string
}

export const SENSOR_DETAILS: Record<string, SensorInfo> = {
  'JSN-SR04T': {
    name: 'JSN-SR04T',
    purpose: 'Water-level monitoring',
    measures: 'Distance to water surface (ultrasonic)',
    role: 'Detects rising water around electrical infrastructure and supports flood-risk classification.',
    icon: 'Waves',
  },
  'ZMPT101B': {
    name: 'ZMPT101B',
    purpose: 'Voltage monitoring',
    measures: 'AC voltage (0–250V)',
    role: 'Monitors bus voltage for anomalies such as drops, surges, or total power failure indicating grid faults.',
    icon: 'Zap',
  },
  'SCT-013': {
    name: 'SCT-013',
    purpose: 'Current monitoring',
    measures: 'AC current via non-invasive clamp (0–100A)',
    role: 'Detects abnormal current draw indicating overload, short circuit, or equipment failure on the distribution line.',
    icon: 'Activity',
  },
  'ESP32': {
    name: 'ESP32 NodeMCU',
    purpose: 'Edge processing and telemetry transmission',
    measures: 'Aggregated sensor data, Pole ID, timestamp, GPS location',
    role: 'Receives sensor readings, performs local anomaly detection, attaches metadata (Pole ID, timestamp, location), and transmits telemetry to the cloud layer via MQTT/HTTP.',
    icon: 'Cpu',
  },
}
