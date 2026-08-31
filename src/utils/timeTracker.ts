import { ActivityEvent } from '../types';

export interface TimeTrackerState {
  isActive: boolean;
  totalTimeSeconds: number;
  activeFocusSeconds: number;
  idleSeconds: number;
  tabSwitchCount: number;
  pasteEventCount: number;
  rapidAnswerCount: number;
  currentQuestionTimeSeconds: number;
  events: ActivityEvent[];
}

export class TimeIntegrityEngine {
  private startTime: number = 0;
  private currentQuestionStartTime: number = 0;
  private totalElapsedSeconds: number = 0;
  private activeFocusSeconds: number = 0;
  private idleSeconds: number = 0;
  private tabSwitchCount: number = 0;
  private pasteEventCount: number = 0;
  private rapidAnswerCount: number = 0;
  private isTabFocused: boolean = true;
  private lastActivityTimestamp: number = 0;
  private isIdle: boolean = false;
  private intervalId: any = null;
  private events: ActivityEvent[] = [];
  private onUpdateCallback?: (state: TimeTrackerState) => void;

  constructor(onUpdate?: (state: TimeTrackerState) => void) {
    this.onUpdateCallback = onUpdate;
  }

  public startSession() {
    this.startTime = Date.now();
    this.currentQuestionStartTime = Date.now();
    this.lastActivityTimestamp = Date.now();
    this.isTabFocused = !document.hidden;
    this.isIdle = false;
    this.events = [
      {
        timestamp: 0,
        type: 'start',
        description: 'Session initiated with active focus',
      },
    ];

    this.bindEvents();
    this.startTicker();
    this.notifyUpdate();
  }

  private handleVisibilityChange = () => {
    const elapsed = this.getRelativeSeconds();
    if (document.hidden) {
      this.isTabFocused = false;
      this.tabSwitchCount += 1;
      this.events.push({
        timestamp: elapsed,
        type: 'tab_blur',
        description: `Student switched away from tab/window (Tab Blur #${this.tabSwitchCount})`,
      });
    } else {
      this.isTabFocused = true;
      this.lastActivityTimestamp = Date.now();
      this.events.push({
        timestamp: elapsed,
        type: 'tab_focus',
        description: 'Student returned focus to Spanish exercise',
      });
    }
    this.notifyUpdate();
  };

  private handleWindowBlur = () => {
    if (this.isTabFocused) {
      this.isTabFocused = false;
      this.tabSwitchCount += 1;
      const elapsed = this.getRelativeSeconds();
      this.events.push({
        timestamp: elapsed,
        type: 'tab_blur',
        description: `Window lost focus (Blur #${this.tabSwitchCount})`,
      });
      this.notifyUpdate();
    }
  };

  private handleWindowFocus = () => {
    if (!this.isTabFocused) {
      this.isTabFocused = true;
      this.lastActivityTimestamp = Date.now();
      const elapsed = this.getRelativeSeconds();
      this.events.push({
        timestamp: elapsed,
        type: 'tab_focus',
        description: 'Window regained active focus',
      });
      this.notifyUpdate();
    }
  };

  public handleUserActivity = () => {
    const now = Date.now();
    this.lastActivityTimestamp = now;
    if (this.isIdle) {
      this.isIdle = false;
      this.events.push({
        timestamp: this.getRelativeSeconds(),
        type: 'idle_resumed',
        description: 'Student resumed keyboard/mouse activity',
      });
    }
  };

  public recordPasteEvent(questionIndex: number) {
    this.pasteEventCount += 1;
    const elapsed = this.getRelativeSeconds();
    this.events.push({
      timestamp: elapsed,
      type: 'paste',
      description: `Clipboard paste detected on Question ${questionIndex + 1}`,
      questionIndex,
    });
    this.notifyUpdate();
  }

  public recordQuestionAnswered(questionIndex: number, timeSpentOnQuestion: number) {
    const elapsed = this.getRelativeSeconds();
    // If answered under 2.5 seconds, flag as suspicious speed / rapid guessing
    if (timeSpentOnQuestion < 2.5) {
      this.rapidAnswerCount += 1;
      this.events.push({
        timestamp: elapsed,
        type: 'rapid_answer',
        description: `Rapid answer flagged: Q${questionIndex + 1} completed in ${timeSpentOnQuestion.toFixed(1)}s`,
        questionIndex,
      });
    } else {
      this.events.push({
        timestamp: elapsed,
        type: 'question_next',
        description: `Completed Q${questionIndex + 1} after ${Math.round(timeSpentOnQuestion)}s active work`,
        questionIndex,
      });
    }
    // Reset question timer
    this.currentQuestionStartTime = Date.now();
    this.notifyUpdate();
  }

  private bindEvents() {
    if (typeof window === 'undefined') return;
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    window.addEventListener('blur', this.handleWindowBlur);
    window.addEventListener('focus', this.handleWindowFocus);
    window.addEventListener('mousemove', this.handleUserActivity, { passive: true });
    window.addEventListener('keydown', this.handleUserActivity, { passive: true });
  }

  private unbindEvents() {
    if (typeof window === 'undefined') return;
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('blur', this.handleWindowBlur);
    window.removeEventListener('focus', this.handleWindowFocus);
    window.removeEventListener('mousemove', this.handleUserActivity);
    window.removeEventListener('keydown', this.handleUserActivity);
  }

  private startTicker() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.totalElapsedSeconds += 1;
      const now = Date.now();
      const idleTimeMs = now - this.lastActivityTimestamp;

      // Idle threshold: 18 seconds without mouse/key activity while in tab
      if (idleTimeMs > 18000 && !this.isIdle && this.isTabFocused) {
        this.isIdle = true;
        this.events.push({
          timestamp: this.getRelativeSeconds(),
          type: 'idle_detected',
          description: 'No activity detected for 18s (idle state)',
        });
      }

      if (this.isTabFocused && !this.isIdle) {
        this.activeFocusSeconds += 1;
      } else {
        this.idleSeconds += 1;
      }

      this.notifyUpdate();
    }, 1000);
  }

  public getCurrentQuestionSeconds(): number {
    return Math.max(1, Math.round((Date.now() - this.currentQuestionStartTime) / 1000));
  }

  public getRelativeSeconds(): number {
    return Math.round((Date.now() - this.startTime) / 1000);
  }

  public calculateIntegrityScore(): { score: number; flags: string[] } {
    let score = 100;
    const flags: string[] = [];

    // Tab blur penalties
    if (this.tabSwitchCount >= 5) {
      score -= 35;
      flags.push(`Excessive tab switching (${this.tabSwitchCount} blurs/leaves detected)`);
    } else if (this.tabSwitchCount >= 2) {
      score -= 15;
      flags.push(`Multiple tab switches (${this.tabSwitchCount} times left application)`);
    } else if (this.tabSwitchCount === 1) {
      score -= 5;
    }

    // Paste event penalties (on writing/translation questions)
    if (this.pasteEventCount > 0) {
      score -= this.pasteEventCount * 20;
      flags.push(`${this.pasteEventCount} direct clipboard paste event(s) detected`);
    }

    // Rapid guessing / instant submission
    if (this.rapidAnswerCount >= 3) {
      score -= 30;
      flags.push(`Unusual answering speed (${this.rapidAnswerCount} questions answered in < 2.5s)`);
    } else if (this.rapidAnswerCount >= 1) {
      score -= 10;
      flags.push(`Fast response speed anomaly (< 2.5s on question)`);
    }

    // Active focus percentage check
    const total = Math.max(1, this.activeFocusSeconds + this.idleSeconds);
    const focusRatio = this.activeFocusSeconds / total;
    if (focusRatio < 0.4 && total > 40) {
      score -= 20;
      flags.push(`Low active page focus ratio (${Math.round(focusRatio * 100)}% on-task time)`);
    }

    score = Math.max(0, Math.min(100, Math.round(score)));
    return { score, flags };
  }

  public stopSession(): {
    totalTimeSeconds: number;
    activeFocusSeconds: number;
    idleSeconds: number;
    tabSwitchCount: number;
    pasteEventCount: number;
    rapidAnswerCount: number;
    integrityScore: number;
    flags: string[];
    events: ActivityEvent[];
  } {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.unbindEvents();

    const { score, flags } = this.calculateIntegrityScore();
    this.events.push({
      timestamp: this.getRelativeSeconds(),
      type: 'submit',
      description: `Exercise finished with ${score}% integrity rating`,
    });

    return {
      totalTimeSeconds: this.totalElapsedSeconds,
      activeFocusSeconds: this.activeFocusSeconds,
      idleSeconds: this.idleSeconds,
      tabSwitchCount: this.tabSwitchCount,
      pasteEventCount: this.pasteEventCount,
      rapidAnswerCount: this.rapidAnswerCount,
      integrityScore: score,
      flags,
      events: this.events,
    };
  }

  private notifyUpdate() {
    if (this.onUpdateCallback) {
      this.onUpdateCallback({
        isActive: this.isTabFocused && !this.isIdle,
        totalTimeSeconds: this.totalElapsedSeconds,
        activeFocusSeconds: this.activeFocusSeconds,
        idleSeconds: this.idleSeconds,
        tabSwitchCount: this.tabSwitchCount,
        pasteEventCount: this.pasteEventCount,
        rapidAnswerCount: this.rapidAnswerCount,
        currentQuestionTimeSeconds: this.getCurrentQuestionSeconds(),
        events: this.events,
      });
    }
  }
}
