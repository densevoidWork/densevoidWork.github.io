const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addNunjucksFilter("isArrayContain", function(array, value) {
        if (Array.isArray(array)) {
            return array.includes(value);
        }

        return false;
    });

    eleventyConfig.addNunjucksFilter("goodsByGroup", function(goods, group) {
        if (Array.isArray(goods)) {
            return goods.filter((good) => {
                if (Array.isArray(good.groups)) {
                    return good.groups.includes(group);
                }
                return false;
            });
        }
        return [];
    });
};