const plugins = [
    require('postcss-import')(),
    require('postcss-url')({
        url: 'rebase'
      }),
    require('postcss-nested')
];

module.exports = ({ file, options, env }) => {
    if(env === 'production') {
        plugins.push(require('autoprefixer')({
            remove: false
        }));
    }

    return {
        plugins
    };
};
