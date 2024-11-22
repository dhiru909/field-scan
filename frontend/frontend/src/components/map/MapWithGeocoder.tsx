//  @ts-nocheck
import { useRef, useEffect, useState } from 'react';
import { Geocoder } from '@mapbox/search-js-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector } from 'react-redux';
import Pin from '../pin/Pin';
import './mapwithgeocoder.scss';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import { Link } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Marker } from 'react-leaflet';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { fetchProjects } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import _debounce from 'lodash/debounce';
const accessToken =
  'pk.eyJ1IjoiZGhpcmFqa2hhbGkiLCJhIjoiY20zaXR4ejRnMDN0ZjJpczRxNnFmeTF5YiJ9.u-36U__G_L641Ad2K3sI1w';
export interface MapProps {
  items: {
    location: Location;
    img: string[];
    _id: string;
    title: string;
    address: string;
    status: string;
    type: string;
    description: string;
    startedAt: Date;
    userId: UserID;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }[];
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
const MapWithGeocoder: React.FC<MapProps> = ({ items }) => {
  const mapContainerRef = useRef();
  const mapInstanceRef = useRef();
  const [, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [newLatLng, setNewLatLng] = useState([]);
  console.log(newLatLng);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  let markers = [];
  const { data, isError, isPending, refetch } = useQuery({
    queryKey: ['all-projects', { newLatLng }],
    queryFn: () => fetchProjects({ lat: newLatLng[1], long: newLatLng[0] }),
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
  const debouncedOnChange = _debounce(refetch, 3000);
  useEffect(() => {
    debouncedOnChange();
  }, [newLatLng]);
  const { latLng } = useSelector((state: any) => state.map);
  console.log('latLng', latLng);
  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current, // container ID
      center: latLng?.coordinates ? latLng.coordinates : [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      // style: `mapbox://styles/mapbox/streets-v12`,
    });

    mapInstanceRef?.current?.on('load', () => {
      setMapLoaded(true);
    });
    mapInstanceRef?.current?.on('moveend', function (e) {
      console.log(`Current Map Center: `);
      let laat = mapInstanceRef?.current?.getCenter()?.lat;
      let long = mapInstanceRef?.current?.getCenter()?.lng;
      setNewLatLng([long, laat]);
      // setLat(mapInstanceRef?.current?.getCenter()?.lat);
      // setLng(mapInstanceRef?.current?.getCenter()?.lng);
      // setLat(mapInstanceRef?.current?.getCenter()?.lat);

      // marker.setLngLat(map.getCenter());
    });
  }, []);
  useEffect(() => {
    items?.map((item, index) => {
      console.log();
      item;
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
      // const offsetTop = 20;
      // const offsetBottom = -45;
      // const offsetLeft = 40;

      // const markerOffsetObject = {
      //   top: [0, offsetTop],
      //   'top-left': [offsetLeft, offsetTop],
      //   'top-right': [-offsetLeft, offsetTop],
      //   bottom: [0, offsetBottom ],
      //   'bottom-left': [offsetLeft, offsetBottom],
      //   'bottom-right': [-offsetLeft, offsetBottom],
      //   left: [offsetLeft, offsetBottom],
      //   right: [-offsetLeft, offsetBottom],
      // };
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
        )
        .addTo(mapInstanceRef.current);

      if (!marker.getElement()) {
        console.error('Marker is not displaying');
      }
    });
  }, [items, latLng, localStorage.getItem('vite-ui-theme')]);

  useEffect(() => {
    items = data;
    console.log(items);
    // markers.forEach(marker => marker?.remove());
    markers = [];

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
  return (
    <>
      <div className="fixed mt-3 z-50 bottom-0 left-[50%] -translate-x-[50%]  bg-secondary-foreground rounded-lg w-fit">
        <ToggleGroup
          onValueChange={value => {
            console.log(value);
          }}
          type="multiple"
        >
          <ToggleGroupItem
            className="flex flex-col h-fit "
            value="Bridge"
            aria-label="Toggle bold"
          >
            <img className="h-10 w-10" src="bridge.png" />
            <p className="text-muted-foreground">Bridge</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            className="flex flex-col h-fit "
            value="Building"
            aria-label="Toggle bold"
          >
            <img className="h-10 w-10" src="building.png" />
            <p className="text-muted-foreground">Building</p>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div
        id="map-container"
        className="h-full"
        ref={mapContainerRef}
        style={{ height: '100vh' }}
      />
    </>
  );
};
export default MapWithGeocoder;
