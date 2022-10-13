import React from "react";
import { deepEqual } from "fast-equals";

export interface MapProps extends google.maps.MapOptions {
  style: React.CSSProperties;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
  controlRef?: React.RefObject<HTMLElement | undefined>;
}

export const GoogleMap: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  controlRef,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
  React.useEffect(() => {
    if (controlRef?.current && map) {
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
        controlRef.current
      );
      map.setOptions({
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT,
        },
      });
    }
  }, [map]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map } as Partial<unknown>);
        }
      })}
    </>
  );
};

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default GoogleMap;
