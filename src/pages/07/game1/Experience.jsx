import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { useMemo, useState, useRef } from 'react';

import Lights from './Lights.jsx'
import Level from './Level.jsx'
import Player from './Player.jsx';

import useGame from './stores/useGame.jsx';

export default function Experience() {
    const blocksCount = useGame((state) => state.blocksCount)
    const blocksSeed = useGame(state => state.blocksSeed)
    return <>
        <color args={[ 'blue']} attach="background" />
        <OrbitControls makeDefault />
        <Physics debug={false}>
            <Lights />
            <Level count = { blocksCount } seed={ blocksSeed }/>
            <Player />
        </Physics>
    </>
}