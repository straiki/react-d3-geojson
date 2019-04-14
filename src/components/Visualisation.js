import React, {useState} from "react";

import useDimensions from "../hooks/useDimensions";
import Map from "./Map";

const initRxRy = {rx: 337, ry: 773};

function Visualisation({geoData}) {
    const [ref, {width, height}] = useDimensions();

    const [mouseObj, setMouseObj] = useState({
        cx: 0,
        cy: 0,
        dragStart: false,
        rotate: true
    });
    const [delta, setDelta] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(200);

    const updateMap = e => {
        const {cx, cy, dragStart, rotate} = mouseObj;
        if (dragStart) {
            const {clientX, clientY} = e;
            setDelta({x: clientX - cx, y: clientY - cy});
            setMouseObj({cx: clientX, cy: clientY, dragStart, rotate});
        }
        e.preventDefault();
    };
    const onMouseDown = e => {
        const {dragStart} = mouseObj;
        if (!dragStart) {
            const {clientX: cx, clientY: cy} = e;
            setMouseObj({cx, cy, dragStart: true, rotate: e.button === 0});
        }
        e.preventDefault();
    };
    const onMouseUp = e => {
        setMouseObj({cx: 0, cy: 0, dragStart: false, rotate: true});
        setDelta({x: 0, y: 0});
        e.preventDefault();
    };
    const updateZoom = e => {
        setZoom(zoom + e.deltaY);
        e.preventDefault();
    };
    return (
        <svg
            ref={ref}
            width="95vw"
            height="85vh"
            onMouseMove={updateMap}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onWheel={updateZoom}
            onContextMenu={e => e.preventDefault()}
        >
            <Map
                x={width / 2 || 0}
                y={height / 2 || 0}
                rx={initRxRy.rx}
                ry={initRxRy.ry}
                delta={delta}
                geoData={geoData}
                zoom={zoom}
                rotate={mouseObj.rotate}
            />
        </svg>
    );
}

export default Visualisation;
