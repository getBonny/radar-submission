import React from "react";
import {
  Card,
  H2,
  Paragraph,
  Progress,
  YStack,
  CardProps,
  Text,
} from "tamagui";
import { LevelType } from "../../../src/types/schema/levels";
import { LinearGradient } from "tamagui/linear-gradient";

interface LevelDescrCardProps extends CardProps {
  level: LevelType;
  currentTokens: number;
  active: boolean;
}

export function LevelDescrCard({
  level,
  currentTokens,
  active,
  ...props
}: LevelDescrCardProps) {
  const progress = Math.min((currentTokens / level.totalTokens) * 100, 100);

  return (
    <Card
      borderRadius="$10"
      backgroundColor="$dark5"
      borderWidth="$1"
      borderColor="$borderColor"
      elevate
      size="$4"
      {...props}
    >
      <Card.Header padded>
        <Card
          backgroundColor={active ? "$green5" : "$red5"}
          borderRadius="$10"
          paddingHorizontal="$2"
          paddingVertical="$1"
          marginBottom="$2"
          alignSelf="flex-start"
        >
          <Text fontSize="$2" color={active ? "$green11" : "$red11"}>
            {active ? "Unlocked" : "Locked"}
          </Text>
        </Card>
        
        <H2>{level.title}</H2>
        <Paragraph theme="dark" color="$gray11">{level.description}</Paragraph>
      </Card.Header>

      <Card.Footer padded>
        <YStack width="100%" gap="$2">
          <Text fontSize="$2" color="$gray11">
            {currentTokens} / {level.totalTokens} tokens
          </Text>
        </YStack>
      </Card.Footer>
    </Card>
  );
}

export default LevelDescrCard;
