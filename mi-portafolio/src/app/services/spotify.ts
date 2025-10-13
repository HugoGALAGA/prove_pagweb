import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  
  private clientId = environment.spotify.clientId;
  private clientSecret = environment.spotify.clientSecret;
  private accessToken: string | null = null;

  constructor(private http: HttpClient) { }

  private getAccessToken(): Observable<string> {
    if (this.accessToken) {
      return of(this.accessToken);
    }

    const authUrl = 'https://accounts.spotify.com/api/token';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    });
    const body = new HttpParams().set('grant_type', 'client_credentials');

    return this.http.post<any>(authUrl, body.toString(), { headers }).pipe(
      map(response => {
        this.accessToken = response.access_token;
        return this.accessToken!;
      }),
      catchError(error => {
        console.error('Error al obtener el token de acceso de Spotify', error);
        return of(''); 
      })
    );
  }

  getPlaylistTracks(playlistId: string): Observable<any> {
    return new Observable(observer => {
      this.getAccessToken().subscribe(token => {
        if (!token) {
          observer.error('No se pudo obtener el token de acceso de Spotify');
          return;
        }

        const tracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=1`;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        this.http.get(tracksUrl, { headers }).subscribe({
          next: data => observer.next(data),
          error: err => observer.error(err)
        });
      });
    });
  }
}