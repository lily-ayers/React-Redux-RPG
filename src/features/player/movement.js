import store from '../../config/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT, WALKABLE_TILES } from '../../config/constants'

export default function handleMovement(player) {

    function getNewPosition(oldPos, direction) {
        switch(direction){
            case 'WEST':
                return [ oldPos[0] - SPRITE_SIZE, oldPos[1] ]
            case 'NORTH':
                return [ oldPos[0], oldPos[1] - SPRITE_SIZE ]
            case 'EAST':
                return [ oldPos[0] + SPRITE_SIZE, oldPos[1] ]
            case 'SOUTH':
                return [ oldPos[0], oldPos[1] + SPRITE_SIZE ]
            default:
                return [ oldPos[0] - SPRITE_SIZE, oldPos[1] ]

        }
    }

    function getSpriteLocation(direction, walkIndex) {
        switch(direction) {
            case 'EAST':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*1}px`
            case 'SOUTH':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*0}px`
            case 'WEST':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*2}px`
            case 'NORTH':
                return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*3}px`
        }
    }

    function getWalkIndex() {
        const walkIndex = store.getState().player.walkIndex
        console.log(walkIndex)
        return walkIndex >= 7 ? 0 : walkIndex + 1
    }

    function observeBoundaries(newPos) {
        return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
               (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
    }

    function observeObstacles(newPos) {
        const tiles = store.getState().map.tiles
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        const nextTile = tiles[y][x]
        return WALKABLE_TILES.includes(nextTile)
    }

    function dispatchMove(newPos, direction) {
        const walkIndex = getWalkIndex()
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: newPos,
                direction,
                walkIndex,
                spriteLocation: getSpriteLocation(direction, walkIndex)
            }
        })
    }

    function attemptMove(direction) {
        const oldPos = store.getState().player.position
        const newPos = getNewPosition(oldPos, direction)

        if(observeBoundaries(newPos) && observeObstacles(newPos)) {
            dispatchMove(newPos, direction)
        }
    }

    function handleKeyDown(e) {
        e.preventDefault()

        switch(e.keyCode) {
            case 37:
                return attemptMove('WEST')
            case 65:
                return attemptMove('WEST')
            case 38:
                return attemptMove('NORTH')
            case 87:
                return attemptMove('NORTH')
            case 39:
                return attemptMove('EAST')
            case 68:
                return attemptMove('EAST')
            case 40:
                return attemptMove('SOUTH')
            case 83:
                return attemptMove('SOUTH')
            default:
                console.log(e.keyCode)
        }
    }

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })
    return player
}