module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ]
        }
    }
}

// overrides the configuration of create react app