"use client";

import { useRive, useStateMachineInput } from "@rive-app/react-webgl2";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  // Initialize Rive with the logo animation
  const { rive, RiveComponent } = useRive({
    src: "/heal_logo_2.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  // Get the "Thinking" input from the state machine
  const thinkingInput = useStateMachineInput(
    rive,
    "State Machine 1",
    "Thinking"
  );

  // Update the state machine input when the switch changes
  useEffect(() => {
    if (thinkingInput) {
      thinkingInput.value = isThinking;
    }
  }, [isThinking, thinkingInput]);

  // Ensure we're rendering on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle switch toggle
  const handleSwitchChange = (checked: boolean) => {
    setIsThinking(checked);
  };

  if (!isClient) return null;

  return (
    <div
      className="z-10 flex flex-col justify-center h-screen w-screen items-center gap-8"
      style={{ backgroundImage: "url('/blob.png')", backgroundSize: "cover" }}
    >
      {/* Rive Animation */}
      <div className="w-80 h-80 sm:w-96 sm:h-96 mix-blend-lighten blur-[0.5px]">
        <RiveComponent className="w-full h-full" />
      </div>

      {/* Switch Control */}
      <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm p-4 rounded-lg">
        <Switch
          id="thinking-mode"
          checked={isThinking}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="thinking-mode" className="text-white font-medium">
          Thinking Mode
        </Label>
      </div>
    </div>
  );
}
