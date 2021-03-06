import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs";

import { AZURE_CONFIG } from "../config/azure-config";
import { USER_MESSAGES } from "../messages/messages";
import { OFFICE_URLS } from "../office/office-urls";

@Injectable()
export class GraphService {

    private http: Http;
    private accessToken: string | null;

    constructor(http: Http) {
        this.http = http;
    }

    public isUserAuthenticated = (): Promise<any> => {
        let p = new Promise<any>((resolve: Function, reject: Function) => {
            let token: string | null = localStorage.getItem("access_token");
            this.accessToken = token;

            if (this.accessToken === null) {
                reject(USER_MESSAGES.no_access_token);
            }

            this.getRequestPromise(OFFICE_URLS.me_profile_url)
                .then((data: any) => {
                    if (data) {
                        resolve();
                    } else {
                        reject(USER_MESSAGES.no_access_token);
                    }
                })
                .catch((err) => {
                    reject(USER_MESSAGES.fail_graph_api + " " + err);
                });
        });

        return p;
    }

    public getRequestPromise = (reqUrl: string): Promise<any> => {
        let p = new Promise<any>((resolve: Function, reject: Function) => {
            let tokenPromise = this.tokenPromise(AZURE_CONFIG.endpoints.graphApiUri);

            tokenPromise.then((token: string) => {
                let headers = new Headers();
                headers.append("Authorization", "Bearer " + token);

                this.http.get(AZURE_CONFIG.endpoints.graphApiUri + reqUrl, { headers: headers })
                    .map((res: any) => res.json())
                    .subscribe(
                    (res: any) => resolve(res),
                    (error: any) => {
                        console.error(error);
                        reject(error);
                    });
            });
        });

        return p;
    };

    public getPhotoRequestPromise = (reqUrl: string): Promise<any> => {
        let p = new Promise<any>((resolve: Function, reject: Function) => {
            let tokenPromise = this.tokenPromise(AZURE_CONFIG.endpoints.graphApiUri);
            tokenPromise.then((token: string) => {
                let request = new XMLHttpRequest();
                request.open("GET", AZURE_CONFIG.endpoints.graphApiUri + reqUrl);
                request.setRequestHeader("Authorization", "Bearer " + token);
                request.responseType = "blob";
                request.onload = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        let reader = new FileReader();
                        reader.onload = () => {
                            resolve(reader.result);
                        };

                        reader.readAsDataURL(request.response);
                    } else {
                        reject(USER_MESSAGES.fail_graph_api);
                    }
                };

                request.send(null);
            });
        });

        return p;
    };

    private tokenPromise = (endpoint: string): Promise<string> => {
        let p = new Promise<string>((resolve: Function, reject: Function) => {
            let token = window.localStorage.getItem("access_token");
            if (token && token !== "undefined") {
                resolve(token);
            } else {
                reject(USER_MESSAGES.no_access_token);
            }
        });

        return p;
    };
}
