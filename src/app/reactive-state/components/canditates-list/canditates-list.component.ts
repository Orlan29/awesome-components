import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CandidatesService} from "../../services/candidates.service";
import {combineLatest, map, Observable, startWith} from "rxjs";
import {Candidate} from "../../models/candidate.model";
import {FormBuilder, FormControl} from "@angular/forms";
import {CandidateSearchType} from "../../enums/candidate-search-type.enum";

@Component({
  selector: 'app-canditates-list',
  templateUrl: './canditates-list.component.html',
  styleUrls: ['./canditates-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanditatesListComponent implements OnInit{
  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;
  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  searchTypeOptions!: {
    value: CandidateSearchType,
    label: string
  }[];

  constructor(private candidateService: CandidatesService,
              private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initForms();
    this.initObservables();
    this.candidateService.getCandidatesFormServer();
  }

  initForms(): void {
    this.searchCtrl = this.fb.control('');
    this.searchTypeCtrl = this.fb.control(CandidateSearchType.LASTNAME);
    // Ces valeurs vont servir à initialiser le formulaire
    this.searchTypeOptions = [
      { value: CandidateSearchType.LASTNAME, label: 'Nom' },
      { value: CandidateSearchType.FIRSTNAME, label: 'Prénom' },
      { value: CandidateSearchType.COMPANY, label: 'Entreprise' },
    ];
  }

  private initObservables(): void {
    this.loading$ = this.candidateService.loading$;
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    );
    const searchType$: Observable<CandidateSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    );
    this.candidates$ = combineLatest([
      search$,
      searchType$,
      this.candidateService.candidates$
    ]).pipe(
      map(([search, searchType, candidates]) => candidates.filter(candidate => (
        candidate[searchType]
          .toLowerCase()
          .includes(search as string))
      ))
    );
  }
}
