import React from 'react'
import { connect } from 'react-redux'
import { SPRITE_SIZE } from '../../config/constants'
import './styles.css'

function MapRow(props) {
    return <div className="row">
        {
            props.tiles.map( tile => <MapTile tile={tile} />)
        }
    </div>
}

function MapTile(props) {
    return <div 
    className={`tile ${props.tile}`}
    style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE
    }}
    >

    </div>
}
function Map(props) {
    return (
        <div style={{
            backgroundColor: 'green',
            width: '800px',
            height: '400px',
            border: '4px solid white',
        }}>
            {
                props.tiles.map( row => <MapRow tiles={row} /> )
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        tiles: state.map.tiles,
    }
}

export default connect(mapStateToProps)(Map)