import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface VotesResponse { votes: number }

@Injectable()
export class VoterService {

  constructor(private http: HttpClient) {}

  getVotes () {
    return this.http.get<VotesResponse>('http://localhost:4201/api/votes')
        .pipe(map(data => data.votes));
  }

  addVote () {
    return this.http.get<VotesResponse>('http://localhost:4201/api/votes/increment')
        .pipe(map(data => data.votes));
  }

  removeVote() {
    return this.http.get<VotesResponse>('http://localhost:4201/api/votes/decrement')
        .pipe(map(data => data.votes));
  }
}
