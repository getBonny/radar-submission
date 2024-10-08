import { YStack, ScrollView, XStack, Circle, Text, Progress } from "tamagui";
import { useRouter } from "expo-router";
import { LevelType } from "@/src/types/schema/levels";
import { LevelDescrCard } from "@/components/molecules/cards/LevelDescrCard";
import { LevelProgressBar } from "@/components/atoms/progress/LevelProgressBar";
import { useEffect, useState } from "react";

interface LevelDescrOrganismProps {
  levels: LevelType[];
  userTokens: number;
}

const LevelDescrOrganism: React.FC<LevelDescrOrganismProps> = ({ levels, userTokens }) => {
  const router = useRouter();
  const [totalProgress, setTotalProgress] = useState(0);

  useEffect(() => {
    if (levels.length > 0) {
      const currentLevel = levels.findIndex(level => userTokens < level.totalTokens);
      const progressPercentage = currentLevel === -1 ? 100 : (currentLevel * 10);
      setTotalProgress(progressPercentage);
    }
  }, [levels, userTokens]);

  return (
    <ScrollView padding="$4" height="100%">
      <XStack flex={1} gap="$4" paddingBottom="$8">
        <LevelProgressBar progress={totalProgress} height="100%" />
        
        <YStack flex={1} gap="$4">
          {levels.map((level) => (
            <LevelDescrCard key={level.id} level={level} currentTokens={userTokens} active={userTokens >= level.totalTokens} />
          ))}
        </YStack>
      </XStack>
    </ScrollView>
  );
};

export default LevelDescrOrganism;
