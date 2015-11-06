module.exports = {

    /**
     * @returns {String}
     */
    generate: function () {
        return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    }
};
