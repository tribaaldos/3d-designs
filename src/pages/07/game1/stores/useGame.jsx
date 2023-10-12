
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware';

export default create(subscribeWithSelector((set) => {

    return {

        blocksCount: 3,
        blocksSeed: 0,

        //Phases
        phase: 'ready',

        start: () => {
            set((state) => {
                if (state.phase === 'ready')
                    return { phase: 'playing', starttime: Date.now() }
                return {}
            })
        },

        restart: () => {
            set((state) => {
                if (state.phase === 'playing' || state.phase === 'ended')
                    return { phase: 'ready', blockSeed: Math.random() }

                return {}
            })
        },

        end: () => {
            set((state) => {
                if (state.phase === 'playing')
                    return { phase: 'ended', endTime: Date.now() }

                return {}
            })
        },
        startTime: 0,
        endTime: 0,
    }
}))