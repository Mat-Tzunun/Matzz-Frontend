import React from "react";
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroBox,
  ViroMaterials,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroText,
  Viro3DObject,
  ViroScene,
  ViroAmbientLight,
  ViroARPlane,
} from "@reactvision/react-viro";
import { Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

// Definir los materiales
ViroMaterials.createMaterials({
  grid: {
    diffuseColor: "blue", // Color o textura deseada
  },
});

// Registrar el target de reconocimiento de imagen
ViroARTrackingTargets.createTargets({
  HiroExample: {
    source: require("../../assets/images/hiro.png"), // Ruta a la imagen
    orientation: "Up",
    physicalWidth: 0.1, // ancho real en metros
  },
});

function FloatingApple({ position }) {
  return (
    <Viro3DObject
      source={require("../../assets/models/apple/scene.gltf")}
      resources={[
        require("../../assets/models/apple/textures/Material_35_baseColor.png"),
      ]}
      type="GLTF"
      position={position}
      scale={[0.001, 0.001, 0.001]}
      onClick={() => {
        console.log("Apple clicked");
      }}
    />
  );
}

// Componente de escena básica
function SceneBasic() {
  const applePositions = [
    [0, 0, -0.5], // Manzana 1
    [0.2, 0, -0.5], // Manzana 2
    [-0.2, 0, -0.5], // Manzana 3
    [0.4, 0, -0.5], // Manzana 4
    [-0.4, 0, -0.5], // Manzana 5
  ];

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      <ViroARPlane minHeight={0.1} minWidth={0.1} alignment={"Horizontal"}>
        {applePositions.map((position, index) => (
          <FloatingApple position={position} key={`apple-${index}`} />
        ))}
      </ViroARPlane>
    </ViroARScene>
  );
}

// Componente principal de la aplicación
export default function App() {
  return (
    <View className="flex-1">
      <ViroARSceneNavigator initialScene={{ scene: SceneBasic }} />
      <View className="absolute bottom-0 w-full justify-center items-center pb-6">
        <TouchableOpacity className="bg-white/60 rounded-full p-2">
          <Feather name="box" size={34} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
