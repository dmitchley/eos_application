
import EnvironmentStore from '../store/EnvironmentStore'
import RNFetchBlob from 'rn-fetch-blob';
import * as Constant from '../constants/constants'

export default class HttpClient {

    // return url with baseUrl
    static url(path) {
        var host = EnvironmentStore.getApiHost('test')
        return host + "/" + path
    }

    // get method
    static async get(path) {
        try {
            let url = this.url(path);
            // console.log(url)
            let response

            await RNFetchBlob.fetch('GET', url, {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
                .then((res) => {
                    response = res.json();
                })
                .catch((errorMessage, statusCode) => {
                    response = null;
                    console.log("Service issue:", errorMessage)
                })
            return response
        } catch (error) {
            console.log("Service issue:", error)
        }
    }

    // post method
    static async post(path, data) {
        try {
            let url = this.url(path)
            let response

            await RNFetchBlob.fetch('POST', url, {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, data)
                .then((res) => {
                    response = res.text();
                })
                .catch((errorMessage, statusCode) => {
                    response = null;
                    console.log("Service issue:", errorMessage)
                })
            return response
        } catch (error) {
            console.log("Service issue:", error)
        }
    }

    static async postHeader(path, data) {
        try {
            let url = this.url(path);
            let response

            await RNFetchBlob.fetch('POST', url, {
                'Content-Type': 'application/json',
                'Authorization': 'key=' + Constant.serverToken,
            }, data)
                .then((res) => {
                    response = res.data;
                })
                .catch((errorMessage, statusCode) => {
                    response = null;
                    console.log("Service issue:", errorMessage)
                })
            return response
        } catch (error) {
            console.log("Service issue:", error)
        }
    }
}

