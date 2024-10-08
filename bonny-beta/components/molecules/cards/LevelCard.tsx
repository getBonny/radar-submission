import React, { useEffect, useState } from "react";
import {
  Card,
  H2,
  Paragraph,
  Progress,
  YStack,
  CardProps,
  Sheet,
  Text,
  ScrollView,
} from "tamagui";
import { LevelType } from "../../../src/types/schema/levels";
import { useRouter } from "expo-router";

export function LevelCard({
  level,
  ...props
}: { level: LevelType } & CardProps) {
    const router = useRouter();

  return (
    <>
      <Card
        backgroundColor="$red9"
        borderRadius="$6"
        borderWidth="$1"
        borderColor="$red8"
        elevate
        size="$4"
        animation="bouncy"
        onPress={() => router.push(`/main/level`)}
        {...props}
      >
        <Card.Header padded>
          <H2>{level.title}</H2>
          <Paragraph theme="dark">{level.description}</Paragraph>
        </Card.Header>

        <Card.Footer padded>
          <Progress value={50} height="$0.75" backgroundColor="$red11">
            <Progress.Indicator backgroundColor="$gray15" animation="bouncy" />
          </Progress>
        </Card.Footer>
      </Card>
    </>
  );
}
