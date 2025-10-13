import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify';

@Component({
  selector: 'app-now-playing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './now-playing.html',
  styleUrl: './now-playing.css'
})
export class NowPlaying implements OnInit {

  private readonly playlistId = '5eO3ADY8AhdzxfLWvB54eO';

  track: any = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.spotifyService.getPlaylistTracks(this.playlistId).subscribe({
      next: (data) => {
        if (data && data.items && data.items.length > 0) {
          const firstTrack = data.items[0].track;
          this.track = {
            name: firstTrack.name,
            artist: firstTrack.artists.map((artist: any) => artist.name).join(', '),
            albumImageUrl: firstTrack.album.images[0].url,
            songUrl: firstTrack.external_urls.spotify
          };
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener la canción de Spotify', err);
        this.error = 'No se pudo cargar la canción.';
        this.isLoading = false;
      }
    });
  }
}