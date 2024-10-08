import React from 'react';
import { View, ViewProps, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ColorProp, getColor, Colors } from '@/constants/Colors';

export type BaseViewProps = ViewProps & {
  bgColor?: ColorProp;
};

export function BaseView({ style, bgColor, children, ...otherProps }: BaseViewProps) {
  const backgroundColor = bgColor ? getColor(bgColor) : Colors.tailwind.neutral[50];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, style]}
        {...otherProps}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});
