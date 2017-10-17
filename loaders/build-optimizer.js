const BuildOptimizer = require('@angular-devkit/build-optimizer').buildOptimizer;

module.exports = function (source) {
    let result = BuildOptimizer({
        content: source,
        emitSourceMap: true,
    });

    return result.content || source;
};