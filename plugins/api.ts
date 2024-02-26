import CompetenciesModule from "~/repository/modules/competencies";
import ExtracurricularsModule from "~/repository/modules/extracurriculars";
import AuthModule from "~/repository/modules/auth";
import ArticlesModule from "~/repository/modules/articles";

interface IApiInstance {
    competencies: CompetenciesModule;
    extracurriculars: ExtracurricularsModule;
    auth: AuthModule;
    articles: ArticlesModule;
}

export default defineNuxtPlugin((nuxtApp) => {
    const { apiBaseUrl } = useRuntimeConfig().public;
    if (!apiBaseUrl) {
        throw new Error("API base URL is not defined in runtime config. Please check your environment variables.");
    }

    const modules: IApiInstance = {
        competencies: new CompetenciesModule(apiBaseUrl),
        extracurriculars: new ExtracurricularsModule(apiBaseUrl),
        auth: new AuthModule(apiBaseUrl),
        articles: new ArticlesModule(apiBaseUrl),
    };

    return {
        provide: {
            api: modules,
        },
    };
});
