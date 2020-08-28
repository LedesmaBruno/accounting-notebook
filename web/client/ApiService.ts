import fetch from "isomorphic-fetch";
import {APP_LANDING} from "../routes";
import Router from "next/router";

export default class ApiService {

    public static async fetch(resource: string, method?: string, body?: any, headers?: Record<string, string>): Promise<Response> {
        return await fetch(resource, {
            headers: headers ? headers : {'Content-Type': 'application/json'},
            credentials: "same-origin",
            method: method || 'GET',
            body: headers ? body : JSON.stringify(body)
        }).then(response => {
            if (response.status == 401) {
                Router.push(APP_LANDING);
                return Promise.reject();
            }
            return response;
        });
    }
}
