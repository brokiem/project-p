// @vitest-environment nuxt
import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
// @ts-ignore
import AdminArticleCard from "~/components/AdminArticleCard.vue";
import { ArticleType } from "~/utils/articles";

test("AdminArticleCard", async () => {
    // Mount the component
    const wrapper = mount(AdminArticleCard, {
        props: {
            id: 1,
            imageUrl: "https://example.com/image.jpg",
            title: "Test Title",
            summary: "Test Summary",
            content: {},
            authorUuid: "test-uuid",
            createdAt: "2022-01-01T00:00:00Z",
            updatedAt: "2022-01-01T00:00:00Z",
            articleType: ArticleType.NEWS,
            flags: 0,
        },
    });

    // Check if the component is a Vue instance
    expect(wrapper.vm).toBeTruthy();

    // Check if the title is rendered correctly
    expect(wrapper.find("h3").text()).toBe("Test Title");

    // Check if the summary is rendered correctly
    expect(wrapper.find("p").text()).toBe("Test Summary");

    // Check if the content is rendered correctly
    expect(wrapper.vm.content).toEqual({});

    // Check if the author UUID is rendered correctly
    expect(wrapper.vm.authorUuid).toBe("test-uuid");

    // Check if the created at date is rendered correctly
    expect(wrapper.vm.createdAt).toBe("2022-01-01T00:00:00Z");

    // Check if the updated at date is rendered correctly
    expect(wrapper.vm.updatedAt).toBe("2022-01-01T00:00:00Z");

    // Check if the article type is rendered correctly
    expect(wrapper.vm.articleType).toBe(ArticleType.NEWS);

    // Check if the flags are rendered correctly
    expect(wrapper.vm.flags).toBe(0);
});
