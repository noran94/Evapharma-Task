import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  url = 'city';
  constructor(private http: HttpClient) { }
  getCities() {
    return this.http.get(this.url);
  }
  getcityByCountryID(id: number) {
    return this.http.get(`${this.url+'/getcities'}/${id}`);
  }
  getcityByID(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  addcity(city:City) {
    return this.http.post(this.url, city);

  }
  editcity(city: City) {
    return this.http.put(`${this.url}`, city);

  }
  deletecity(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
