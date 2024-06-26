package com.example.room;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface RoomService {
	Room saveRoom(Integer numberOfBalconies, Integer bathRooms, String floorNumber, String roomArea,
			MultipartFile roomImage, Double rent, Double securityDeposit, String description, String landmark,
			String state, String city, String address, FurnishedStatus furnishedStatus, String userEmail,
			MultipartFile roomVideo,String preference) throws IOException;

	List<Room> getAllRooms();

	Room getRoomById(Long roomId);

	Room addRoommateToRoom(Long roomId, String description, String preferences);

	Room updateRoom(Long roomId, Integer numberOfBalconies, Integer bathRooms, String floorNumber, String roomArea,
			MultipartFile roomImage, Double rent, Double securityDeposit, String description, String landmark,
			String state, String city, String address, FurnishedStatus furnishedStatus, String userEmail,
			MultipartFile roomVideo,String preference) throws IOException;

	void deleteRoom(Long roomId);
}
