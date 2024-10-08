import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { ColorProp, getColor } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  color?: ColorProp;
  type?: 'default' | 'title' | 'superTitle' | 'megaTitle' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  color,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const textColor = color ? getColor(color) : undefined;

  return (
    <Text
      style={[
        textColor ? { color: textColor } : undefined,
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'superTitle' ? styles.superTitle : undefined,
        type === 'megaTitle' ? styles.megaTitle : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  superTitle: {
    fontSize: 50,
    fontWeight: 'semibold',
    lineHeight: 50,
  },
  megaTitle: {
    fontSize: 80,
    fontWeight: 'semibold',
    lineHeight: 70,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'regular',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
