import CompetenciesModule from "~/repository/modules/competencies";
import ExtracurricularsModule from "~/repository/modules/extracurriculars";
import AuthModule from "~/repository/modules/auth";

interface IApiInstance {
    competencies: CompetenciesModule;
    extracurriculars: ExtracurricularsModule;
    auth: AuthModule;
}

export default defineNuxtPlugin((nuxtApp) => {
    const { apiBaseUrl } = useRuntimeConfig().public;
    if (!apiBaseUrl) {
        throw new Error("API base URL is not defined in runtime config. Please check your environment variables.");
    }

    const modules: IApiInstance = {
        competencies: new CompetenciesModule(apiBaseUrl as string),
        extracurriculars: new ExtracurricularsModule(apiBaseUrl as string),
        auth: new AuthModule(apiBaseUrl as string),
    };

    return {
        provide: {
            api: modules,
        },
    };
});
