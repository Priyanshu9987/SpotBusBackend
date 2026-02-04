// socket.js
import { Server } from "socket.io";
import UserModel from "./models/UserModel.js";

export default function initSocket(httpServer) {

  const io = new Server(httpServer, {
  cors: {
    origin: "https://spotbus.netlify.app", // allow frontend
    methods: ["GET", "POST"],
    credentials: true
  }
});


  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Listen for location updates
    socket.on("updateLocation", async ({ userId, latitude, longitude }) => {
      try {
        // Save to DB
        await UserModel.findByIdAndUpdate(userId, {
          location: {
            type: "Point",
            coordinates: [longitude, latitude] // GeoJSON expects [lng, lat]
          }
        });

        // Find nearby users (within 100 km)
        const nearbyUsers = await UserModel.find({
          location: {
            $near: {
              $geometry: { type: "Point", coordinates: [longitude, latitude] },
              $maxDistance: 100000 // 100 km in meters
            }
          }
        });

        // Send back to this client
        socket.emit("nearbyUsers", nearbyUsers);
      } catch (err) {
        console.error("Error updating location:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}