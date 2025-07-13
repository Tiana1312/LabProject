export class HealthCheckService {
    getStatus(): {status: string} {
        return {status: "ok, you are good to go"}
    }
}