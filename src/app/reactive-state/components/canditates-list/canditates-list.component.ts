import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CandidatesService} from "../../services/candidates.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-canditates-list',
  templateUrl: './canditates-list.component.html',
  styleUrls: ['./canditates-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanditatesListComponent implements OnInit{
  loading$!: Observable<boolean>;
  constructor(private candidateService: CandidatesService) {}
  ngOnInit(): void {
    this.loading$ = this.candidateService.loading$;
  }
}
