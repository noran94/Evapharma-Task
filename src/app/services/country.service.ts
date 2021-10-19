import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  url = 'country';
  constructor(private http: HttpClient) { }
  getCountries() {
    return this.http.get(this.url);
  }
  getCountryByID(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  addCountry(country:Country) {
    return this.http.post(this.url, country);

  }
  editCountry(country: Country) {
    return this.http.put(`${this.url}`, country);

  }
  deleteCountry(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
