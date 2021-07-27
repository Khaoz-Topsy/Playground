const path = require('path');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const moveFile = require('move-file');

const dirName = 'dist';
const distPath = path.resolve(__dirname, dirName);

const packageVersion = require('./package.json').version || '1.0.0';

module.exports = (env, argv) => {
    return {
        mode: argv.mode === 'production' ? 'production' : 'development',
        entry: [
            './js/custom.js',
        ],
        plugins: [
            new HandlebarsPlugin({
                // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), 'app', 'src', '**', '*.hbs'),
                entry: path.join(process.cwd(), 'handlebar', '*.hbs'),
                // output path and filename(s). This should lie within the webpacks output-folder
                // if ommited, the input filepath stripped of its extension will be used
                output: path.join(process.cwd(), '[name].html'),
                // you can also add a [path] variable, which will emit the files with their relative path, like
                // output: path.join(process.cwd(), 'build', [path], '[name].html'),

                // // data passed to main hbs template: `main-template(data)`
                // data: require('./webpack/data/project.json'),
                // or add it as filepath to rebuild data on change using webpack-dev-server
                data: path.join(__dirname, 'project.json'),

                // globbed path to partials, where folder/filename is unique
                partials: [
                    path.join(process.cwd(), 'handlebar', '*', '*.hbs')
                ],

                // register custom helpers. May be either a function or a glob-pattern
                helpers: {
                    nameOfHbsHelper: Function.prototype,
                    date: require('./handlebar/helpers/date.helper'),
                    version: require('./handlebar/helpers/version.helper')(packageVersion)
                },

                // hooks
                // getTargetFilepath: function (filepath, outputTemplate) {},
                // getPartialId: function (filePath) {}
                onBeforeSetup: function (Handlebars) { },
                onBeforeAddPartials: function (Handlebars, partialsMap) { },
                onBeforeCompile: function (Handlebars, templateContent) { },
                onBeforeRender: function (Handlebars, data, filename) { },
                onBeforeSave: function (Handlebars, resultHtml, filename) { },
                onDone: function (Handlebars, filename) { }
            }),
        ],
    };
};