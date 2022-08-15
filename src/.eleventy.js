const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const svgContents = require("eleventy-plugin-svg-contents");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(svgContents);

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

    eleventyConfig.addNunjucksFilter("goodsByGroupFirstN", function(goods, group, count) {
        goods = eleventyConfig.getFilter("goodsByGroup")(goods, group);
        return goods.slice(0, count);
    });
};