import React, { useCallback, useEffect, useState } from "react";
import LiveCursors from "./cursor/LiveCursors";
import { useMyPresence, useOthers } from "@/liveblocks.config";
import CursorChat from "./cursor/CursorChat";
import { CursorMode } from "@/types/type";
// collection of all the live components
const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const [cursorState, setCursorState] = useState({
    mode: CursorMode.Hidden,
  });
  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
  }, []);
  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });
  }, []);
  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
  }, []);
  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if(e.key==='/'){
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage : null,
          message: ''
        })
      }else if(e.key==='Escape'){
        updateMyPresence({message: ''})
        setCursorState({
          mode: CursorMode.Hidden,

        })
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if(e.key==='/'){
        e.preventDefault();
      }
    }

    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keydown', onKeyDown);

    return ()=>{
      window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keydown', onKeyDown);
    }
  }, [updateMyPresence]);
  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      className="h-[100vh] text-center items-center w-full flex justify-center"
    >
      <h1 className="text-2xl text-white">Liveblocks figma clone</h1>
      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
