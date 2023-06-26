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

  getMonthNumber(month: string): string {
    // example: from "Jun" to 6
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
                    'Nov', 'Dec'];
    const monthNumber = months.indexOf(month) + 1;
    return monthNumber < 10 ? `0${monthNumber}` : monthNumber.toString();
  }
  
  formatDate(date: string): string {
    // example: from "Sun Jun 13 2021 16:19:00 GMT+0300" to "13/05/2021 16:19:00 öö" (öö = öğleden önce = AM, ös = öğleden sonra = PM)
    const dateParts = date.split(' ');
    const day = dateParts[2];
    const month = this.getMonthNumber(dateParts[1]);
    const year = dateParts[3];
    const time = dateParts[4];
    const parsedDate = `${day}/${month}/${year} ${time}`;
    return parsedDate;
  }
}
