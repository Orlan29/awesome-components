import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CandidatesService} from "../../services/candidates.service";
import {Observable} from "rxjs";
import {Candidate} from "../../models/candidate.model";

@Component({
  selector: 'app-canditates-list',
  templateUrl: './canditates-list.component.html',
  styleUrls: ['./canditates-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanditatesListComponent implements OnInit{
  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;
  constructor(private candidateService: CandidatesService) {}
  ngOnInit(): void {
    this.initObservables();
    this.candidateService.getCandidatesFormServer();
  }

  private initObservables(): void {
    this.loading$ = this.candidateService.loading$;
    this.candidates$ = this.candidateService.candidates$;
  }
}
