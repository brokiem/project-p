// @vitest-environment nuxt
import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
// @ts-ignore
import AdminArticlesContainer from "~/components/AdminArticlesContainer.vue";

test("AdminArticlesContainer", async () => {
    // Mount the component
    const wrapper = mount(AdminArticlesContainer, {
        propsData: {
            displayNews: true,
            newsStartingIndex: 0,
            numberOfNewsToDisplay: 3,
            displayAnnouncements: true,
            announcementsStartingIndex: 0,
            numberOfAnnouncementsToDisplay: 3,
            searchValue: null,
        },
    });

    // Check if the component is a Vue instance
    expect(wrapper.vm).toBeTruthy();

    // Check default data values
    expect(wrapper.vm.isLoading).toBe(true);
    expect(wrapper.vm.announcements).toEqual([]);
    expect(wrapper.vm.news).toEqual([]);

    // Check default props values
    expect(wrapper.vm.displayNews).toBe(true);
    expect(wrapper.vm.newsStartingIndex).toBe(0);
    expect(wrapper.vm.numberOfNewsToDisplay).toBe(3);
    expect(wrapper.vm.displayAnnouncements).toBe(true);
    expect(wrapper.vm.announcementsStartingIndex).toBe(0);
    expect(wrapper.vm.numberOfAnnouncementsToDisplay).toBe(3);
    expect(wrapper.vm.searchValue).toBe(null);
});
