// CLASS 15: Big Data System Manager (Main System Controller)
import { BigDataClusterManager } from "./BigDataClusterManager"
import { ProcessorFactory, ProcessorType } from "../patterns/FactoryPattern"
import { BigDataEventManager, SystemMonitor } from "../patterns/ObserverPattern"
import { CommandManager, BigDataCommand } from "../patterns/CommandPattern"
import { SystemException } from "../exceptions/SystemException"

export class BigDataSystemManager {
  private static instance: BigDataSystemManager
  private clusterManager: BigDataClusterManager
  private eventManager: BigDataEventManager
  private commandManager: CommandManager
  private processors: any[] = []
  private systemMonitor: SystemMonitor
  private isRunning = false

  private constructor() {
    this.clusterManager = BigDataClusterManager.getInstance()
    this.eventManager = new BigDataEventManager()
    this.commandManager = new CommandManager()
    this.systemMonitor = new SystemMonitor("main-monitor")

    // Set up observer pattern
    this.eventManager.addObserver(this.systemMonitor)

    this.initializeProcessors()
  }

  public static getInstance(): BigDataSystemManager {
    if (!BigDataSystemManager.instance) {
      BigDataSystemManager.instance = new BigDataSystemManager()
    }
    return BigDataSystemManager.instance
  }

  private initializeProcessors(): void {
    try {
      // Use Factory Pattern to create processors
      this.processors = [
        ProcessorFactory.createProcessor(ProcessorType.DATA_PROCESSOR),
        ProcessorFactory.createProcessor(ProcessorType.STREAM_PROCESSOR),
        ProcessorFactory.createProcessor(ProcessorType.ML_ANALYZER),
      ]
    } catch (error) {
      throw new SystemException("Failed to initialize processors", "INIT_ERROR", "CRITICAL")
    }
  }

  public startBigDataProcessing(): void {
    if (this.isRunning) return

    const startCommand = new BigDataCommand(
      () => {
        this.isRunning = true
        this.processors.forEach((processor) => {
          if (processor.startProcessing) {
            processor.startProcessing()
          }
        })
        this.eventManager.publishBigDataEvent("SYSTEM_STARTED", { timestamp: new Date() })
      },
      () => {
        this.isRunning = false
        this.processors.forEach((processor) => {
          if (processor.stopProcessing) {
            processor.stopProcessing()
          }
        })
      },
      "Start Big Data Processing System",
    )

    this.commandManager.executeCommand(startCommand)
  }

  public stopBigDataProcessing(): void {
    const stopCommand = new BigDataCommand(
      () => {
        this.isRunning = false
        this.eventManager.publishBigDataEvent("SYSTEM_STOPPED", { timestamp: new Date() })
      },
      () => {
        this.isRunning = true
      },
      "Stop Big Data Processing System",
    )

    this.commandManager.executeCommand(stopCommand)
  }

  public scaleSystem(nodes: number): void {
    try {
      this.clusterManager.scaleCluster(nodes)
      this.eventManager.publishBigDataEvent("SYSTEM_SCALED", { nodes })
    } catch (error) {
      if (error instanceof SystemException) {
        this.eventManager.publishBigDataEvent("SCALE_ERROR", { error: error.getFormattedError() })
      }
    }
  }

  public getSystemMetrics(): any {
    return {
      isRunning: this.isRunning,
      clusterHealth: this.clusterManager.getClusterHealth(),
      processorCount: this.processors.length,
      eventCount: this.eventManager.getEventCount(),
      alerts: this.systemMonitor.getAlerts().slice(-5), // Last 5 alerts
      commandHistory: this.commandManager.getHistory().length,
    }
  }

  public undoLastOperation(): boolean {
    return this.commandManager.undo()
  }

  public redoLastOperation(): boolean {
    return this.commandManager.redo()
  }
}
