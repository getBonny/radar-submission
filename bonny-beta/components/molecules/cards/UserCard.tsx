import React from 'react';
import { UserType } from '@/src/types';
import { YGroup, ListItem, Separator } from 'tamagui';
import { CircleUser, Moon, Sun, Cloud, Mail, Coins } from '@tamagui/lucide-icons';

interface UserCardProps {
  user: UserType;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <YGroup separator={<Separator />} alignSelf="center" borderWidth="$1" borderColor="$borderColor" elevate size="$4" width="100%">
      <YGroup.Item>
        <ListItem hoverTheme icon={CircleUser} size="$5" title="User Name" subTitle={user.userName} />
      </YGroup.Item>
      <YGroup.Item>
        <ListItem hoverTheme icon={Mail} size="$5" title="Email" subTitle={user.email} />
      </YGroup.Item>
      <YGroup.Item>
        <ListItem hoverTheme icon={Coins} size="$5" title="Tokens" subTitle={user.tokens.toString()} />
      </YGroup.Item>
      <YGroup.Item>
        <ListItem hoverTheme icon={Cloud} size="$5" title="Supporter Status" subTitle={user.supporterStatus} />
      </YGroup.Item>
    </YGroup>
  );
};

export default UserCard;
