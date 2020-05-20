import { Injectable } from '@angular/core';
import {Observable as __Observable} from 'rxjs/internal/Observable';
import {StrictHttpResponse as __StrictHttpResponse} from '../strict-http-response';

import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {filter as __filter} from 'rxjs/operators';
import {map as __map} from 'rxjs/internal/operators/map';
import {BaseService as __BaseService} from './base.service';
import {AppConfigService as __Configuration} from '../providers/app-config.service';

import { RestResponseOfDoctorConsultation } from '../models/rest-response-of-doctor-consultation';

@Injectable({
  providedIn: 'root'
})
class ConsultationService extends __BaseService {

  static readonly GetConsultationsGETPath = '/consultations';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Request a new consultation
   * @param params The `ConsultationService.GetConsultationGETParams` containing the following parameters:
   *
   * - `sort`:
   *
   * @return OK
   */
  getConsultationGETResponse(params: ConsultationService.GetConsultationGETParams): __Observable<__StrictHttpResponse<RestResponseOfDoctorConsultation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.doctor != null) __params = __params.set('doctor', params.doctor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `${ConsultationService.GetConsultationsGETPath}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponseOfDoctorConsultation>;
      })
    );
  }

  /**
   * Request a new consultation
   * @param params The `ConsultationService.GetConsultationGETParams` containing the following parameters:
   *
   * - `sort`:
   *
   * @return OK
   */
  getConsultationGET(params: ConsultationService.GetConsultationGETParams): __Observable<RestResponseOfDoctorConsultation> {
    return this.getConsultationGETResponse(params).pipe(
      __map(_r => _r.body as RestResponseOfDoctorConsultation)
    );
  }
}

module ConsultationService {

  /**
   * Parameters for getConsultationGET
   */
  export interface GetConsultationGETParams {
    doctor: string;
  }
}

export { ConsultationService }
