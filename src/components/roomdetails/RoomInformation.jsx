import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Dog from "../../assets/dog.jpg";
import OwnerCard from "./OwnerCard";

const RoomInformation = () => {
  const { roomId } = useParams();

  const data = useSelector((store) => store.room?.availableRooms);
  const reqRoom = data?.find((room) => room.roomId === Number(roomId));
  console.log(data);
  console.log(reqRoom);
  if (reqRoom === undefined) {
    return null;
  }

  const {
    rent,
    state,
    city,
    address,
    roomImage,
    numberOfBalconies,
    bathRooms,
    floorNumber,
    furnishedStatus,
    description,
    roomVideo,
    securityDeposit,
    roomArea,
  } = reqRoom;

  return (
    <div className="flex h-full bg-[#f5f5f5]">
      <div className="bg-[#ffffff] rounded-xl w-[70%] mt-5 mb-20 border border-[#e1e1e1] shadow-md ml-6 px-4">
        <div className="flex my-5 w-full">
          <video className="w-full rounded-lg" controls >
            <source  src={roomVideo} />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex justify-between w-full font-body my-4 border-b-2">
          <div className="mx-5 w-1/2 border-r-2 mb-4">
            <h3 className="text-sm">
              Rental: <span className="font-medium">₹{rent}</span>
            </h3>
            <h3 className="text-sm mb-5">
              Security Deposit: <span className="font-medium">₹{ securityDeposit}</span>
            </h3>
            <h3 className="flex flex-col">
              Flat available for rent in{" "}
              <span className="font-semibold">
                {address}, {city}, {state}
              </span>
            </h3>
          </div>
          <div className="flex justify-between mr-5 w-1/2">
            <div className="flex flex-col">
              <h3 className="flex flex-col text-sm mb-6 font-bold">
                Furnished Status
                <span className="font-medium text-xs">{furnishedStatus}</span>
              </h3>
              <h3 className="flex flex-col text-sm font-bold">
                Balconies
                <span className="font-medium">{numberOfBalconies}</span>
              </h3>
            </div>
            <div className="flex flex-col">
              <h3 className="flex flex-col text-sm mb-6 font-bold">
                Bathrooms
                <span className="font-medium text-xs">{bathRooms}</span>
              </h3>
              <h3 className="flex flex-col text-sm font-bold">
                Floor
                <span className="font-medium text-xs">{floorNumber}</span>
              </h3>
            </div>
            <div className="flex flex-col mb-6">
              <h3 className="flex flex-col text-sm font-bold">
                Room area
                <span className="font-medium text-xs">{roomArea}</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="border-b-2">
          <div className=" font-body mx-5">
            <p className="text-center text-lg font-semibold">
              More Information
            </p>
            <div className="flex gap-2 mt-4 mb-6">
              <div className="font-body">
                <p>
                {description}
                </p>
              </div>
              <div>
                <img
                  className="rounded-lg w-full object-cover"
                  src={roomImage}
                  alt="roomImage"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-5 my-5">
          <p className="font-body text-lg mx-4 mb-4">Contact Details</p>
          <button className="border border-[#f84464] text-[#f84464] rounded-3xl px-6 py-2 mr-4">
            Get Phone No.
          </button>
          <button className="border  text-white bg-[#f84464] rounded-3xl px-6 py-2">
            Contact Owner
          </button>
        </div>
      </div>
      <div className="w-[25%] font-body mt-5">
        <OwnerCard />
      </div>
    </div>
  );
};

export default RoomInformation;
