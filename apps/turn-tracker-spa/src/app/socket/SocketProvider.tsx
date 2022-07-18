import React, { ReactNode } from 'react';
import SocketClient, {
  ManagerOptions,
  Socket,
  SocketOptions,
} from 'socket.io-client';

export const SocketContext = React.createContext<Socket | null>(null);

export default function SocketProvider(props: {
  url: string;
  open?: boolean;
  opts?: Partial<ManagerOptions & SocketOptions>;
  children?: ReactNode;
}): React.ReactElement {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  React.useEffect(() => {
    const disconnect = () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
    const connect = () => {
      if (socket) {
        disconnect();
      }
      setSocket(SocketClient(props.url, props.opts));
    };
    if (props.open === true) {
      connect();
    } else if (props.open === false && socket) {
      disconnect();
    }
    return disconnect;
  }, [props.open]);
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
}

export function useSocket(): Socket | null {
  return React.useContext(SocketContext);
}

export function useSubscription<T>(
  topic: string,
  listener: (message: T) => void
): void {
  const socket = React.useContext(SocketContext);
  React.useEffect(() => {
    socket?.on(topic, listener);
    return () => {
      socket?.off(topic);
    };
  }, [listener, socket, topic]);
}
