import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface BasicCardProps {
  background: React.ReactNode | ViewStyle;
  children: React.ReactNode;
  style?: ViewStyle;
}

const BasicCard: React.FC<BasicCardProps> = ({ background, children, style }) => {
  const backgroundComponent = React.isValidElement(background) ? (
    background
  ) : (
    <View style={[styles.background, background as ViewStyle]} />
  );

  return (
    <View style={[styles.cardContainer, style]}>
      {backgroundComponent}
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    padding: 16,
    //backgroundColor: 'rgba(255, 255, 255, 0.5)', 
  },
});

export default BasicCard;
