import * as R from 'ramda'
export const camelToDash = R.pipe(R.replace(/([a-z])([A-Z])/g, '$1-$2'), R.toLower)
