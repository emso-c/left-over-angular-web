import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  getCurrentDate(): string {
    return new Date().toLocaleString('en-US', {
      weekday: 'short',   // Short weekday name (e.g., Sun)
      month: 'short',     // Short month name (e.g., Jun)
      day: '2-digit',     // Day of the month with leading zeros (e.g., 11)
      year: 'numeric',    // Full year (e.g., 2023)
      hour: '2-digit',    // Hours in 24-hour format with leading zeros (e.g., 16)
      minute: '2-digit',  // Minutes with leading zeros (e.g., 19)
      second: '2-digit',  // Seconds with leading zeros (e.g., 00)
      hour12: false,      // Hours in 12-hour format (e.g., 4 PM)
      timeZoneName: 'short'  // Short timezone name (e.g., GMT+0300)
    }).replaceAll(',', '');
  }
}
