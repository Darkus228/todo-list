// eslint-disable-next-line @typescript-eslint/no-var-requires
const gaben = require('./src/assets/images/gaben.jpeg');

module.exports = {
    purge: [],
    theme: {
        extend: {
            backgroundImage: theme => ({
                gaben: `url(${gaben})`,
            })
        },
    },
    variants: {},
    plugins: [],
};
