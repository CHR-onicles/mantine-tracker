module.exports = {
    plugins: {
        'postcss-preset-mantine': {},
        'postcss-simple-vars': {
            variables: {
                //! Can't use these because I can't reference them in styled components like so: "$mantine-breakpoint-xs"
                'mantine-breakpoint-xs': '36em', // 576px
                'mantine-breakpoint-sm': '48em', // 768px
                'mantine-breakpoint-md': '62em', // 992px
                'mantine-breakpoint-lg': '75em', // 1200px
                'mantine-breakpoint-xl': '88em', // 1408px
            },
        },
    },
};