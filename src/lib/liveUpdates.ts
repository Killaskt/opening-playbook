import { Capacitor } from '@capacitor/core';
import { CapacitorUpdater } from '@capgo/capacitor-updater';

/**
 * Signal to the live-update plugin that the app booted successfully.
 *
 * This is required whenever auto-updates are enabled: after applying a new
 * bundle the plugin waits for notifyAppReady(), and if it never arrives it
 * rolls back to the previous known-good bundle. Calling it on every launch is
 * safe even when no update is pending. No-op on the web build.
 */
export async function initLiveUpdates(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await CapacitorUpdater.notifyAppReady();
  } catch (err) {
    // Non-fatal — the app keeps running on its built-in bundle.
    console.warn('[liveUpdates] notifyAppReady failed', err);
  }
}
