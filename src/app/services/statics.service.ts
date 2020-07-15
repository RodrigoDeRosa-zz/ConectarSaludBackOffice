/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { BaseService as __BaseService } from './base.service';
import { AppConfigService as __Configuration } from '../providers/app-config.service';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';

import {RestResponseOfResourcesOfStaticsScore} from '../models/rest-response-of-resources-of-statics-score';
import {RestResponseOfResourcesOfConsultationsStatistics} from '../models/rest-response-of-resources-of-consultations-statics';

/**
 * ABM doctors services
 */
@Injectable({
  providedIn: 'root',
})
class StaticsService extends __BaseService {
  static readonly getAllStaticsScoreUsingGETPath = '/statistics/scores';
  static readonly getAllConsultationsUsingGETPath = '/statistics/specialties';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  getAllStaticsScoreGETResponse(params: StaticsService.getAllStaticsScoreGETParams): __Observable<__StrictHttpResponse<RestResponseOfResourcesOfStaticsScore>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.doctor_id != null) __params = __params.set('doctor_id', params.doctor_id.toString());
    if (params.from_date != null) __params = __params.set('from_date', params.from_date.toString());
    if (params.to_date != null) __params = __params.set('to_date', params.to_date.toString());
    if (params.specialty != null) __params = __params.set('specialty', params.specialty.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `${StaticsService.getAllStaticsScoreUsingGETPath}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponseOfResourcesOfStaticsScore>;
      })
    );
  }

  getAllStaticsScoreUsingGET(params: StaticsService.getAllConsultationsGETParams): __Observable<RestResponseOfResourcesOfStaticsScore> {
    return this.getAllStaticsScoreGETResponse(params).pipe(
      __map(_r => _r.body as RestResponseOfResourcesOfStaticsScore)
    );
  }

  getAllConsultationsGETResponse(params: StaticsService.getAllConsultationsGETParams): __Observable<__StrictHttpResponse<RestResponseOfResourcesOfConsultationsStatistics>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.from_date != null) __params = __params.set('from_date', params.from_date.toString());
    if (params.to_date != null) __params = __params.set('to_date', params.to_date.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `${StaticsService.getAllConsultationsUsingGETPath}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponseOfResourcesOfConsultationsStatistics>;
      })
    );
  }

  getAllConsultationsGET(params: StaticsService.getAllConsultationsGETParams): __Observable<RestResponseOfResourcesOfConsultationsStatistics> {
    return this.getAllConsultationsGETResponse(params).pipe(
      __map(_r => _r.body as RestResponseOfResourcesOfConsultationsStatistics)
    );
  }
}

module StaticsService {

  /**
   * Parameters for  getAllStaticsScoreGETParams
   */
  export interface  getAllStaticsScoreGETParams {
    doctor_id?: string;
    from_date?: string;
    to_date?: string;
    specialty?: string;
  }

  /**
   * Parameters for  getAllConsultationsGETParams
   */
  export interface  getAllConsultationsGETParams {
    from_date?: string;
    to_date?: string;
  }

}

export { StaticsService }


