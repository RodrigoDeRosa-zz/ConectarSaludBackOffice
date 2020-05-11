import { Injectable } from '@angular/core';
import { HttpClient } from'@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private config: any;
  private rootUrl: string;

  constructor(private http: HttpClient) { }

  public loadConfig(){
    console.info("Loading configuraion...");
    return this.http.get('./assets/config/config.json')
      .toPromise()
      .then((data: any) => {
        console.info(data);
        this.config = data;
        this.rootUrl = data["urlBack"];
        console.log("Configuration loaded!");
      })
      .catch((err: any) => {
        console.error(err);
        console.info("Verify assets/config/config.json file is configured with urlBack key!!!")
      });
  }

  getConfig(){
    return this.config;
  }

  getRootUrl(){
    return this.rootUrl;
  }

}
