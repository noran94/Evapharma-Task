import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {

  constructor(private countryService: CountryService, private route: ActivatedRoute) { }
  country: Country = {} as Country;
  ngOnInit(): void {
    const countryID = this.route.snapshot.paramMap.get('id') || 0;
    this.countryService.getCountryByID(+countryID).subscribe((res: any) => {
      this.country = res;
    })
  }
}
