// @ts-nocheck
import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector } from 'react-redux';
import Pin from '../pin/Pin';
import './mapwithgeocoder.scss';
import { createRoot } from 'react-dom/client';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '@/api/api';

const accessToken =
  'pk.eyJ1IjoiZGhpcmFqa2hhbGkiLCJhIjoiY2x5cjV1d2F6MDRpdzJscXgwMjZocG9sOCJ9.hultT77te_oDoBrMjtA6Rw';
export interface MapProps {
  items: {
    location: Location;
    img: string[];
    _id: string;
    title: string;
    address: string;
    status: string;
    type: string;
    startedAt: Date;
    userId: UserID;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }[];
  mapContainerRef: any;
}

interface Location {
  type: string;
  coordinates: number[];
}

interface UserID {
  _id: string;
  name: string;
  dp: string;
}

interface Geolocation {
  getCurrentPosition(
    success: (position: GeolocationPosition) => void,
    error?: (error: GeolocationPositionError) => void,
  ): void;
}

const Map: React.FC<MapProps> = ({ items, mapContainerRef }) => {
  const mapInstanceRef = useRef();
  const [, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { latLng } = useSelector((state: any) => state.map);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  let markers = [];
  const { data, isError, isPending, refetch } = useQuery({
    queryKey: ['all-projects', { lat, lng }],
    queryFn: () => fetchProjects({ lat, long: lng }),
    gcTime: 1000 * 60 * 60 * 24,
    // onSuccess: (data, variables, context) => {
    //   console.log(data, variables, context);
    //   setProjects({ items: data });
    //   queryClient.invalidateQueries({
    //     queryKey: ['all-projects'],
    //   });
    // },
    // onError: (error, variables, context) => {
    //   console.log(error);
    // },
  });

  useEffect(() => {
    items = data;
    console.log(items);
    // markers.forEach(marker => marker?.remove());
    markers = [];
    mapboxgl.accessToken = accessToken;

    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current, // container ID
      center: latLng?.coordinates ? latLng.coordinates : [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      // style: `mapbox://styles/mapbox/streets-v12`,
    });
    mapInstanceRef.current?.on('movestart', function (e) {
      console.log(
        `Current Map Center: ${mapInstanceRef?.current?.getCenter()}`,
      );
      // marker.setLngLat(map.getCenter());
    });
    mapInstanceRef?.current?.on('moveend', function (e) {
      console.log(
        `Current Map Center: ${mapInstanceRef?.current?.getCenter()?.lng}`,
      );
      setLng(mapInstanceRef?.current?.getCenter()?.lng);
      setLat(mapInstanceRef?.current?.getCenter()?.lat);

      // marker.setLngLat(map.getCenter());
    });
    mapInstanceRef?.current?.on('load', () => {
      setMapLoaded(true);
    });
    items?.map((item, index) => {
      const el = document.createElement('div');
      el.className = 'marker';
      const popupNode = document.createElement('div');
      const root = createRoot(popupNode);
      root.render(
        <div
          className="bg-transparent"
          style={{
            background: 'bg-foreground',
          }}
        >
          <Pin key={item._id} item={item} />
        </div>,
      );
      const markerNode = document.createElement('div');
      const markerRoot = createRoot(markerNode);
      markerRoot.render(
        <div>
          <div className="marker__image w-10 h-10">
            <img src={`building.png`} alt="pin" />
          </div>
        </div>,
      );
      const markerHeight = 50;
      const markerRadius = 10;
      const linearOffset = 25;
      const popupOffsets = {
        top: [0, 0],
        'top-left': [0, 0],
        'top-right': [0, 0],
        bottom: [0, -markerHeight + 200],
        'bottom-left': [
          linearOffset,
          (markerHeight - markerRadius + linearOffset) * -1,
        ],
        'bottom-right': [
          -linearOffset,
          (markerHeight - markerRadius + linearOffset) * -1,
        ],
        left: [markerRadius, (markerHeight - markerRadius) * -1],
        right: [-markerRadius, (markerHeight - markerRadius) * -1],
      };
      const marker = new mapboxgl.Marker(markerNode)
        .setLngLat(item.location.coordinates)
        .setPopup(
          new mapboxgl.Popup({ closeButton: true, offset: popupOffsets })
            .setDOMContent(popupNode)
            .addClassName('duration-100 translate-0'), // add popups
        );

      marker.addTo(mapInstanceRef.current);
      markers.push(marker);
      if (!marker.getElement()) {
        console.error('Marker is not displaying');
      }
    });
  }, [data]);
  console.log('latLng', latLng);
  useEffect(() => {}, [items, latLng, localStorage.getItem('vite-ui-theme')]);

  // const defaultCenter: LatLngExpression = [53.4797, -1.60269];

  return <></>;
};

export default Map;
