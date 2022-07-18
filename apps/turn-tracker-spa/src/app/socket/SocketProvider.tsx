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
    if (props.open === true || props.open === undefined) {
      console.log('Opening socket');
      setSocket(SocketClient(props.url, props.opts));
    } else {
      setSocket(null);
    }
  }, [props.open, props.url, props.opts]);
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
