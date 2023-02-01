const plugins = [
    require('postcss-import')(),
    require('postcss-mixins')({mixins: {
        media_breakpoint_mobile: {
            '@media (max-width: 743px)': {
                '@mixin-content': {},
            }
        },
        media_breakpoint_tablet: {
            '@media (min-width: 744px) and (max-width: 1279px)': {
                '@mixin-content': {},
            }
        },
        media_breakpoint_small_desktop: {
            '@media (min-width: 1280px) and (max-width: 1919px)': {
                '@mixin-content': {},
            }
        },
        media_breakpoint_normal_desktop: {
            '@media (min-width: 1920px)': {
                '@mixin-content': {},
            }
        },
        media_breakpoint_below_desktop: {
            '@media (max-width: 1279px)': {
                '@mixin-content': {},
            }
        }
    }}),
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
