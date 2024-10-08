import { supabase } from '@/lib/supabase';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';

export const scanDocument = async (): Promise<string[]> => {
  try {
    const result = await DocumentScanner.scanDocument({
        maxNumDocuments: 10,
    });
    
    if (result?.scannedImages && result.scannedImages.length > 0) {
      console.log('Scanned images:', result.scannedImages);
      return result.scannedImages;
    } else {
      console.error('No scanned images found in the result');
      return [];
    }
  } catch (error) {
    console.error('Error scanning document:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    return [];
  }
};

export const uploadImage = async (imagePath: string): Promise<string | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;
    const fileName = `${userId}/receipt_${Date.now()}.jpg`;

    const base64Image = await FileSystem.readAsStringAsync(imagePath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const { data, error } = await supabase.storage
      .from('receipts')
      .upload(fileName, decode(base64Image), {
        contentType: 'image/jpeg'
      });

    if (error) throw error;
    console.log('Image uploaded successfully:', data.path);
    return data.path;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

/*

export const scanDocument = async () => {
  try {
    const result = await DocumentScanner.scanDocument();
    
    if (result?.scannedImages && result.scannedImages.length > 0) {
      await uploadImage(result.scannedImages[0]);
      return true; // Indicate successful scan and upload
    }
    return false;
  } catch (error) {
    console.error('Error scanning document:', error);
    return false;
  }
};

const uploadImage = async (imagePath: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;
    const fileName = `${userId}/receipt_${Date.now()}.jpg`;

    console.log('Starting upload to Supabase...');
    console.log('Image path:', imagePath);

    const base64Image = await FileSystem.readAsStringAsync(imagePath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const { data, error } = await supabase.storage
      .from('receipts')
      .upload(fileName, decode(base64Image), {
        contentType: 'image/jpeg'
      });

    if (error) throw error;
    console.log('Image uploaded successfully:', data.path);
  } catch (error) {
    console.error('Error uploading image:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
  }
};








import { supabase } from '@/lib/supabase';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';

export default function ScanScreen() {
  const router = useRouter();

  const scanDocument = async () => {
    try {
      const result = await DocumentScanner.scanDocument();
      
      if (result?.scannedImages && result.scannedImages.length > 0) {
        await uploadImage(result.scannedImages[0]);
        router.back(); // Route back after successful scan and upload
      }
    } catch (error) {
      console.error('Error scanning document:', error);
    }
  };

  const uploadImage = async (imagePath: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;
      const fileName = `${userId}/receipt_${Date.now()}.jpg`;
  
      console.log('Starting upload to Supabase...');
      console.log('Image path:', imagePath);
  
      // Read the file and convert to base64
      const base64Image = await FileSystem.readAsStringAsync(imagePath, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const { data, error } = await supabase.storage
        .from('receipts')
        .upload(fileName, decode(base64Image), {
          contentType: 'image/jpeg'
        });
  
      if (error) throw error;
      console.log('Image uploaded successfully:', data.path);
    } catch (error) {
      console.error('Error uploading image:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
    }
  };

  useEffect(() => {
    scanDocument();
  }, []);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

*/