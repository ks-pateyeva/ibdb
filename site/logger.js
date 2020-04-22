import isEqual from 'react-fast-compare';

const debugRelease = false;
const showLogs = false;

function mount(name, ...theArgs) {
    if ((process.env.devServer || debugRelease) && showLogs) {
        const style = [
            'background-color: #6eff9c;',
            'color: black;',
        ].join('');
        console.log("%c%s", style, `${name}: MOUNT`, ...theArgs);
    }
}

function update(name, ...theArgs) {
    if ((process.env.devServer || debugRelease) && showLogs) {
        const style = [
            'background-color: #f8ff6e;',
            'color: black;',
        ].join('');
        console.log("%c%s", style, `${name}: UPDATE`, ...theArgs);
    }
}

function render(name, ...theArgs) {
    if ((process.env.devServer || debugRelease) && showLogs) {
        const style = [
            'background-color: #6ee9ff;',
            'color: black;',
        ].join('');
        console.log("%c%s", style, `${name}: RENDER`, ...theArgs);
    }
}

function unmount(name, ...theArgs) {
    if ((process.env.devServer || debugRelease) && showLogs) {
        const style = [
            'background-color: #ff6eff;',
            'color: black;',
        ].join('');
        console.log("%c%s", style, `${name}: UNMOUNT`, ...theArgs);
    }
}

function debug(...theArgs) {
    if ((process.env.devServer || debugRelease) && showLogs) {
        const style = [
            'background-color: #ffc56e;',
            'color: black;',
        ].join('');
        console.log("%c%s", style, "DEBUG", ...theArgs);
    }
}

function error(...theArgs) {
    if ((process.env.devServer || debugRelease) && showLogs) {
        console.error(...theArgs);
    }
}

function shouldUpdate(name, show, props, nextProps, state, nextState) {
    if ((process.env.devServer || debugRelease) && showLogs) {
        const style = [
            'background-color: #c582ff;',
            'color: black;',
        ].join('');
        console.log("%c%s", style, `ShouldComponentUpdate: ${name}`);
        if (props && nextProps) {
            const propsKeys = Object.keys(nextProps);
            for (const key of propsKeys) {
                if (props[key] != nextProps[key]) {
                    if (!isEqual(props[key], nextProps[key])) {
                        console.log("%c%s", style, `${key}: deep compare not equal`);
                        if (show) {
                            console.log(props[key], nextProps[key]);
                        }
                    } else {
                        console.log("%c%s", style, `${key}: deep compare equal, shallow compare not equal`);
                        if (show) {
                            console.log(props[key], nextProps[key]);
                        }
                    }
                }
            }
        }
        if (state && nextState) {
            const stateKeys = Object.keys(nextState);
            for (const key of stateKeys) {
                if (state[key] != nextState[key]) {
                    if (!isEqual(state[key], nextState[key])) {
                        console.log("%c%s", style, `${key}: deep compare not equal`);
                        if (show) {
                            console.log(state[key], nextState[key]);
                        }
                    } else {
                        console.log("%c%s", style, `${key}: deep compare equal, shallow compare not equal`);
                        if (show) {
                            console.log(state[key], nextState[key]);
                        }
                    }
                }
            }
        }
        console.log("=========================================================");
    }
}

const logger = {
    mount,
    update,
    render,
    unmount,
    shouldUpdate,
    debug,
    error,

};

export default logger;