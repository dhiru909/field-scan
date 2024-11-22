// @ts-nocheck
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import React from 'react';
interface PinProps {
  item: {
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
  };
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

// const blob = await fetch('/building.png').then(r => r.blob());
const Pin: React.FC<PinProps> = ({ item }) => {
  // const myIcon = new Icon({
  //   iconUrl: URL.createObjectURL(blob),
  //   iconSize: [38, 45], // size of the icon
  //   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  // });
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    // <Marker
    //   icon={myIcon}
    //   position={[
    //     item.location?.coordinates.at(1)!,
    //     item.location?.coordinates.at(0)!,
    //   ]}
    // >
    //   <Popup className="">
    <div
      className="m-0 flex flex-col
     rounded-sm popupContainer bg-primary-foreground"
    >
      <Card className="m-0 max-w-md z-30 ">
        <CardHeader>
          <CardTitle className="items-center text-center">
            {item.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 ">
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium">{item.address}</div>
              <div className="text-sm text-muted-foreground"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-green-500" />
            <div className="text-green-500">{item?.status}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Type
              </div>
              <div>{item.type}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Started
              </div>
              <div>{item.startedAt.toString().slice(0, 10)}</div>
            </div>
          </div>
          <Carousel
            setApi={setApi}
            opts={{
              align: 'center',
            }}
            className=" max-w-sm p-0"
          >
            <CarouselContent>
              {item.img.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="h-28">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-0  ">
                        <img src={image} className="" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="py-1 text-center text-sm text-muted-foreground">
            Image {current} of {count}
          </div>
          <a
            className="font-bold text-primary border border-3 border-secondary-foreground px-2 py-1  rounded-md hover:bg-secondary hover:text-primary-background text-center"
            href={`projects/${item._id}`}
          >
            View details
          </a>
        </CardContent>
      </Card>
    </div>
  );
};
function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
export default Pin;
