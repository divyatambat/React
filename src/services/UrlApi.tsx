import axios from "axios"

const instance = axios.create({ baseURL: "http://localhost:8000" })

const addDelay = (data: any): Promise<any> =>
    new Promise((res) =>
        setTimeout(() => {
            res(data)
        }, 700)
    )
export const GET = (url: string, params?: any) => {
    return instance.get(url, { params }).then((res) => addDelay(res.data))
}
export const PATCH = (url: string, body: any) => {
    return instance.patch(url, body).then((res) => addDelay(res.data))
}
export const POST = (url: string, body: any) => {
    return instance.post(url, body).then((res) => addDelay(res.data))
}
export const DELETE = (url: string) => {
    return instance.delete(url).then((res) => addDelay(res.data))
}