class HttpFactory {
    protected readonly API_VERSION: string = "v1";
    protected readonly API_URL: string = "";

    constructor(apiBaseUrl: string) {
        this.API_URL = `${apiBaseUrl}/${this.API_VERSION}`;
    }

    async request<T>(url: string, options: RequestInit): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            try {
                const response = await fetch(url, options);
                const result = await response.json();

                if (result.success) {
                    resolve(result);
                } else {
                    resolve(result);
                }
            } catch (e: any) {
                const error = {
                    success: false,
                    error: e.toString(),
                };
                resolve(error as any);
            }
        });
    }
}

export default HttpFactory;
