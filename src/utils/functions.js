const sortAscByKey = (key) => { // note: this logic sorts by alphabetical order (asc) (and key arg should always be string type)
    return (a, b) => {
        if (a[key].toLowerCase() < b[key].toLowerCase()) {
            return -1
        } else if (a[key].toLowerCase() > b[key].toLowerCase()) {
            return 1
        }
        return 0
    }
}

const normalize = (string) => {
    return string.toLowerCase().normalize('NFD').replace(/[\s\u0300-\u036f]/g, '') // note: regex to remove accents and blank spaces (better filtering UX)
}

export {
    sortAscByKey,
    normalize
}
