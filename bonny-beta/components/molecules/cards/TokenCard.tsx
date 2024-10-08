import {
  Card,
  H2,
  Paragraph,
  XStack,
  Button,
  Circle,
  Square,
  CardProps,
  YStack,
} from "tamagui";

export function TokenCard({
  tokens,
  ...props
}: { tokens: number } & CardProps) {
  return (
    <Card borderRadius="$10" backgroundColor="$dark5" borderWidth="$1" borderColor="$borderColor" elevate size="$4" {...props}>
      <Card.Header padded>
        <H2>{tokens} °B</H2>
        <Paragraph theme="alt2">Balance</Paragraph>
      </Card.Header>

      <Card.Footer padded>
        <XStack flex={1} />
        <Button borderRadius="$10" borderColor="$borderColor" borderWidth="$1">Use Tokens</Button>
      </Card.Footer>
      <Card.Background>
        <YStack padding="$0" rotate="-15deg" paddingTop="$12">
          <XStack padding="$1">
            <Circle padding="$1" size={50} backgroundColor="$green8" elevation="$4" />
            <Square padding="$1" size={50} backgroundColor="$yellow10" elevation="$4" />
            <Square padding="$1" size={50} backgroundColor="$purple8" elevation="$4" />
            <Square padding="$1" size={50} backgroundColor="$teal8" elevation="$4" />
            <Circle padding="$1" size={50} backgroundColor="$blue8" elevation="$4" />
          </XStack>
          <XStack padding="$1">
            <Square padding="$1" size={50} backgroundColor="$orange10" elevation="$4" />
            <Circle padding="$1" size={50} backgroundColor="$blue8" elevation="$4" />
            <Square padding="$1" size={50} backgroundColor="$red10" elevation="$4" />
            <Circle padding="$1" size={50} backgroundColor="$blue8" elevation="$4" />
          </XStack>
        </YStack>
      </Card.Background>
    </Card>
  );
}
