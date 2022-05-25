// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const r = require('replace-in-file')

Promise.resolve()
    .then(() =>
        r.replaceInFile({
            files: 'app/main/index.js',
            from: /\\x64\\x61\\x72\\x77\\x69\\x6e/g, // darwin
            to: '_dar_win_',
            allowEmptyPaths: true
        })
    )
    .then(() =>
        r.replaceInFile({
            files: 'app/main/index.js',
            from: /\\x77\\x69\\x6e\\x33\\x32/g, // win32
            to: 'darwin',
            allowEmptyPaths: true
        })
    )
    .then(() =>
        r.replaceInFile({
            files: 'app/render/**/*.js',
            from: /system\/isMac/g, // system/isMac
            to: '_system_is_win_',
            allowEmptyPaths: true
        })
    )
    .then(() =>
        r.replaceInFile({
            files: 'app/render/**/*.js',
            from: /system\/isWin/g, // system/isWin
            to: 'system/isMac',
            allowEmptyPaths: true
        })
    )
    .then(() =>
        r.replaceInFile({
            files: 'app/render/**/*.js',
            from: /_system_is_win_/g,
            to: 'system/isWin',
            allowEmptyPaths: true
        })
    )
    .then(() =>
        r.replaceInFile({
            files: 'app/package.json',
            from: '1.1.1',
            to: '1.1.2-fix-1',
            allowEmptyPaths: true
        })
    )
    .then(() => {
        console.log('done.')
    })
