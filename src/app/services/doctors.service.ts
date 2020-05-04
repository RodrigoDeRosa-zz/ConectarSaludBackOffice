/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { BaseService as __BaseService } from './base.service';
import { AppConfigService as __Configuration } from '../providers/app-config.service';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';

import {RestResponseOfPagedResourcesOfDoctors} from '../models/rest-response-of-paged-resources-of-doctors';

/**
 * Servicios para el alta,baja y modificacion de los roles
 */
@Injectable({
  providedIn: 'root',
})
class DoctorsService extends __BaseService {
  static readonly getAllRolesUsingGETPath = '/doctors';
  static readonly PostRolPath = '/doctors';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `RolService.GetAllRolesUsingGETParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `size`:
   *
   * - `page`:
   *
   * - `nombre`: Ingrese el identificador del Rol
   *
   * - `id`: Ingrese el id del rol
   *
   * - `descripcion`: Ingrese la descripcion del rol
   *
   * - `baja`: Ingrese el estado del rol, true activo, false desactivado
   *
   * @return OK
   */
  getAllRolesUsingGETResponse(params: DoctorsService.GetAllRolesUsingGETParams): __Observable<__StrictHttpResponse<RestResponseOfPagedResourcesOfDoctors>> {
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
}

export { DoctorsService }


