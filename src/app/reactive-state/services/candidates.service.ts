import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Candidate} from "../models/candidate.model";

@Injectable()
export class CandidatesService {
  // pattern private + getter
  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _candidates$ = new BehaviorSubject<Candidate[]>([]);
  get candidates$(): Observable<Candidate[]> {
    return this._candidates$.asObservable();
  }
  constructor(private http: HttpClient) {}

  private setLoadingStatus(loading: boolean): void {
    this._loading$.next(loading);
  }
}
