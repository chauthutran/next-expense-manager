import { BehaviorSubject } from "rxjs";

// A centralized Subject to broadcast router changes
export const routerSubject = new BehaviorSubject<string>("/");

// Helper to push router changes into the Subject
export const emitRouteChange = (path: string) => {
    routerSubject.next(path);
}