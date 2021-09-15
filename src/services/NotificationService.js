
import client from './HttpClient'

export default class NotificationService {
    static async sendUniformNotification(params) {
        let result = {}

        try {
            let api_name = "fcm/send"; 
            result = await client.postHeader(api_name, params) 
        } catch (error) {
            console.log("users GET API: " + e);
        }
        return result
    }
}