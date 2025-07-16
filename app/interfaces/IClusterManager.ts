// INTERFACE 5: Cluster Manager Interface
export interface IClusterManager {
  scaleCluster(nodes: number): void
  distributeLoad(): void
  getClusterHealth(): any
}
