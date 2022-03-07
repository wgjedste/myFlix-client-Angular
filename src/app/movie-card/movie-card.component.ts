/**Displays Single Movies */
import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService, AddFavoriteMovieService, DeleteFavoriteMovieService  } from '../fetch-api-data.service'
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component'
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: GetAllMoviesService,
    public dialog: MatDialog,
    public fetchApiData2: AddFavoriteMovieService,
    public fetchApiData3: DeleteFavoriteMovieService,
    public snackBar: MatSnackBar,
    public buttonModule: MatButtonModule
    ) { }

ngOnInit(): void {
  this.getMovies();
}

/**This fetches movies from Rest API */
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies; 
    });
  }
  // add return note

  /**
   * 
   * @param title 
   * @param imagepath 
   * @param description 
   * @param director 
   * @param genre 
   */

  showDetailsDialog(title: string, imagepath: string, description: string, director: string, genre: string): void {
    this.dialog.open(DetailsDialogComponent, {
      data: { title, imagepath, description, director, genre },
      width: '350px',
    });
  }


  /**
   * 
   * @param name 
   * @param description 
   */
  showGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { name, description },
      width: '350px',
    });
  }

  /**
   * 
   * @param name 
   * @param bio 
   * @param birth 
   * @param death 
   */
  showDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { name, bio, birth, death },
      width: '350px',
    });
  }
/**
 * 
 * @param id 
 * @param title 
 */
  addFavorite(id: string, title: string): void {
    this.fetchApiData2.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open(`${title} has been added to your favorites!`, 'OK', {
        duration: 2000,
      });
    });
  }

}

