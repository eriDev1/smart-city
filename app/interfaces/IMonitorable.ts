// Interface 2: Monitorable Interface
export interface IMonitorable {
  startMonitoring(): void
  stopMonitoring(): void
  getMonitoringData(): any
}
