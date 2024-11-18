"use client";

import { getSocket } from "@/config/socket";
import React, { useEffect, useMemo, useState } from "react";

const Chat = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [socketID, setSocketId] = useState<string | null>(null);
  const [room, setRoom] = useState<string | null>(null);


  const socket = useMemo(() => {
    const socket = getSocket();
    return socket.connect();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id as string);
    });
    socket.on("send-message", (data) => {
      console.log(data,"hdsjhsdj");
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("send-message", { username, room });
    setUsername("");
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-xs">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-black">{`Room-Id: ${socketID}`}</h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              message
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              type="text"
              value={username ? username : ""}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Send Message"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              room
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="room"
              type="text"
              value={room ? room : ""}
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              placeholder="Enter room id"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Chat;
