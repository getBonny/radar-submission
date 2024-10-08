import React from "react";
import { SafeAreaView } from "react-native";
import {
  View,
  Text,
  Card,
  XStack,
  YStack,
  Button,
  Spinner,
  Progress,
  Circle,
} from "tamagui";
import { Camera, File, X, Check } from "@tamagui/lucide-icons";
import { scanDocument, uploadImage } from "@/lib/utils/scanUtils";
import { AnimatePresence } from "tamagui";
import { useTransaction } from "@/context/transactionContext";

interface ScanTypeOrganismProps {
  onClose: () => void;
}

const ScanTypeOrganism: React.FC<ScanTypeOrganismProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadComplete, setUploadComplete] = React.useState(false);
  const [isSingleScan, setIsSingleScan] = React.useState(true);
  const { listenToChannel } = useTransaction();

  const handleCameraScan = async () => {
    setIsLoading(true);
    setUploadProgress(0);
    setUploadComplete(false);

    const imagePaths = await scanDocument();
    console.log("Image paths:", imagePaths);

    if (imagePaths.length > 0) {
      setIsSingleScan(imagePaths.length === 1);
      const totalImages = imagePaths.length;
      let uploadedImages = 0;

      const uploadPromises = imagePaths.map(async (path) => {
        const result = await uploadImage(path);
        uploadedImages++;
        setUploadProgress((uploadedImages / totalImages) * 100);
        return result;
      });
      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(Boolean);

      if (successfulUploads.length > 0) {
        setUploadComplete(true);
        await listenToChannel(successfulUploads.length);
        setTimeout(() => {
          setIsLoading(false);
          onClose();
        }, 2000);
      } else {
        console.error("No images were successfully uploaded");
        setIsLoading(false);
      }
    } else {
      console.error("No images were scanned");
      setIsLoading(false);
    }
  };

  const handleFileChoose = async () => {
    /*
    setIsLoading(true);
    setUploadProgress(0);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uploadResult = await uploadImage(result.assets[0].uri);
      setUploadProgress(100);
      if (uploadResult) {
        await listenToChannel();
        onClose();
        router.push("/scan");
      } else {
        // Handle upload failure
        console.error("Failed to upload image");
      }
    }
    setIsLoading(false);
    setUploadProgress(0);
    */
  };

  return (
    <SafeAreaView>
      <View padding="$4">
        <YStack
          gap="$4"
          backgroundColor="$background"
          borderRadius="$6"
          borderWidth="$1"
          borderColor="$borderColor"
          padding="$4"
        >
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$8" fontWeight="semibold">
              Choose Scan Type
            </Text>
            <Button
              size="$3"
              circular
              icon={<X size={16} />}
              onPress={onClose}
              disabled={isLoading}
            />
          </XStack>

          <AnimatePresence>
            {isLoading ? (
              <YStack
                alignItems="center"
                gap="$2"
                animation="quick"
                enterStyle={{ opacity: 0, scale: 0.9 }}
                exitStyle={{ opacity: 0, scale: 0.9 }}
              >
                {!uploadComplete ? (
                  <>
                    {isSingleScan && <Spinner size="large" color="$blue10" />}
                    <Text>
                      {isSingleScan
                        ? "Uploading..."
                        : "Uploading multiple scans..."}
                    </Text>
                    <Progress value={uploadProgress} width="100%">
                      <Progress.Indicator animation="bouncy" />
                    </Progress>
                  </>
                ) : (
                  <Circle
                    size={60}
                    backgroundColor="$green10"
                    animation="quick"
                    enterStyle={{ scale: 0.5 }}
                    exitStyle={{ scale: 0.5 }}
                  >
                    <Check size={30} color="white" />
                  </Circle>
                )}
              </YStack>
            ) : (
              <YStack
                gap="$2"
                animation="quick"
                enterStyle={{ opacity: 0, scale: 0.9 }}
                exitStyle={{ opacity: 0, scale: 0.9 }}
              >
                <Card
                  size="$4"
                  bordered
                  animation="bouncy"
                  scale={0.9}
                  hoverStyle={{ scale: 0.925 }}
                  pressStyle={{ scale: 0.875 }}
                  onPress={handleCameraScan}
                >
                  <XStack padding="$4" alignItems="center" gap="$4">
                    <Camera size={28} color="$color" />
                    <YStack gap="$1">
                      <Text fontSize="$5" fontWeight="semibold">
                        Scan with Camera
                      </Text>
                      <Text fontSize="$3" color="$gray11">
                        Use your device's camera to scan
                      </Text>
                    </YStack>
                  </XStack>
                </Card>

                <Card
                  size="$4"
                  bordered
                  animation="bouncy"
                  scale={0.9}
                  hoverStyle={{ scale: 0.925 }}
                  pressStyle={{ scale: 0.875 }}
                  onPress={handleFileChoose}
                >
                  <XStack padding="$4" alignItems="center" gap="$4">
                    <File size={28} color="$color" />
                    <YStack gap="$1">
                      <Text fontSize="$5" fontWeight="semibold">
                        Choose File
                      </Text>
                      <Text fontSize="$3" color="$gray11">
                        Select an image from your device
                      </Text>
                    </YStack>
                  </XStack>
                </Card>
              </YStack>
            )}
          </AnimatePresence>
        </YStack>
      </View>
    </SafeAreaView>
  );
};

export default ScanTypeOrganism;
