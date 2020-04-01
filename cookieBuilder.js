module.exports = (cookies = {}) => Object.entries(cookies)
    .reduce((acc, [key, value]) => `${acc}${key}=${value}; `, '')

