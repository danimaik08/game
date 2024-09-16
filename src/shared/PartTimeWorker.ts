const DEFAULT_CALLS_BEFORE_TOGGLE_IS_WORKING = 25;
const DEFAULT_IS_WORKING = false;

export default class PartTimeWorker {
  private initialCallsBeforeToggleIsWorking: number;
  private callsBeforeToggleIsWorking: number;
  private calls: number;
  private isWorking: boolean;
  private initialIsWorking: boolean;

  constructor(struct: Partial<{ callsBeforeToggleIsWorking: number; isWorking: boolean }> = {}) {
    this.calls = 0;
    this.initialIsWorking = struct.isWorking ?? DEFAULT_IS_WORKING;
    this.initialCallsBeforeToggleIsWorking =
      struct.callsBeforeToggleIsWorking ?? DEFAULT_CALLS_BEFORE_TOGGLE_IS_WORKING;

    this.isWorking = this.initialIsWorking;
    this.callsBeforeToggleIsWorking = this.initialCallsBeforeToggleIsWorking;
  }

  public tryToWork(actionWhenSuccessfulTry: () => void) {
    this.calls++;

    if (this.calls > this.callsBeforeToggleIsWorking) {
      this.calls = 0;
      this.isWorking = !this.isWorking;
    }

    if (this.isWorking) {
      actionWhenSuccessfulTry();
    }
  }
  public reset() {
    this.calls = 0;
    this.isWorking = this.initialIsWorking;
    this.callsBeforeToggleIsWorking = this.initialCallsBeforeToggleIsWorking;
  }
}
