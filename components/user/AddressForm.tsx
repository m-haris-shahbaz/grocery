import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressType } from './Address';

// Define address schema with Zod
const addressSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['home', 'work', 'other']),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  building: z.string().min(1, 'Building information is required'),
  landmark: z.string().optional(),
  isDefault: z.boolean().default(false),
});

type AddressFormData = z.infer<typeof addressSchema>;

export type AddressFormRef = {
  open: (address?: AddressType) => void;
  close: () => void;
};

type AddressFormProps = {
  onSave: (address: AddressType) => void;
};

const AddressForm = forwardRef<AddressFormRef, AddressFormProps>(({ onSave }, ref) => {
  const [visible, setVisible] = useState(false);
  const [addressType, setAddressType] = useState<'home' | 'work' | 'other'>('home');
  const [isDefault, setIsDefault] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      title: '',
      type: 'home',
      address: '',
      building: '',
      landmark: '',
      isDefault: false,
    },
  });

  const openModal = (address?: AddressType) => {
    setVisible(true);

    // If editing an existing address, populate the form
    if (address) {
      setValue('title', address.title);
      setValue('address', address.address);
      setValue('type', address.type);
      setValue('isDefault', address.isDefault);
      setAddressType(address.type);
      setIsDefault(address.isDefault);

      // These fields would be part of your address structure
      setValue('building', address.building || '');
      setValue('landmark', address.landmark || '');
    } else {
      reset();
      setAddressType('home');
      setIsDefault(false);
    }
  };

  const closeModal = () => {
    setVisible(false);
    reset();
  };

  useImperativeHandle(ref, () => ({
    open: openModal,
    close: closeModal,
  }));

  const onSubmit = (data: AddressFormData) => {
    const newAddress: AddressType = {
      id: Date.now().toString(), // Generate a unique ID
      title: data.title,
      type: data.type,
      address: data.address,
      isDefault: data.isDefault,
      building: data.building,
      landmark: data.landmark,
    };

    onSave(newAddress);
    closeModal();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal}>
      <View className="flex-1 justify-end">
        <Pressable className="absolute inset-0 bg-black/50" onPress={closeModal} />

        <View className="h-5/6 gap-y-2 rounded-t-3xl bg-white p-6">
          <View className="mb-6 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-gray-900">Add New Address</Text>
            <TouchableOpacity className="rounded-full bg-gray-100 p-2" onPress={closeModal}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Address Type Selector */}
          <Text className="mb-3 font-medium text-gray-700">Address Type</Text>
          <View className="mb-6 flex-row space-x-4">
            <TouchableOpacity
              className={`flex-1 flex-row items-center justify-center rounded-xl py-2 ${addressType === 'home' ? 'border border-lime-500 bg-lime-100' : 'bg-gray-100'}`}
              onPress={() => {
                setAddressType('home');
                setValue('type', 'home');
              }}>
              <Ionicons
                name="home-outline"
                size={20}
                color={addressType === 'home' ? '#2f6f39' : '#666'}
              />
              <Text
                className={`ml-2 font-medium ${addressType === 'home' ? 'text-lime-700' : 'text-gray-600'}`}>
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 flex-row items-center justify-center rounded-xl py-2 ${addressType === 'work' ? 'border border-lime-500 bg-lime-100' : 'bg-gray-100'}`}
              onPress={() => {
                setAddressType('work');
                setValue('type', 'work');
              }}>
              <MaterialIcons
                name="work-outline"
                size={20}
                color={addressType === 'work' ? '#2f6f39' : '#666'}
              />
              <Text
                className={`ml-2 font-medium ${addressType === 'work' ? 'text-lime-700' : 'text-gray-600'}`}>
                Work
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 flex-row items-center justify-center rounded-xl py-2 ${addressType === 'other' ? 'border border-lime-500 bg-lime-100' : 'bg-gray-100'}`}
              onPress={() => {
                setAddressType('other');
                setValue('type', 'other');
              }}>
              <Ionicons
                name="location-outline"
                size={20}
                color={addressType === 'other' ? '#2f6f39' : '#666'}
              />
              <Text
                className={`ml-2 font-medium ${addressType === 'other' ? 'text-lime-700' : 'text-gray-600'}`}>
                Other
              </Text>
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text className="mb-2 font-medium text-gray-700">Title</Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="mb-1 rounded-lg border border-gray-300 p-3"
                placeholder="Home, Work, Mom's House, etc."
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.title && (
            <Text className="mb-3 text-sm text-red-500">{errors.title.message}</Text>
          )}

          {/* Address */}
          <Text className="mb-2 font-medium text-gray-700">Address</Text>
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="mb-1 rounded-lg border border-gray-300 p-3"
                placeholder="Street name, area, city"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.address && (
            <Text className="mb-3 text-sm text-red-500">{errors.address.message}</Text>
          )}

          {/* Building/House Number */}
          <Text className="mb-2 font-medium text-gray-700">Building/House No.</Text>
          <Controller
            control={control}
            name="building"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="mb-1 rounded-lg border border-gray-300 p-3"
                placeholder="Apartment, Floor, Building name"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.building && (
            <Text className="mb-3 text-sm text-red-500">{errors.building.message}</Text>
          )}

          {/* Landmark */}
          <Text className="mb-2 font-medium text-gray-700">Landmark (Optional)</Text>
          <Controller
            control={control}
            name="landmark"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="mb-4 rounded-lg border border-gray-300 p-3"
                placeholder="Near park, school, etc."
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          {/* Default Address Toggle */}
          <TouchableOpacity
            className="mb-8 flex-row items-center"
            onPress={() => {
              const newValue = !isDefault;
              setIsDefault(newValue);
              setValue('isDefault', newValue);
            }}>
            <View
              className={`mr-3 h-6 w-6 items-center justify-center rounded-md ${isDefault ? 'bg-lime-500' : 'border border-gray-400'}`}>
              {isDefault && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
            <Text className="text-gray-700">Set as default address</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-full bg-primary py-4"
            onPress={handleSubmit(onSubmit)}>
            <Text className="text-center text-base font-semibold">Save Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

export default AddressForm;
