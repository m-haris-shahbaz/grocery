import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would authenticate with your backend/auth service here

      router.replace('/');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error('Sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would implement Google authentication here

      router.replace('/');
    } catch (err) {
      setError('Google sign in failed. Please try again.');
      console.error('Google sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 px-6 pt-10">
            {/* Back Button */}
            <TouchableOpacity
              className="absolute left-4 top-4 z-10 rounded-full p-2"
              onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            {/* Header - adjusted margin top for space with back button */}
            <View className="mb-8 items-center pt-6">
              {/*               <Image
                source={require('../../assets/images/logo.png')}
                style={{ width: 120, height: 120 }}
                resizeMode="contain"
              /> */}
              <Text className="mt-4 text-2xl font-bold">Welcome Back!</Text>
              <Text className="mt-2 text-center text-gray-500">
                Sign in to your account to continue shopping
              </Text>
            </View>

            {/* Error Message */}
            {error ? (
              <View className="mb-4 rounded-lg bg-red-50 p-3">
                <Text className="text-red-500">{error}</Text>
              </View>
            ) : null}

            {/* Email Input */}
            <View className="mb-4">
              <Text className="mb-2 font-medium text-gray-700">Email Address</Text>
              <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-3">
                <Ionicons name="mail-outline" size={20} color="#666" style={{ marginTop: 1 }} />
                <TextInput
                  className="ml-2 flex-1 text-base leading-normal"
                  placeholder="your@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="mb-2 font-medium text-gray-700">Password</Text>
              <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-3">
                <Ionicons
                  name="lock-closed-outline"
                  size={16}
                  color="#666"
                  style={{ marginTop: 1 }}
                />
                <TextInput
                  className="ml-2 flex-1 text-base leading-normal"
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={16}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="mt-2 self-end">
                <Text className="text-black">Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              className="mb-4 h-12 items-center justify-center rounded-full bg-primary"
              onPress={handleSignIn}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text className="text-base font-bold">Sign In</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="my-6 flex-row items-center">
              <View className="h-px flex-1 bg-gray-300" />
              <Text className="mx-4 text-gray-500">or continue with</Text>
              <View className="h-px flex-1 bg-gray-300" />
            </View>

            {/* Social Login */}
            <TouchableOpacity
              className="mb-6 h-12 flex-row items-center justify-center rounded-full border border-gray-300"
              onPress={handleGoogleSignIn}
              disabled={loading}>
              <Image
                source={require('~/assets/google-icon.png')}
                style={{ width: 24, height: 24 }}
              />
              <Text className="ml-2 font-medium">Continue with Google</Text>
            </TouchableOpacity>

            <View className="mt-4 flex-row justify-center">
              <Text className="text-gray-600">Don't have an account? </Text>
              <Link href="/(auth)/signup" asChild>
                <TouchableOpacity>
                  <Text className="font-medium text-black">Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
