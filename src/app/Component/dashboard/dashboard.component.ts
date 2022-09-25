import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Model/movie';
import { DataService } from 'src/app/Service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  latestMovie:any;
  popularMovies !: Movie;
  nowPlayingMovies !: Movie;
  topRatedMovies !: Movie;
  upComingMovies !: Movie;
  trendingMovies !: Movie;
  originals !: Movie;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getLatestMovie();
    this.getPopularMovies();
    this.getNowPlayingMovies();
    this.getTopRatedmovies();
    this.getUpComingMovies();
    this.getTrendingMovies();
    this.getOriginals();
  }

  getLatestMovie(){
    this.dataService.getLatestMovie().subscribe(res =>{
      this.latestMovie = res;
    }, err =>{
      console.log('Not able to get latest movie.', err);
    })
  }
  getPopularMovies(){
    this.dataService.getPopularMovies().subscribe(res =>{
      this.nowPlayingMovies = this.modifyData(res);
    }, err =>{
      console.log('Error while fetching the data', err);
    })
  }
  getTopRatedmovies(){
    this.dataService.getTopRatedMovies().subscribe(res =>{
      this.topRatedMovies = this.modifyData(res);
    }, err =>{
      console.log('Error while fetching the data', err);
    })
  }
  getNowPlayingMovies(){
    this.dataService.getNowPlayingMovies().subscribe(res =>{
      this.nowPlayingMovies = this.modifyData(res);
    }, err =>{
      console.log('Error while fetching the data', err);
    })
  }
  getUpComingMovies(){
    this.dataService.getUpcomingMovies().subscribe(res =>{
      this.upComingMovies = this.modifyData(res);
    }, err =>{
      console.log('Error while fetching the data', err);
    })
  }
  getTrendingMovies(){
    this.dataService.getTrendingMovies().subscribe(res =>{
      this.trendingMovies = this.modifyData(res);
    }, err =>{
      console.log('Error while fetching the data', err);
    })
  }
  getOriginals(){
    this.dataService.getOriginals().subscribe(res =>{
      this.originals = this.modifyData(res);
    }, err =>{
      console.log('Error while fetching the data', err);
    })
  }
  modifyData(movies: Movie): Movie{
    if(movies.results){
      movies.results.forEach(elem =>{
        elem.backdrop_path = 'https://image/tmdb.org/t/p/original'+elem.backdrop_path+'api_key?'+environment.api_key;
        if(!elem.title){
          elem.title = elem?.name;

        }
      })
    }
    return movies;
  }
}
