import {Draggable, Map, Marker, ZoomControl, Overlay} from "pigeon-maps";
import React, {useState} from "react";
import {Box, Button, IconButton, Paper, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import StockClassImage from '../../images/stock-class-image.png'
import CommonStyles from "../common/common-styles";
import {useNavigate} from "react-router-dom";

const StudioMap = (props) => {
    let navigate = useNavigate();

    const styles = CommonStyles();

    const {anchor, setAnchor, studioResults} = props

    const [center, setCenter] = useState([43.66455786200873, -79.39144763755495]) // Toronto as center
    const [zoom, setZoom] = useState(14.5)
    const [hue, setHue] = useState(0)

    const [openOverlay, setOpenOverlay] = useState(false);
    const [selectedStudio, setSelectedStudio] = useState({});

    return (
        <>
            <Typography align='center' variant={'h5'}>Drag the red marker to mark your location. Only closest Studios are shown.</Typography>
            <Map
                height={800}
                center={center}
                zoom={zoom}
                onBoundsChanged={({center, zoom}) => {
                    setCenter(center)
                    setZoom(zoom)
                }}
            >
                <ZoomControl/>
                {studioResults.map((studio) => (
                    <Marker
                        width={50}
                        anchor={[studio.latitude, studio.longitude]}
                        color={'green'}
                        onClick={() => {
                            setHue(hue + 20);
                            setOpenOverlay(!openOverlay);
                            setSelectedStudio(studio);
                        }}
                    />
                ))}

                <Draggable offset={[32, 51]} anchor={anchor} onDragEnd={setAnchor}>
                    <Marker
                        width={50}
                        color={'red'}
                    />
                </Draggable>

                <Overlay anchor={[selectedStudio.latitude, selectedStudio.longitude]} offset={[100, 300]}>
                    {openOverlay ?
                        <Paper>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 2
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>

                                    <Typography variant={'h4'}>{selectedStudio.name}</Typography>
                                    <Box sx={{marginRight: -2, marginTop: -2, position: 'relative'}}>
                                        <IconButton onClick={() => {
                                            setOpenOverlay(!openOverlay)
                                        }}><CloseIcon></CloseIcon></IconButton>
                                    </Box>
                                </Box>
                                <Typography variant={'h6'}>{selectedStudio.address}</Typography>
                                <Typography variant={'h6'}>{selectedStudio.phone_number}</Typography>
                                <Button variant={'outlined'} fullWidth sx={{margin: 1}}
                                onClick={() => {window.location.assign(selectedStudio.map_link)}}
                                >Show on Google Map</Button>
                                <Button variant={'contained'} fullWidth
                                        onClick={() => {window.location.assign(selectedStudio.direction_link)}}
                                >Get directions via Google Map</Button>
                            </Box>
                        </Paper>
                        : <></>}
                </Overlay>


            </Map>
        </>
    )

}

export default StudioMap;