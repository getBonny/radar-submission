import React from 'react';
import { Stack, StackProps } from 'tamagui';

interface LevelProgressBarProps extends StackProps {
  progress: number; // 0 to 100
}

export const LevelProgressBar: React.FC<LevelProgressBarProps> = ({ progress, ...props }) => {
  return (
    <Stack
      width={20}
      backgroundColor="$dark5"
      borderWidth="$1"
      borderColor="$borderColor"
      borderRadius="$3"
      overflow="hidden"
      {...props}
    >
      <Stack
        backgroundColor="$green9"
        width="100%"
        height={`${progress}%`}
        animation="bouncy"
      />
    </Stack>
  );
};

export default LevelProgressBar;
