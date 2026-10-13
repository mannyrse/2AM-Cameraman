import { useReducer } from 'react'

const Z_BASE = 100 // matches --z-windows in tokens.css

const getActiveId = (windows) =>
    windows
        .filter((w) => !w.minimized)
        .reduce((top, w) => (!top || w.zIndex > top.zIndex ? w : top), null)?.appId

const initialState = { topZ: Z_BASE, windows: [] }

function reducer(state, action) {
    switch (action.type) {
        case 'open': {
            const existing = state.windows.find((w) => w.appId === action.appId)
            const z = state.topZ + 1

            // Singleton: opening an already-open app just focuses it
            if (existing) {
                return {
                    topZ: z,
                    windows: state.windows.map((w) =>
                        w.appId === action.appId ? { ...w, zIndex: z, minimized: false } : w
                    ),
                }
            }

            // New windows cascade so they don't stack exactly on top of each other
            const n = state.windows.length
            const win = {
                appId: action.appId,
                zIndex: z,
                minimized: false,
                position: { x: 140 + n * 32, y: 60 + n * 32 },
            }
            return { topZ: z, windows: [...state.windows, win] }
        }

        case 'focus': {
            const target = state.windows.find((w) => w.appId === action.appId)
            if (!target || target.zIndex === state.topZ) return state // already on top
            const z = state.topZ + 1
            return {
                topZ: z,
                windows: state.windows.map((w) =>
                    w.appId === action.appId ? { ...w, zIndex: z } : w
                ),
            }
        }

        case 'move':
            return {
                ...state,
                windows: state.windows.map((w) =>
                    w.appId === action.appId ? { ...w, position: action.position } : w
                ),
            }

        case 'minimize':
            return {
                ...state,
                windows: state.windows.map((w) =>
                    w.appId === action.appId ? { ...w, minimized: true } : w
                ),
            }

        case 'toggle': {
            const target = state.windows.find((w) => w.appId === action.appId)
            if (!target) return state

            // Already in front and visible: minimize it
            if (!target.minimized && getActiveId(state.windows) === action.appId) {
                return {
                    ...state,
                    windows: state.windows.map((w) =>
                        w.appId === action.appId ? { ...w, minimized: true } : w
                    ),
                }
            }

            // Minimized or behind other windows: restore and bring to front
            const z = state.topZ + 1
            return {
                topZ: z,
                windows: state.windows.map((w) =>
                    w.appId === action.appId ? { ...w, minimized: false, zIndex: z } : w
                ),
            }
        }

        case 'close':
            return {
                ...state,
                windows: state.windows.filter((w) => w.appId !== action.appId),
            }

        default:
            return state
    }
}

export function useWindowManager() {
    const [state, dispatch] = useReducer(reducer, initialState)

    const activeAppId = getActiveId(state.windows)

    return {
        windows: state.windows,
        activeAppId,
        openApp: (appId) => dispatch({ type: 'open', appId }),
        focusApp: (appId) => dispatch({ type: 'focus', appId }),
        moveApp: (appId, position) => dispatch({ type: 'move', appId, position }),
        minimizeApp: (appId) => dispatch({ type: 'minimize', appId }),
        toggleApp: (appId) => dispatch({ type: 'toggle', appId }),
        closeApp: (appId) => dispatch({ type: 'close', appId }),
    }
}