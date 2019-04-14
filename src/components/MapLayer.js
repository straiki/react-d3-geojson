import React, {useMemo} from "react";
import * as d3 from "d3";

function MapLayer({geoData, rx, ry, x, y, zoom, className}) {
    const projection = useMemo(
        () =>
            d3
                .geoOrthographic()
                .scale(zoom)
                .translate([x, y])
                .rotate([rx, -ry]),
        [rx, ry, x, y, zoom]
    );

    const path = d3.geoPath().projection(projection);
    return <path d={path(geoData)} className={className} />;
}

export default MapLayer;
