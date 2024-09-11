import { ReactNode, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { pureUrl } from "../../server/userAPI";
import React from "react";

interface WebSocketWrapperProps {
  children: ReactNode;
}

export const WebSocketWrapper = ({ children }: WebSocketWrapperProps) => {
  const WS_URL = `wss://${pureUrl}/NotificationUserHub`;
  const { sendMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
    share: false,
    shouldReconnect: () => true,
  });

  // Run when the connection state (readyState) changes
  useEffect(() => {
    console.log("Connection state changed");
    if (readyState === ReadyState.OPEN) {
      var message = JSON.stringify({
        protocol: "json",
        version: 1,
      });
      sendMessage(`${message}`);
      var message2 = JSON.stringify({
        arguments: ["from", "front"],
        target: "Send",
        type: 1,
      });
      sendMessage(`${message2}`);
    }
  }, [readyState]);

  // Run when a new WebSocket message is received (lastJsonMessage)
  useEffect(() => {
    console.log(`Got a new message: ${lastJsonMessage}`);
  }, [lastJsonMessage]);

  return <React.Fragment>{children}</React.Fragment>;
};
