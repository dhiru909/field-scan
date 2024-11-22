// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { MapProps } from '../../components/map/Map';
import { useSelector } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProjects } from '@/api/api';
import MapWithGeocoder from '@/components/map/MapWithGeocoder';
export interface MapPageProps {}
/**
 * Home component for displaying the map with projects
 * @returns JSX.Element with the map and projects
 */
const Home: React.FC<MapPageProps> = () => {
  /**
   * useSelector hook for accessing state from the Redux store
   * @type {any}
   */
  const { userInfo } = useSelector((state: any) => state.authenticate);
  const { latLng } = useSelector((state: any) => state.map);
  /**
   * Latitude and longitude for the initial map center
   * @type {number}
   */
  const lat = latLng?.coordinates.at(1);
  const long = latLng?.coordinates.at(0);
  console.log(latLng);

  /**
   * Query client for invalidating queries
   * @type {QueryClient}
   */
  // const queryClient = useQueryClient();
  /**
   * State for storing the projects
   * @type {MapProps | undefined}
   */
  const [projects, setProjects] = useState<MapProps>();
  /**
   * useMutation hook for fetching the projects
   * @type {MutationObserverResult}
   */
  const { data, isError, isPending } = useQuery({
    queryKey: ['all-projects', { lat, long }],
    queryFn: () => fetchProjects({ lat, long, userInfo }),
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
    setProjects({ items: data });
  }, [data]);

  return (
    <div className="mt-[5.25rem] h-[100vh] w-[100vw]">
      <MapWithGeocoder items={projects?.items!} />
    </div>
  );
};

export default Home;
