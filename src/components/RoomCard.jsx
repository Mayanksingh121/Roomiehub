import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg w-92 p-6 shadow-lg border">
      <div className="h-48 aspect-w-4 aspect-h-3">
        <img
          className="rounded-lg w-full h-full object-cover"
          src= {room.roomImage}
          loading="lazy"
          alt="roomImage"
        />
      </div>
      <div className="flex flex-col justify-between font-body">
        <div>
          <div className="flex flex-col mb-2">
            <h2>Rental</h2>
            <p className="text-xs -mt-1">₹{room.rent}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="pb-1">
              <i className="text-red-500 fa-solid fa-location-dot"></i>
            </div>
            <p className="text-sm -mt-1">
              {room.location}, {room.city}, {room.state}
            </p>
          </div>
        </div>
        <div className="border-b border-gray-300"></div>
        <div className="flex justify-between mt-3">
          <div className="flex flex-col">
            <h2>Balconies</h2>
            <p className="text-xs -mt-1">{room.numberOfBalconies}</p>
          </div>
          <div className="flex flex-col">
            <h2>Floor</h2>
            <p className="text-xs -mt-1">{room.floorNumber}</p>
          </div>
        </div>
      </div>
      <Link to={"/room/" + room.roomId}>
        <div className="mt-2">
          <p className="text-sm">
            View details
            <span className="items-center mx-2">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
