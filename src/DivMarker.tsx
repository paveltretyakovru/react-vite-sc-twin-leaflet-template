import { LatLngTuple } from "leaflet";
import { forwardRef, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { createGlobalStyle } from "styled-components";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch?: any[];
  id: string;
  isMarker?: boolean;
  coords: LatLngTuple;
  children: React.ReactNode;
}

const CustomIcon = new L.DivIcon({
  className: 'div-marker'
});

const Styles = createGlobalStyle`
  .div-marker {
    width: max-content !important;
    height: max-content !important;
  }
`;

export const DivMarker = forwardRef<L.Marker, Props>(
  ({watch = [], ...props}: Props, refInParent) => {
    const [ref, setRef] = useState<L.Marker>();

    const node = useMemo(
      () => (ref ? ReactDOM.createRoot(ref.getElement() as Element) : null),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [ref, ...watch]
    );

    return useMemo(
      () => (
        <>
          <Styles />

          <Marker
            ref={(r: L.Marker | null) => {
              setRef(r as L.Marker);

              if (refInParent) {
                // @ts-expect-error fowardref ts defs are tricky
                refInParent.current = r;
              }
            }}
            icon={CustomIcon}
            position={props.coords}
          />
          {ref && node?.render(props.children)}
        </>
      ),
      [ref, node, props.coords, refInParent, props.children]
    );
  }
);
