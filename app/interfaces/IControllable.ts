// Interface 3: Controllable Interface
export interface IControllable {
  turnOn(): void
  turnOff(): void
  reset(): void
  getControlStatus(): boolean
}
