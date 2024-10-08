import {
  HttpClient,
  HttpParameterCodec,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  DefaultGoogleCalendarEvent,
  GoogleCalendar,
  GoogleCalendarEventResponse,
} from '@utconnect/types';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models';
import { getEnv } from './partial';

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  // INJECT PROPERTIES
  private readonly http = inject(HttpClient);
  private readonly env = getEnv();

  // PRIVATE PROPERTIES
  private readonly url = this.env.baseUrl;

  // PUBLIC METHODS
  authenticate(uuid: string): Observable<ResponseModel<{ authUrl: string }>> {
    return this.http.get<ResponseModel<{ authUrl: string }>>(
      this.url + `v1/accounts/${uuid}/google-apis/calendar/authenticate`,
    );
  }

  authorize(uuid: string, auth_code: string): Observable<void> {
    return this.http.post<void>(
      this.url + `v1/accounts/${uuid}/google-apis/calendar/authorize`,
      { auth_code },
    );
  }

  revoke(uuid: string): Observable<void> {
    return this.http.post<void>(
      this.url + `v1/accounts/${uuid}/google-apis/calendar/revoke`,
      {},
    );
  }

  //* Only get calendars' name
  getCalendarList(uuid: string): Observable<ResponseModel<GoogleCalendar[]>> {
    return this.http.get<ResponseModel<GoogleCalendar[]>>(
      this.url + `v1/accounts/${uuid}/google-apis/calendar/calendars`,
    );
  }

  //* Get calendar's data
  getCalendarEvents(
    uuid: string,
    timeMin: string,
    timeMax: string,
  ): Observable<ResponseModel<GoogleCalendarEventResponse[]>> {
    const params = new HttpParams({
      encoder: new CustomHttpParamEncoder(),
      fromObject: {
        timeMin,
        timeMax,
        singleEvents: 1,
        timeZone: '+07:00',
      },
    });
    return this.http.get<ResponseModel<GoogleCalendarEventResponse[]>>(
      this.url + `v1/accounts/${uuid}/google-apis/calendar/calendars/events`,
      { params },
    );
  }

  create(
    uuid: string,
    calendarId: string,
    body: DefaultGoogleCalendarEvent,
  ): Observable<void> {
    return this.http.post<void>(
      this.url +
        `v1/accounts/${uuid}/google-apis/calendar/calendars/${calendarId}/events`,
      body,
    );
  }

  update(
    uuid: string,
    calendarId: string,
    eventId: string,
    body: DefaultGoogleCalendarEvent,
  ): Observable<void> {
    return this.http.patch<void>(
      this.url +
        `v1/accounts/${uuid}/google-apis/calendar/calendars/${calendarId}/events/${eventId}`,
      body,
    );
  }

  remove(uuid: string, calendarId: string, eventId: string): Observable<void> {
    return this.http.delete<void>(
      this.url +
        `v1/accounts/${uuid}/google-apis/calendar/calendars/${calendarId}/events/${eventId}`,
    );
  }
}

// TODO: Remove
class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
