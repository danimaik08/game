export default class PartTimeMaker {
  private initialCallsBeforeToggleIsMaking: number;
  private callsBeforeToggleIsMaking: number;
  private calls: number;
  private isMaking: boolean;
  private initialIsMaking: boolean;

  constructor(struct: { callsBeforeToggleIsMaking: number; isMaking: boolean }) {
    this.calls = 0;
    this.initialIsMaking = struct.isMaking;
    this.initialCallsBeforeToggleIsMaking = struct.callsBeforeToggleIsMaking;

    this.isMaking = this.initialIsMaking;
    this.callsBeforeToggleIsMaking = this.initialCallsBeforeToggleIsMaking;
  }

  public tryToMake(actionWhenSuccessfulTry: () => void) {
    this.calls++;

    if (this.calls > this.callsBeforeToggleIsMaking) {
      this.calls = 0;
      this.isMaking = !this.isMaking;
    }

    if (this.isMaking) {
      actionWhenSuccessfulTry();
    }
  }
  public reset() {
    this.calls = 0;
    this.isMaking = this.initialIsMaking;
    this.callsBeforeToggleIsMaking = this.initialCallsBeforeToggleIsMaking;
  }
}
