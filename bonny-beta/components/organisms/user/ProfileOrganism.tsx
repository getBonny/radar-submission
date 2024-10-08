import { LevelCard } from "@/components/molecules/cards/LevelCard";
import { TokenCard } from "@/components/molecules/cards/TokenCard";
import { UserType } from "@/src/types";
import { YStack, ScrollView, XStack, Button, Text } from "tamagui";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import UserCard from "@/components/molecules/cards/UserCard";
import { LevelType } from "@/src/types/schema/levels";

interface ProfileOrganismProps {
  user: UserType;
}

const level: LevelType = {
    id: 1,
    title: "Level 1",
    description: "Description of level 1",
    totalTokens: 1350.32,
  };

const ProfileOrganism: React.FC<ProfileOrganismProps> = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace("/");
    }
  };

  return (
    <ScrollView padding="$4" height="100%">
      <YStack gap="$4" paddingBottom="$8">
        {/* Token Card */}
        <TokenCard tokens={user.tokens} />

        {/* Level Card */}
        <LevelCard level={level} />

        {/* User Info Card */}
        <Text fontSize="$8" fontWeight="semibold">
            User Info
        </Text>
        <UserCard user={user} />

        <XStack>
          <Button onPress={handleLogout}>Logout</Button>
        </XStack>
      </YStack>
    </ScrollView>
  );
};

export default ProfileOrganism;
