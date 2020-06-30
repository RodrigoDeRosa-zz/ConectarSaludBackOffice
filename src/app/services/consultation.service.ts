import { Injectable } from '@angular/core';
import {Observable as __Observable} from 'rxjs/internal/Observable';
import {StrictHttpResponse as __StrictHttpResponse} from '../strict-http-response';

import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {filter as __filter} from 'rxjs/operators';
import {map as __map} from 'rxjs/internal/operators/map';
import {BaseService as __BaseService} from './base.service';
import {AppConfigService as __Configuration} from '../providers/app-config.service';

import { RestResponseOfDoctorConsultation } from '../models/rest-response-of-doctor-consultation';
import { RestResponseOfPagedResourcesOfConsultations } from '../models/rest-response-of-paged-resources-of-consultations';

@Injectable({
  providedIn: 'root'
})
class ConsultationService extends __BaseService {

  static readonly GetConsultationsGETPath = '/consultations';
  static readonly GetConsultationsByDoctorGETPath = '/doctors/{id}/consultations/history';

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

  /**
   * @param params The `ConsultationService.getAllConsultationsByDoctorUsingGET` containing the following parameters:
   *
   * - `doctorId`: string
   *
   * @return OK
   */
  getAllConsultationsByDoctorUsingGETResponse(params: ConsultationService.GetAllConsultationsUsingGETParams): __Observable<__StrictHttpResponse<RestResponseOfPagedResourcesOfConsultations>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `${ConsultationService.GetConsultationsByDoctorGETPath}`.replace('{id}', params.doctorId),
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponseOfPagedResourcesOfConsultations>;
      })
    );
  }

  /**
   * Request all doctors
   * @param params The `ConsultationService.getAllConsultationsByDoctorUsingGET` containing the following parameters:
   *
   * - `doctorId`: string
   *
   * @return OK
   */
  getAllConsultationsByDoctorUsingGET(params: ConsultationService.GetAllConsultationsUsingGETParams): __Observable<RestResponseOfPagedResourcesOfConsultations> {
    return this.getAllConsultationsByDoctorUsingGETResponse(params).pipe(
      __map(_r => _r.body as RestResponseOfPagedResourcesOfConsultations)
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

  /**
   * Parameters for GetAllConsultationsUsingGETParams
   */
  export interface GetAllConsultationsUsingGETParams {
    doctorId: string;
  }
}

export { ConsultationService }
