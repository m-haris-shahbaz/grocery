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

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    // Basic validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would register with your backend/auth service here

      router.replace('/');
    } catch (err) {
      setError('Failed to create account. Please try again.');
      console.error('Sign up error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setError('');
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would implement Google authentication here

      router.replace('/');
    } catch (err) {
      setError('Google sign up failed. Please try again.');
      console.error('Google sign up error:', err);
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
              {/* <Image
                source={require('../../assets/images/logo.png')}
                style={{ width: 120, height: 120 }}
                resizeMode="contain"
              /> */}
              <Text className="mt-4 text-2xl font-bold">Create Account</Text>
              <Text className="mt-2 text-center text-gray-500">
                Sign up to start shopping with us
              </Text>
            </View>

            {/* Error Message */}
            {error ? (
              <View className="mb-4 rounded-lg bg-red-50 p-3">
                <Text className="text-red-500">{error}</Text>
              </View>
            ) : null}

            {/* Full Name Input */}
            <View className="mb-4">
              <Text className="mb-2 font-medium text-gray-700">Full Name</Text>
              <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-3">
                <Ionicons name="person-outline" size={16} color="#666" style={{ marginTop: 1 }} />
                <TextInput
                  className="ml-2 flex-1 text-base leading-normal"
                  placeholder="Your Name"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* Email Input */}
            <View className="mb-4">
              <Text className="mb-2 font-medium text-gray-700">Email Address</Text>
              <View className="flex-row items-center rounded-xl border border-gray-300 px-4 py-3">
                <Ionicons name="mail-outline" size={16} color="#666" style={{ marginTop: 1 }} />
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
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              className="mb-4 h-12 items-center justify-center rounded-full bg-primary"
              onPress={handleSignUp}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text className="text-base font-bold">Create Account</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="my-6 flex-row items-center">
              <View className="h-px flex-1 bg-gray-300" />
              <Text className="mx-4 text-gray-500">or sign up with</Text>
              <View className="h-px flex-1 bg-gray-300" />
            </View>

            {/* Social Login */}
            <TouchableOpacity
              className="mb-6 h-12 flex-row items-center justify-center rounded-full border border-gray-300"
              onPress={handleGoogleSignUp}
              disabled={loading}>
              <Image
                source={require('~/assets/google-icon.png')}
                style={{ width: 24, height: 24 }}
              />
              <Text className="ml-2 font-medium">Sign up with Google</Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View className="mb-6 mt-4 flex-row justify-center">
              <Text className="text-gray-600">Already have an account? </Text>
              <Link href="/signin" asChild>
                <TouchableOpacity>
                  <Text className="font-medium text-black">Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* Terms */}
            <Text className="mt-2 text-center text-xs text-gray-500">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
