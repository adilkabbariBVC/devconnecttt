import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { View, Text, Button } from 'react-native';

type Props = {
  latitude: number;
  longitude: number;
  username: string;
  onPressProfile: () => void;
};

export default function TooltipMarker({ latitude, longitude, username, onPressProfile }: Props) {
  return (
    <Marker coordinate={{ latitude, longitude }}>
      <Callout onPress={onPressProfile}>
        <View>
          <Text>{username}</Text>
          <Button title="View Profile" onPress={onPressProfile} />
        </View>
      </Callout>
    </Marker>
  );
}






// import React from 'react';
// import { Marker, Callout } from 'react-native-maps';
// import { View, Text, Button } from 'react-native';

// type TooltipMarkerProps = {
//   latitude: number;
//   longitude: number;
//   username: string;
//   onPressProfile: () => void;
// };

// const TooltipMarker: React.FC<TooltipMarkerProps> = ({ latitude, longitude, username, onPressProfile }) => {
//   return (
//     <Marker coordinate={{ latitude, longitude }}>
//       <Callout onPress={onPressProfile}>
//         <View style={{ padding: 5 }}>
//           <Text>{username}</Text>
//           <Button title="View Profile" onPress={onPressProfile} />
//         </View>
//       </Callout>
//     </Marker>
//   );
// };

// export default TooltipMarker;
