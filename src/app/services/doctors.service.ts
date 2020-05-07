/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { BaseService as __BaseService } from './base.service';
import { AppConfigService as __Configuration } from '../providers/app-config.service';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';

import {RestResponseOfPagedResourcesOfDoctors} from '../models/rest-response-of-paged-resources-of-doctors';
import {DoctorDto} from '../models/doctor-dto';
import {Doctor} from '../models/doctor';

/**
 * ABM doctors services
 */
@Injectable({
  providedIn: 'root',
})
class DoctorsService extends __BaseService {
  static readonly getAllRolesUsingGETPath = '/doctors';
  static readonly PostDoctorPath = '/doctors';
  static readonly PatchDoctorPath = '/doctors';
  static readonly DeleteDoctorPath = '/doctors';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `DoctorsService.getAllRolesUsingGET` containing the following parameters:
   *
   * - `sort`:
   *
   * - `size`:
   *
   * - `page`:
   *
   * @return OK
   */
  getAllDoctorsUsingGETResponse(params: DoctorsService.GetAllRolesUsingGETParams): __Observable<__StrictHttpResponse<RestResponseOfPagedResourcesOfDoctors>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `${DoctorsService.getAllRolesUsingGETPath}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponseOfPagedResourcesOfDoctors>;
      })
    );
  }

  /**
   * Request all doctors
   * @param params The `DoctorsService.getAllRolesUsingGET` containing the following parameters:
   *
   * - `sort`:
   *
   * - `size`:
   *
   * - `page`:
   *
   * @return OK
   */
  getAllDoctorsUsingGET(params: DoctorsService.GetAllRolesUsingGETParams): __Observable<RestResponseOfPagedResourcesOfDoctors> {
    return this.getAllDoctorsUsingGETResponse(params).pipe(
      __map(_r => _r.body as RestResponseOfPagedResourcesOfDoctors)
    );
  }

  /**
   * Add new doctor
   * @param doctorDto doctorDto
   * @return OK
   */
  PostDoctorResponse(doctorDto: DoctorDto): __Observable<__StrictHttpResponse<Doctor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = doctorDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `${DoctorsService.PostDoctorPath}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Doctor>;
      })
    );
  }
  /**
   * Post new doctor
   * @param doctorDto doctorDto
   * @return OK
   */
  PostDoctor(doctorDto: DoctorDto): __Observable<Doctor> {
    return this.PostDoctorResponse(doctorDto).pipe(
      __map(_r => _r.body as DoctorDto)
    );
  }

  /**
   * Edit a doctor
   * @param doctorDto doctorDto
   * @return OK
   */
  PatchDoctorResponse(params: DoctorsService.EditParams): __Observable<__StrictHttpResponse<Doctor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.doctorDto;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `${DoctorsService.PatchDoctorPath}/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Doctor>;
      })
    );
  }
  /**
   * Edit a doctor
   * @param doctorDto doctorDto
   * @return OK
   */
  PatchDoctor(params: DoctorsService.EditParams): __Observable<Doctor> {
    return this.PatchDoctorResponse(params).pipe(
      __map(_r => _r.body as DoctorDto)
    );
  }

  /**
   * Delete a doctor
   * @param id doctor id
   * @return OK
   */
  DeleteDoctorResponse(id: string): __Observable<__StrictHttpResponse<Doctor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `${DoctorsService.DeleteDoctorPath}/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Doctor>;
      })
    );
  }
  /**
   * Delete a doctor
   * @param id doctor id
   * @return OK
   */
  DeleteDoctor(id: string): __Observable<Doctor> {
    return this.DeleteDoctorResponse(id).pipe(
      __map(_r => _r.body as DoctorDto)
    );
  }


}

module DoctorsService {

  /**
   * Parameters for getAllRolesUsingGET
   */
  export interface GetAllRolesUsingGETParams {
    sort?: string;
    size?: number;
    page?: number;
  }

  /**
   * Parameters for edit
   */
  export interface EditParams {

    /**
     * id
     */
    id: number;

    /**
     * categoriaPermisoDto
     */
    doctorDto: DoctorDto;
  }

}

export { DoctorsService }


