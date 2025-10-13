import { Component } from '@angular/core';
import { NowPlaying } from '../now-playing/now-playing';

@Component({
  selector: 'app-footer',
  imports: [NowPlaying],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

}
